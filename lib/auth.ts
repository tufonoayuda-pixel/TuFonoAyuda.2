// Simple authentication system compatible with static hosting (Hostinger)
export interface User {
  id: string
  name: string
  email: string
  plan: "Estudiante" | "Profesional" | "Experto" | "Admin"
  avatarUrl?: string
  createdAt: Date
}

export interface AuthState {
  user: User | null
  isLoading: boolean
}

const USERS_DB: Record<string, User> = {
  "tufonoayuda@gmail.com": {
    id: "admin-1",
    name: "Administrador TuFonoAyuda",
    email: "tufonoayuda@gmail.com",
    plan: "Admin",
    avatarUrl: undefined,
    createdAt: new Date("2024-01-01"),
  },
  "demo@tufonoayuda.com": {
    id: "demo-1",
    name: "Usuario Demo",
    email: "demo@tufonoayuda.com",
    plan: "Profesional",
    avatarUrl: undefined,
    createdAt: new Date("2024-01-15"),
  },
  "estudiante@demo.com": {
    id: "demo-2",
    name: "Estudiante Demo",
    email: "estudiante@demo.com",
    plan: "Estudiante",
    avatarUrl: undefined,
    createdAt: new Date("2024-02-01"),
  },
}

export const loginWithGoogle = async (): Promise<User> => {
  return new Promise((resolve, reject) => {
    // Simulate Google OAuth popup
    const email = prompt("Ingresa tu email de Google para la demo:")
    const name = prompt("Ingresa tu nombre:")

    if (!email || !name) {
      reject(new Error("Datos incompletos"))
      return
    }

    // Check if user exists or create new one
    let user = USERS_DB[email]
    if (!user) {
      user = {
        id: `user-${Date.now()}`,
        name,
        email,
        plan: email === "tufonoayuda@gmail.com" ? "Admin" : "Profesional",
        avatarUrl: undefined,
        createdAt: new Date(),
      }
      USERS_DB[email] = user
    }

    if (email === "tufonoayuda@gmail.com") {
      user.plan = "Admin"
      user.name = "Administrador TuFonoAyuda"
    }

    // Store in localStorage
    localStorage.setItem("tufonoayuda_user", JSON.stringify(user))
    localStorage.setItem("tufonoayuda_auth_token", `token-${user.id}`)

    document.cookie = `tufonoayuda_token=token-${user.id}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days

    setTimeout(() => resolve(user), 1000) // Simulate network delay
  })
}

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simple validation for demo
      if (!email || !password) {
        reject(new Error("Email y contraseña son requeridos"))
        return
      }

      if (email === "tufonoayuda@gmail.com") {
        if (password !== "admin123") {
          reject(new Error("Contraseña incorrecta para el administrador"))
          return
        }
      }

      // Check if user exists or create demo user
      let user = USERS_DB[email]
      if (!user) {
        user = {
          id: `user-${Date.now()}`,
          name: email.split("@")[0],
          email,
          plan: email === "tufonoayuda@gmail.com" ? "Admin" : "Profesional",
          createdAt: new Date(),
        }
        USERS_DB[email] = user
      }

      // Ensure admin user has correct permissions
      if (email === "tufonoayuda@gmail.com") {
        user.plan = "Admin"
        user.name = "Administrador TuFonoAyuda"
      }

      localStorage.setItem("tufonoayuda_user", JSON.stringify(user))
      localStorage.setItem("tufonoayuda_auth_token", `token-${user.id}`)

      document.cookie = `tufonoayuda_token=token-${user.id}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days

      resolve(user)
    }, 1000)
  })
}

export const register = async (userData: {
  email: string
  password: string
  name: string
  userType: string
}): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, name, userType } = userData

      if (USERS_DB[email]) {
        reject(new Error("El usuario ya existe"))
        return
      }

      const user: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        plan: userType === "student" ? "Estudiante" : "Profesional",
        createdAt: new Date(),
      }

      USERS_DB[email] = user
      localStorage.setItem("tufonoayuda_user", JSON.stringify(user))
      localStorage.setItem("tufonoayuda_auth_token", `token-${user.id}`)

      document.cookie = `tufonoayuda_token=token-${user.id}; path=/; max-age=${7 * 24 * 60 * 60}` // 7 days

      resolve(user)
    }, 1000)
  })
}

export const logout = async (): Promise<void> => {
  localStorage.removeItem("tufonoayuda_user")
  localStorage.removeItem("tufonoayuda_auth_token")
  document.cookie = "tufonoayuda_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null

  const userStr = localStorage.getItem("tufonoayuda_user")
  const token = localStorage.getItem("tufonoayuda_auth_token")

  if (!userStr || !token) return null

  try {
    return JSON.parse(userStr)
  } catch {
    return null
  }
}

export const isAuthenticated = (): boolean => {
  return !!getCurrentUser()
}

export const getUserCount = async (): Promise<number> => {
  // Simulate real user count with some randomization
  const baseCount = 547
  const timeBasedIncrement = Math.floor(Date.now() / 1000000) % 20 // Changes slowly over time
  const randomIncrement = Math.floor(Math.random() * 5)
  return baseCount + timeBasedIncrement + randomIncrement
}

export const getWaitlistCount = async (): Promise<number> => {
  // Return 0 since we removed waitlist functionality
  return 0
}

export const isAdminUser = (user: User | null): boolean => {
  return user?.email === "tufonoayuda@gmail.com" || user?.plan === "Admin"
}

export const getDemoCredentials = () => {
  return {
    admin: {
      email: "tufonoayuda@gmail.com",
      password: "admin123",
      description: "Acceso completo de administrador",
    },
    professional: {
      email: "demo@tufonoayuda.com",
      password: "demo123",
      description: "Usuario profesional demo",
    },
    student: {
      email: "estudiante@demo.com",
      password: "demo123",
      description: "Usuario estudiante demo",
    },
  }
}
