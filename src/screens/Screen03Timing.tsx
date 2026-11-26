import { useState } from 'react'
import type { DrinkOption, AmbienceOption, MusicOption } from '../types'
import { ARRIVAL_TIMES } from '../types'

interface Props {
  selectedDrink: DrinkOption
  selectedAmbience: AmbienceOption
  selectedMusic: MusicOption
  selectedFood: string[]
  arrivalTime?: string
  specialRequest?: string
  onConfirm: (time: string, specialRequest: string) => void
  isSubmitting: boolean
  submitError?: string
}

export default function Screen03Timing({
  selectedDrink,
  selectedAmbience,
  selectedMusic,
  selectedFood,
  arrivalTime,
  specialRequest: initialSpecialRequest,
  onConfirm,
  isSubmitting,
  submitError,
}: Props) {
  const [time, setTime] = useState(arrivalTime || '')
  const [specialRequest, setSpecialRequest] = useState(initialSpecialRequest || '')
  const [error, setError] = useState('')

  const handleConfirm = () => {
    if (!time) {
      setError('Please select your arrival time.')
      return
    }
    setError('')
    onConfirm(time, specialRequest)
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-8 text-5xl opacity-10 animate-float">⏰</div>
        <div className="absolute bottom-20 right-8 text-5xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🌙</div>
      </div>

      <div className="w-full max-w-lg mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="section-label">Your Evening · 02 / 02</span>
          <h1 className="font-playfair text-3xl md:text-4xl font-medium mt-3 mb-2" style={{ color: 'var(--color-text)' }}>
            When should I expect you? ⏰
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>
            The kitchen will be ready. The playlist will be sorted. Just need to know when you're arriving.
          </p>
          <div className="divider w-24 mx-auto mt-4" />
        </div>

        {/* Arrival time card */}
        <div className="card p-6 mb-5">
          <h2 className="font-playfair text-xl font-medium mb-4" style={{ color: 'var(--color-text)' }}>
            Your arrival time
          </h2>

          <div className="relative">
            <select
              value={time}
              onChange={(e) => { setTime(e.target.value); setError('') }}
              className="w-full appearance-none py-4 px-5 rounded-xl text-base font-medium cursor-pointer"
              style={{
                border: '2px solid',
                borderColor: time ? 'var(--color-gold)' : '#E8E0D5',
                background: time ? 'linear-gradient(135deg, #FDF8F0, #FAF0E0)' : 'white',
                color: time ? 'var(--color-brown)' : 'var(--color-muted)',
                fontFamily: 'Inter',
                outline: 'none',
              }}
            >
              <option value="" disabled>Select your arrival time</option>
              {ARRIVAL_TIMES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <div
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-lg"
              style={{ color: 'var(--color-gold)' }}
            >
              ▾
            </div>
          </div>
        </div>

        {/* Summary card */}
        <div className="card p-6 mb-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="divider flex-1" />
            <span className="section-label px-2">Your Saturday Plan</span>
            <div className="divider flex-1" />
          </div>

          <p className="text-center text-sm font-medium mb-5" style={{ color: 'var(--color-gold)' }}>
            Saturday, 28 November 2026
          </p>

          <div className="space-y-4">
            {/* Food */}
            <div className="flex gap-4">
              <span className="text-xl">🍽️</span>
              <div>
                <p className="section-label mb-1">Food</p>
                <div className="space-y-1">
                  {selectedFood.map((f) => (
                    <p key={f} className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      • {f}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            <div className="divider" />

            {/* Drinks */}
            <div className="flex gap-4">
              <span className="text-xl">🥂</span>
              <div>
                <p className="section-label mb-1">Drinks</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{selectedDrink}</p>
              </div>
            </div>

            <div className="divider" />

            {/* Ambience */}
            <div className="flex gap-4">
              <span className="text-xl">🕯️</span>
              <div>
                <p className="section-label mb-1">Ambience</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{selectedAmbience}</p>
              </div>
            </div>

            <div className="divider" />

            {/* Music */}
            <div className="flex gap-4">
              <span className="text-xl">🎶</span>
              <div>
                <p className="section-label mb-1">Music</p>
                <p className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>{selectedMusic}</p>
              </div>
            </div>

            <div className="divider" />

            {/* Arrival */}
            <div className="flex gap-4">
              <span className="text-xl">⏰</span>
              <div>
                <p className="section-label mb-1">Arrival</p>
                <p className="text-sm font-medium" style={{ color: time ? 'var(--color-text)' : 'var(--color-muted)' }}>
                  {time || 'Not selected yet'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Special request */}
        <div className="card p-6 mb-5">
          <h2 className="font-playfair text-xl font-medium mb-1" style={{ color: 'var(--color-text)' }}>
            Any special requests for tonight? 🌙
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
            Whisper your wish… 🫦 Just between you and the evening.
          </p>
          <textarea
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="e.g. Don't let the night end too soon. And maybe sit a little closer than necessary 😈"
            rows={3}
            className="w-full px-4 py-3 rounded-xl text-sm resize-none"
            style={{
              border: '2px solid',
              borderColor: specialRequest ? 'var(--color-gold)' : '#E8E0D5',
              background: specialRequest ? 'linear-gradient(135deg, #FDF8F0, #FAF0E0)' : 'white',
              color: 'var(--color-text)',
              fontFamily: 'Inter',
              outline: 'none',
            }}
          />
        </div>

        {/* Error messages */}
        {(error || submitError) && (
          <div className="mb-4 p-3 rounded-xl text-sm text-center" style={{ background: 'var(--color-rose-light)', color: 'var(--color-rose)' }}>
            {error || submitError}
          </div>
        )}

        {/* CTA */}
        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="btn-primary w-full mb-8 relative"
          style={{ opacity: isSubmitting ? 0.8 : 1 }}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Confirming...
            </span>
          ) : (
            'Confirm my evening ❤️'
          )}
        </button>
      </div>
    </div>
  )
}
