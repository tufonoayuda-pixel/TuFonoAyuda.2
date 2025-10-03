import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const path = request.nextUrl.pathname

  // Handle CORS for API routes
  if (path.startsWith("/api/")) {
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 200,
        headers: response.headers,
      })
    }

    return response
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // If Supabase is not configured, skip authentication checks
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      "[v0] Supabase credentials not found. Authentication features are disabled. Configure Supabase integration in Project Settings to enable authentication.",
    )
    return response
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Define paths that don't require authentication
  const publicPaths = ["/", "/login", "/register", "/forgot-password", "/pricing", "/preview"]
  const adminPublicPaths = ["/admin/login"]
  const authCallbackPaths = ["/auth/callback", "/auth/confirm"]

  // Check if the path is public or auth callback
  const isPublicPath = publicPaths.some((p) => path === p || path.startsWith(p))
  const isAdminPublicPath = adminPublicPaths.some((p) => path === p || path.startsWith(p))
  const isAuthCallback = authCallbackPaths.some((p) => path.startsWith(p))

  // Allow auth callbacks to proceed
  if (isAuthCallback) {
    return response
  }

  const isAdminRoute = path.startsWith("/admin")

  if (isAdminRoute && !isAdminPublicPath) {
    // Admin routes require authentication and admin role
    if (!user) {
      const redirectUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(redirectUrl)
    }

    // Check if user has admin role
    const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (profile?.role !== "admin") {
      // Not an admin, redirect to regular login
      return NextResponse.redirect(new URL("/login", request.url))
    }

    return response
  }

  // If user is authenticated and trying to access login/register, redirect based on role
  if (user && (path === "/login" || path === "/register")) {
    const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (profile?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (user && path === "/admin/login") {
    const { data: profile } = await supabase.from("users").select("role").eq("id", user.id).single()

    if (profile?.role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }
  }

  // If user is not authenticated and trying to access protected route, redirect to login
  if (!user && !isPublicPath && !isAdminPublicPath) {
    const redirectUrl = new URL("/login", request.url)
    redirectUrl.searchParams.set("redirect", path)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
