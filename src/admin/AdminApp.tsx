import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--color-cream)' }}>
        <span className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin" style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }} />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />
}
