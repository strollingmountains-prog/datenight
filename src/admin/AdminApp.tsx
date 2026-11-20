import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'
import AdminResetPassword from './AdminResetPassword'

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isResettingPassword, setIsResettingPassword] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        setIsResettingPassword(true)
        setIsAuthenticated(false)
      } else {
        setIsAuthenticated(!!session)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isResettingPassword) {
    return <AdminResetPassword onDone={() => { setIsResettingPassword(false); setIsAuthenticated(false) }} />
  }

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
