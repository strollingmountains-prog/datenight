import { useState } from 'react'
import AdminLogin from './AdminLogin'
import AdminDashboard from './AdminDashboard'

const SESSION_KEY = 'admin_auth'

export default function AdminApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try { return sessionStorage.getItem(SESSION_KEY) === '1' } catch { return false }
  })

  const handleLogin = () => {
    try { sessionStorage.setItem(SESSION_KEY, '1') } catch {}
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    try { sessionStorage.removeItem(SESSION_KEY) } catch {}
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
