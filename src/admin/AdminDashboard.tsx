import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { getAllResponses } from '../lib/api'
import type { DinnerResponse } from '../types'

interface Props {
  onLogout: () => void
}

function formatIST(utcString: string): string {
  if (!utcString) return '—'
  const date = new Date(utcString)
  return date.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'accepted') {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#D1FAE5', color: '#065F46' }}>
        ✓ Accepted
      </span>
    )
  }
  if (status === 'declined') {
    return (
      <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#FEE2E2', color: '#991B1B' }}>
        ✕ Declined
      </span>
    )
  }
  return (
    <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: '#FEF9C3', color: '#713F12' }}>
      ⏳ Pending
    </span>
  )
}

function ResponseDetail({ response, onClose }: { response: DinnerResponse; onClose: () => void }) {
  const isComplete = response.selected_drink && response.selected_ambience && response.selected_music && response.arrival_time

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(44,36,22,0.5)', backdropFilter: 'blur(4px)' }}>
      <div className="card w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          <div className="flex justify-between items-start mb-5">
            <div>
              <span className="section-label">Response Detail</span>
              <h2 className="font-playfair text-2xl font-medium mt-1" style={{ color: 'var(--color-text)' }}>
                Arshi's Dinner Preferences
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-2xl leading-none"
              style={{ color: 'var(--color-muted)' }}
            >
              ×
            </button>
          </div>

          <div className="divider mb-5" />

          <div className="space-y-4">
            <div>
              <p className="section-label mb-1">Invitation Status</p>
              <StatusBadge status={response.invitation_status} />
            </div>

            {response.food_menu && (
              <div>
                <p className="section-label mb-1">Food</p>
                {(Array.isArray(response.food_menu) ? response.food_menu : []).map((f: string) => (
                  <p key={f} className="text-sm" style={{ color: 'var(--color-text)' }}>• {f}</p>
                ))}
              </div>
            )}

            {response.selected_drink ? (
              <div>
                <p className="section-label mb-1">Drink</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{response.selected_drink}</p>
              </div>
            ) : (
              <div>
                <p className="section-label mb-1">Drink</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Not selected</p>
              </div>
            )}

            {response.selected_ambience ? (
              <div>
                <p className="section-label mb-1">Ambience</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{response.selected_ambience}</p>
              </div>
            ) : (
              <div>
                <p className="section-label mb-1">Ambience</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Not selected</p>
              </div>
            )}

            {response.selected_music ? (
              <div>
                <p className="section-label mb-1">Music</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{response.selected_music}</p>
              </div>
            ) : (
              <div>
                <p className="section-label mb-1">Music</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Not selected</p>
              </div>
            )}

            {response.arrival_time ? (
              <div>
                <p className="section-label mb-1">Arrival Time</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{response.arrival_time}</p>
              </div>
            ) : (
              <div>
                <p className="section-label mb-1">Arrival Time</p>
                <p className="text-sm" style={{ color: 'var(--color-muted)' }}>Not selected</p>
              </div>
            )}

            <div className="divider" />

            <div>
              <p className="section-label mb-1">Submitted At</p>
              <p className="text-sm" style={{ color: 'var(--color-text)' }}>{formatIST(response.submitted_at)} IST</p>
            </div>

            {!isComplete && response.invitation_status === 'accepted' && (
              <div className="p-3 rounded-xl text-sm" style={{ background: '#FEF9C3', color: '#713F12' }}>
                ⏳ Preferences not yet completed
              </div>
            )}
          </div>

          <button onClick={onClose} className="btn-primary w-full mt-6">Close</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminDashboard({ onLogout }: Props) {
  const [responses, setResponses] = useState<DinnerResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedResponse, setSelectedResponse] = useState<DinnerResponse | null>(null)
  const [filter, setFilter] = useState<'all' | 'accepted' | 'declined' | 'incomplete'>('all')

  const fetchResponses = useCallback(async () => {
    setLoading(true)
    const { data, error: fetchError } = await getAllResponses()
    setLoading(false)
    if (fetchError) {
      setError('Could not load responses.')
    } else {
      setResponses(data || [])
    }
  }, [])

  useEffect(() => { fetchResponses() }, [fetchResponses])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const total = responses.length
  const accepted = responses.filter(r => r.invitation_status === 'accepted').length
  const declined = responses.filter(r => r.invitation_status === 'declined').length
  const complete = responses.filter(r =>
    r.invitation_status === 'accepted' &&
    r.selected_drink && r.selected_ambience && r.selected_music && r.arrival_time
  ).length

  const filteredResponses = responses.filter(r => {
    if (filter === 'accepted') return r.invitation_status === 'accepted'
    if (filter === 'declined') return r.invitation_status === 'declined'
    if (filter === 'incomplete') return r.invitation_status === 'accepted' && (!r.selected_drink || !r.selected_ambience || !r.selected_music || !r.arrival_time)
    return true
  })

  return (
    <div className="min-h-screen py-8 px-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <span className="section-label">Private Dashboard</span>
            <h1 className="font-playfair text-2xl md:text-3xl font-medium mt-1" style={{ color: 'var(--color-text)' }}>
              Dinner with Saurabh
            </h1>
          </div>
          <div className="flex gap-3">
            <button
              onClick={fetchResponses}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{ border: '2px solid var(--color-gold-light)', color: 'var(--color-brown)', background: 'white' }}
            >
              ↻ Refresh
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all"
              style={{ border: '2px solid #E8E0D5', color: 'var(--color-muted)', background: 'white' }}
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Responses', value: total, emoji: '📋' },
            { label: 'Accepted', value: accepted, emoji: '❤️' },
            { label: 'Declined', value: declined, emoji: '🙃' },
            { label: 'Completed', value: complete, emoji: '✅' },
          ].map(({ label, value, emoji }) => (
            <div key={label} className="card p-5 text-center">
              <div className="text-3xl mb-2">{emoji}</div>
              <div className="font-playfair text-3xl font-semibold mb-1" style={{ color: 'var(--color-gold)' }}>
                {value}
              </div>
              <div className="section-label">{label}</div>
            </div>
          ))}
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {(['all', 'accepted', 'declined', 'incomplete'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-4 py-2 rounded-full text-sm font-medium capitalize transition-all"
              style={{
                background: filter === f ? 'linear-gradient(135deg, #C9A96E, #8B6914)' : 'white',
                color: filter === f ? 'white' : 'var(--color-muted)',
                border: `2px solid ${filter === f ? 'transparent' : '#E8E0D5'}`,
                fontFamily: 'Inter',
              }}
            >
              {f === 'incomplete' ? 'Incomplete' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Responses table / list */}
        <div className="card overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <span className="inline-block w-8 h-8 border-2 border-t-transparent rounded-full animate-spin mb-3" style={{ borderColor: 'var(--color-gold)', borderTopColor: 'transparent' }} />
              <p style={{ color: 'var(--color-muted)' }}>Loading responses…</p>
            </div>
          ) : error ? (
            <div className="p-12 text-center">
              <p style={{ color: 'var(--color-rose)' }}>{error}</p>
            </div>
          ) : filteredResponses.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">📭</div>
              <p className="font-playfair text-xl mb-2" style={{ color: 'var(--color-text)' }}>
                {filter === 'all' ? 'No responses yet' : `No ${filter} responses`}
              </p>
              <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
                {filter === 'all' ? "Arshi hasn't opened the invitation yet. Share the link to get started!" : 'Try a different filter.'}
              </p>
            </div>
          ) : (
            <div>
              {/* Table header - desktop */}
              <div className="hidden md:grid md:grid-cols-6 gap-4 px-6 py-3 text-xs" style={{ background: '#FDF8F0', borderBottom: '1px solid var(--color-gold-light)' }}>
                <div className="section-label">Guest</div>
                <div className="section-label">Status</div>
                <div className="section-label">Drink</div>
                <div className="section-label">Ambience</div>
                <div className="section-label">Arrival</div>
                <div className="section-label">Submitted</div>
              </div>

              {/* Rows */}
              {filteredResponses.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedResponse(r)}
                  className="cursor-pointer hover:bg-amber-50 transition-colors"
                  style={{ borderBottom: '1px solid #F0EAE0' }}
                >
                  {/* Mobile layout */}
                  <div className="md:hidden p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium" style={{ color: 'var(--color-text)' }}>{r.guest_name}</span>
                      <StatusBadge status={r.invitation_status} />
                    </div>
                    {r.arrival_time && (
                      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>⏰ {r.arrival_time}</p>
                    )}
                    <p className="text-xs mt-1" style={{ color: 'var(--color-muted)' }}>{formatIST(r.submitted_at)} IST</p>
                  </div>

                  {/* Desktop layout */}
                  <div className="hidden md:grid md:grid-cols-6 gap-4 px-6 py-4 items-center">
                    <div className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>{r.guest_name}</div>
                    <div><StatusBadge status={r.invitation_status} /></div>
                    <div className="text-sm" style={{ color: 'var(--color-muted)' }}>{r.selected_drink || '—'}</div>
                    <div className="text-sm" style={{ color: 'var(--color-muted)' }}>{r.selected_ambience || '—'}</div>
                    <div className="text-sm" style={{ color: 'var(--color-muted)' }}>{r.arrival_time || '—'}</div>
                    <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{formatIST(r.submitted_at)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
          All times shown in Indian Standard Time (IST)
        </p>
      </div>

      {selectedResponse && (
        <ResponseDetail response={selectedResponse} onClose={() => setSelectedResponse(null)} />
      )}
    </div>
  )
}
