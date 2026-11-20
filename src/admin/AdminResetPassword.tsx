import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  onDone: () => void
}

export default function AdminResetPassword({ onDone }: Props) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    setError('')
    setLoading(true)

    const { error: updateError } = await supabase.auth.updateUser({ password })
    setLoading(false)

    if (updateError) {
      setError(updateError.message)
      return
    }

    setDone(true)
    setTimeout(onDone, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <span className="section-label">Set New Password</span>
          <h1 className="font-playfair text-3xl font-medium mt-3" style={{ color: 'var(--color-text)' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>Dinner with Saurabh</p>
          <div className="divider w-16 mx-auto mt-4" />
        </div>

        <div className="card p-8">
          {done ? (
            <div className="text-center py-4">
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>✓ Password updated. Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="section-label mb-2 block">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full py-3 px-4 rounded-xl text-sm outline-none transition-all"
                  style={{ border: '2px solid #E8E0D5', fontFamily: 'Inter', color: 'var(--color-text)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = '#E8E0D5'}
                />
              </div>
              <div>
                <label className="section-label mb-2 block">Confirm Password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full py-3 px-4 rounded-xl text-sm outline-none transition-all"
                  style={{ border: '2px solid #E8E0D5', fontFamily: 'Inter', color: 'var(--color-text)' }}
                  onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                  onBlur={e => e.target.style.borderColor = '#E8E0D5'}
                />
              </div>
              {error && (
                <div className="p-3 rounded-xl text-sm text-center" style={{ background: 'var(--color-rose-light)', color: 'var(--color-rose)' }}>
                  {error}
                </div>
              )}
              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating...
                  </span>
                ) : 'Set Password'}
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
          🔒 This dashboard is private and secured.
        </p>
      </div>
    </div>
  )
}
