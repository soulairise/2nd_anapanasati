import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../lib/store'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    auth.getUser().then((u) => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  const signIn = async (email) => {
    const u = await auth.signIn(email)
    setUser(u)
    return u
  }

  const signOut = async () => {
    await auth.signOut()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
