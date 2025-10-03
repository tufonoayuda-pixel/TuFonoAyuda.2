// These functions don't require authentication and can be used on the client

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

export const getUserCount = async (): Promise<number> => {
  // Simulate real user count with some randomization
  const baseCount = 547
  const timeBasedIncrement = Math.floor(Date.now() / 1000000) % 20 // Changes slowly over time
  const randomIncrement = Math.floor(Math.random() / 5)
  return baseCount + timeBasedIncrement + randomIncrement
}

export const getWaitlistCount = async (): Promise<number> => {
  // Return 0 since waitlist functionality was removed
  return 0
}
