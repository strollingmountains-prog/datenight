import { useState } from 'react'
import { supabase } from '../lib/supabase'

interface Props {
  onLogin: () => void
}

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (authError) {
      setError('Invalid email or password.')
      return
    }

    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      <div className="w-full max-w-md animate-fade-in-up">
        <div className="text-center mb-8">
          <span className="section-label">Private Access</span>
          <h1 className="font-playfair text-3xl font-medium mt-3" style={{ color: 'var(--color-text)' }}>
            Admin Dashboard
          </h1>
          <p className="text-sm mt-2" style={{ color: 'var(--color-muted)' }}>Dinner with Saurabh</p>
          <div className="divider w-16 mx-auto mt-4" />
        </div>

        <div className="card p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="section-label mb-2 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
                className="w-full py-3 px-4 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: '2px solid #E8E0D5',
                  fontFamily: 'Inter',
                  color: 'var(--color-text)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = '#E8E0D5'}
              />
            </div>

            <div>
              <label className="section-label mb-2 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full py-3 px-4 rounded-xl text-sm outline-none transition-all"
                style={{
                  border: '2px solid #E8E0D5',
                  fontFamily: 'Inter',
                  color: 'var(--color-text)',
                }}
                onFocus={e => e.target.style.borderColor = 'var(--color-gold)'}
                onBlur={e => e.target.style.borderColor = '#E8E0D5'}
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl text-sm text-center" style={{ background: 'var(--color-rose-light)', color: 'var(--color-rose)' }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
          🔒 This dashboard is private and secured.
        </p>
      </div>
    </div>
  )
}
