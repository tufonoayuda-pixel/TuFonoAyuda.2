"use server"

import { createServerClient } from "@/lib/supabase/server"
import { TransbankClient } from "@/lib/transbank/client"
import { revalidatePath } from "next/cache"

export async function createPayment(sessionId: string, amount: number, description: string) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  // Get session details
  const { data: session } = await supabase
    .from("sessions")
    .select("*, patient:patients(*)")
    .eq("id", sessionId)
    .single()

  if (!session) {
    return { error: "Sesión no encontrada" }
  }

  // Create payment transaction record
  const { data: transaction, error: dbError } = await supabase
    .from("payment_transactions")
    .insert({
      session_id: sessionId,
      patient_id: session.patient_id,
      therapist_id: user.id,
      amount,
      description,
      status: "Pendiente",
      payment_method: "Transbank",
    })
    .select()
    .single()

  if (dbError) {
    console.error("Error creating payment transaction:", dbError)
    return { error: dbError.message }
  }

  // Create Transbank transaction
  const transbankClient = new TransbankClient()
  const buyOrder = `ORDER-${transaction.id.substring(0, 8)}-${Date.now()}`
  const sessionIdTbk = transaction.id
  const returnUrl = `${process.env.NEXT_PUBLIC_APP_URL}/pagos/confirmar`

  const result = await transbankClient.createTransaction(buyOrder, sessionIdTbk, amount, returnUrl)

  if (!result.success || !result.data) {
    // Update transaction status to failed
    await supabase.from("payment_transactions").update({ status: "Rechazado" }).eq("id", transaction.id)

    return { error: result.error || "Error al crear transacción" }
  }

  // Update transaction with Transbank token
  await supabase
    .from("payment_transactions")
    .update({
      transbank_token: result.data.token,
      transbank_order_id: buyOrder,
    })
    .eq("id", transaction.id)

  return {
    data: {
      transactionId: transaction.id,
      token: result.data.token,
      url: result.data.url,
    },
  }
}

export async function confirmPayment(token: string) {
  const supabase = await createServerClient()

  // Get transaction by token
  const { data: transaction } = await supabase
    .from("payment_transactions")
    .select("*")
    .eq("transbank_token", token)
    .single()

  if (!transaction) {
    return { error: "Transacción no encontrada" }
  }

  // Commit transaction with Transbank
  const transbankClient = new TransbankClient()
  const result = await transbankClient.commitTransaction(token)

  if (!result.success || !result.data) {
    // Update transaction status
    await supabase
      .from("payment_transactions")
      .update({
        status: "Rechazado",
        transbank_response: result.data || { error: result.error },
      })
      .eq("id", transaction.id)

    return { error: result.error || "Pago rechazado" }
  }

  // Update transaction with success
  await supabase
    .from("payment_transactions")
    .update({
      status: "Aprobado",
      payment_date: new Date().toISOString(),
      transbank_response: result.data,
    })
    .eq("id", transaction.id)

  // Update session payment status
  if (transaction.session_id) {
    await supabase.from("sessions").update({ payment_status: "Pagado" }).eq("id", transaction.session_id)
  }

  revalidatePath("/finanzas")
  revalidatePath("/agenda")

  return {
    data: {
      transactionId: transaction.id,
      amount: result.data.amount,
      authorizationCode: result.data.authorization_code,
      cardNumber: result.data.card_detail.card_number,
      transactionDate: result.data.transaction_date,
    },
  }
}

export async function refundPayment(transactionId: string, amount?: number) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  // Get transaction
  const { data: transaction } = await supabase.from("payment_transactions").select("*").eq("id", transactionId).single()

  if (!transaction) {
    return { error: "Transacción no encontrada" }
  }

  if (transaction.status !== "Aprobado") {
    return { error: "Solo se pueden reembolsar transacciones aprobadas" }
  }

  if (!transaction.transbank_token) {
    return { error: "Token de transacción no encontrado" }
  }

  // Refund with Transbank
  const transbankClient = new TransbankClient()
  const refundAmount = amount || transaction.amount
  const result = await transbankClient.refundTransaction(transaction.transbank_token, refundAmount)

  if (!result.success) {
    return { error: result.error || "Error al reembolsar" }
  }

  // Update transaction status
  await supabase
    .from("payment_transactions")
    .update({
      status: "Reembolsado",
      transbank_response: result.data,
    })
    .eq("id", transactionId)

  // Update session payment status
  if (transaction.session_id) {
    await supabase.from("sessions").update({ payment_status: "Anulado" }).eq("id", transaction.session_id)
  }

  revalidatePath("/finanzas")

  return { success: true }
}

export async function getPaymentTransactions(filters?: { patientId?: string; status?: string }) {
  const supabase = await createServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return { error: "No autenticado" }
  }

  let query = supabase
    .from("payment_transactions")
    .select(
      `
      *,
      patient:patients(name, email),
      session:sessions(date, time, type)
    `,
    )
    .eq("therapist_id", user.id)
    .order("created_at", { ascending: false })

  if (filters?.patientId) {
    query = query.eq("patient_id", filters.patientId)
  }

  if (filters?.status) {
    query = query.eq("status", filters.status)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching transactions:", error)
    return { error: error.message }
  }

  return { data }
}
