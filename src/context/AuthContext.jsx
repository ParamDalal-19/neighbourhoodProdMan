import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase.js'
import { localAuth } from '../lib/localBackend.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null) // { id, email }
  const [profile, setProfile] = useState(null) // { id, full_name, neighbourhood, ... }
  const [loading, setLoading] = useState(true)

  const loadProfile = useCallback(async (userId) => {
    if (!userId) {
      setProfile(null)
      return
    }
    if (isSupabaseConfigured) {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()
      setProfile(data || null)
    } else {
      setProfile(localAuth.getProfileSync(userId))
    }
  }, [])

  useEffect(() => {
    let unsub = () => {}

    async function init() {
      if (isSupabaseConfigured) {
        const { data } = await supabase.auth.getSession()
        const sessionUser = data?.session?.user || null
        setUser(sessionUser)
        await loadProfile(sessionUser?.id)
        setLoading(false)

        const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
          const sessionUser = session?.user || null
          setUser(sessionUser)
          await loadProfile(sessionUser?.id)
        })
        unsub = () => sub.subscription.unsubscribe()
      } else {
        const session = await localAuth.getSession()
        setUser(session ? { id: session.userId } : null)
        await loadProfile(session?.userId)
        setLoading(false)

        const sub = localAuth.onAuthStateChange(async (session) => {
          setUser(session ? { id: session.userId } : null)
          await loadProfile(session?.userId)
        })
        unsub = () => sub.unsubscribe()
      }
    }

    init()
    return () => unsub()
  }, [loadProfile])

  const signUp = useCallback(async ({ fullName, neighbourhood, email, password }) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      const newUser = data.user
      if (newUser) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: newUser.id,
          full_name: fullName,
          neighbourhood,
        })
        if (profileError) throw profileError
        setUser(newUser)
        await loadProfile(newUser.id)
      }
      return newUser
    }
    const { user: newUser } = await localAuth.signUp({ email, password, fullName, neighbourhood })
    setUser(newUser)
    await loadProfile(newUser.id)
    return newUser
  }, [loadProfile])

  const signIn = useCallback(async ({ email, password }) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw new Error('Invalid email or password.')
      setUser(data.user)
      await loadProfile(data.user.id)
      return data.user
    }
    const { user: signedInUser } = await localAuth.signIn({ email, password })
    setUser(signedInUser)
    await loadProfile(signedInUser.id)
    return signedInUser
  }, [loadProfile])

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut()
    } else {
      await localAuth.signOut()
    }
    setUser(null)
    setProfile(null)
  }, [])

  const value = {
    user,
    profile,
    loading,
    isAuthenticated: Boolean(user),
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
