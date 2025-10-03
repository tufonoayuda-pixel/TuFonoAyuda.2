// Local authentication system for static hosting (Hostinger compatible)
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

// Mock database for demo purposes
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

// Mock data storage for demo
let mockPatients: any[] = []
const mockFinancialData: any[] = []
const mockProtocolData: any[] = []

export const loginWithEmail = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) {
        reject(new Error("Email y contraseña son requeridos"))
        return
      }

      // Demo credentials validation
      const validCredentials = [
        { email: "tufonoayuda@gmail.com", password: "admin123" },
        { email: "demo@tufonoayuda.com", password: "demo123" },
        { email: "estudiante@demo.com", password: "demo123" },
      ]

      const isValidCredential = validCredentials.some((cred) => cred.email === email && cred.password === password)

      if (!isValidCredential) {
        reject(new Error("Credenciales incorrectas"))
        return
      }

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

export const isAdminUser = (user: User | null): boolean => {
  return user?.email === "tufonoayuda@gmail.com" || user?.plan === "Admin"
}

// Mock data functions for demo
export const getPatients = () => {
  return mockPatients
}

export const addPatient = (patient: any) => {
  mockPatients.push({ ...patient, id: Date.now().toString() })
}

export const deletePatient = (id: string) => {
  mockPatients = mockPatients.filter((p) => p.id !== id)
}

export const getFinancialData = () => {
  return mockFinancialData
}

export const addFinancialRecord = (record: any) => {
  mockFinancialData.push({ ...record, id: Date.now().toString() })
}

export const getProtocolData = () => {
  return mockProtocolData
}

export const addProtocolData = (data: any) => {
  mockProtocolData.push({ ...data, id: Date.now().toString() })
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
