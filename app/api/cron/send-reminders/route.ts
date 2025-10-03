import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"
import { sendWhatsAppReminder } from "@/lib/actions/whatsapp-actions"

// This endpoint should be called by a cron job (e.g., Vercel Cron)
// to check and send pending reminders
export async function GET(request: Request) {
  try {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const supabase = await createServerClient()

    // Get all pending reminders that should be sent now
    const now = new Date()
    const { data: reminders, error } = await supabase
      .from("whatsapp_reminders")
      .select("*")
      .eq("status", "Pendiente")
      .lte("scheduled_for", now.toISOString())
      .limit(50) // Process in batches

    if (error) {
      console.error("Error fetching reminders:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!reminders || reminders.length === 0) {
      return NextResponse.json({ message: "No reminders to send", count: 0 })
    }

    // Send each reminder
    const results = await Promise.allSettled(reminders.map((reminder) => sendWhatsAppReminder(reminder.id)))

    const successCount = results.filter((r) => r.status === "fulfilled").length
    const failureCount = results.filter((r) => r.status === "rejected").length

    return NextResponse.json({
      message: "Reminders processed",
      total: reminders.length,
      success: successCount,
      failed: failureCount,
    })
  } catch (error) {
    console.error("Error in cron job:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
