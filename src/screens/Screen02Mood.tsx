import { useState } from 'react'
import type { DrinkOption, AmbienceOption, MusicOption } from '../types'
import { DRINK_OPTIONS, AMBIENCE_OPTIONS, MUSIC_OPTIONS, MUSIC_EMOJIS, FOOD_MENU } from '../types'

interface Props {
  selectedDrink?: DrinkOption
  selectedAmbience?: AmbienceOption
  selectedMusic?: MusicOption
  onUpdate: (drink: DrinkOption, ambience: AmbienceOption, music: MusicOption) => void
  onNext: () => void
}

export default function Screen02Mood({ selectedDrink, selectedAmbience, selectedMusic, onUpdate, onNext }: Props) {
  const [drink, setDrink] = useState<DrinkOption | undefined>(selectedDrink)
  const [ambience, setAmbience] = useState<AmbienceOption | undefined>(selectedAmbience)
  const [music, setMusic] = useState<MusicOption | undefined>(selectedMusic)
  const [error, setError] = useState('')

  const handleNext = () => {
    if (!drink) { setError('Please choose your drink preference.'); return }
    if (!ambience) { setError('Please choose the ambience.'); return }
    if (!music) { setError('Please choose the music vibe.'); return }
    setError('')
    onUpdate(drink, ambience, music)
    onNext()
  }

  const AMBIENCE_DESCRIPTIONS: Record<AmbienceOption, string> = {
    'Candlelight': 'A little intimate, a little romantic.',
    'Warm Dim Lights': 'Relaxed, cosy and easy-going.',
  }

  const AMBIENCE_EMOJI: Record<AmbienceOption, string> = {
    'Candlelight': '🕯️',
    'Warm Dim Lights': '🏮',
  }

  return (
    <div className="min-h-screen py-10 px-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      {/* Fixed decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 right-8 text-5xl opacity-10 animate-float">🕯️</div>
        <div className="absolute bottom-24 left-8 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.5s' }}>🎶</div>
      </div>

      <div className="w-full max-w-lg mx-auto animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="section-label">Dinner · 01 / 02</span>
          <h1 className="font-playfair text-3xl md:text-4xl font-medium mt-3 mb-2" style={{ color: 'var(--color-text)' }}>
            Let's set the mood, Rinki.
          </h1>
          <p style={{ color: 'var(--color-muted)' }}>How are we feeling about Saturday evening?</p>
          <div className="divider w-24 mx-auto mt-4" />
        </div>

        {/* A. Food section */}
        <div className="card p-6 mb-5">
          <h2 className="font-playfair text-xl font-medium mb-4" style={{ color: 'var(--color-text)' }}>
            First things first. What's on the menu?
          </h2>

          <div className="space-y-3">
            {FOOD_MENU.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between p-4 rounded-xl"
                style={{ background: 'linear-gradient(135deg, #FDF8F0, #FAF0E0)', border: '1px solid var(--color-gold-light)' }}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.includes('Chicken') ? '🍛' : '🍤'}</span>
                  <span className="font-medium" style={{ color: 'var(--color-text)' }}>{item}</span>
                </div>
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: 'var(--color-gold-light)', color: 'var(--color-brown)' }}
                >
                  Already decided ✓
                </span>
              </div>
            ))}
          </div>

          <p className="text-sm mt-4 italic" style={{ color: 'var(--color-muted)' }}>
            "You did mention you love chicken curry and rice. I was paying attention. 😉"
          </p>
        </div>

        {/* B. Drinks */}
        <div className="card p-6 mb-5">
          <h2 className="font-playfair text-xl font-medium mb-1" style={{ color: 'var(--color-text)' }}>
            How are we feeling about drinks? 🥂
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
            Pick your preferred poison. Figuratively, of course.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DRINK_OPTIONS.map((d) => (
              <button
                key={d}
                onClick={() => setDrink(d)}
                className={`option-card text-center ${drink === d ? 'selected' : ''}`}
              >
                <div className="text-2xl mb-1">
                  {d === 'Beer' ? '🍺' : d === 'Vodka' ? '🥃' : d === 'Gin' ? '🍸' : d === 'Rum' ? '🥃' : '🍹'}
                </div>
                <div className="text-sm font-medium" style={{ color: drink === d ? 'var(--color-brown)' : 'var(--color-text)' }}>
                  {d}
                </div>
                {drink === d && (
                  <div className="text-xs mt-1" style={{ color: 'var(--color-gold)' }}>✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* C. Ambience */}
        <div className="card p-6 mb-5">
          <h2 className="font-playfair text-xl font-medium mb-4" style={{ color: 'var(--color-text)' }}>
            What's the lighting situation? 🕯️
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {AMBIENCE_OPTIONS.map((a) => (
              <button
                key={a}
                onClick={() => setAmbience(a)}
                className={`option-card text-center py-5 ${ambience === a ? 'selected' : ''}`}
              >
                <div className="text-3xl mb-2">{AMBIENCE_EMOJI[a]}</div>
                <div className="font-medium text-sm mb-1" style={{ color: ambience === a ? 'var(--color-brown)' : 'var(--color-text)' }}>
                  {a}
                </div>
                <div className="text-xs" style={{ color: 'var(--color-muted)' }}>
                  {AMBIENCE_DESCRIPTIONS[a]}
                </div>
                {ambience === a && (
                  <div className="text-xs mt-2" style={{ color: 'var(--color-gold)' }}>✓ Selected</div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* D. Music */}
        <div className="card p-6 mb-6">
          <h2 className="font-playfair text-xl font-medium mb-1" style={{ color: 'var(--color-text)' }}>
            What should be playing in the background? 🎶
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--color-muted)' }}>
            Set the soundtrack for the evening.
          </p>

          <div className="space-y-2">
            {MUSIC_OPTIONS.map((m) => (
              <button
                key={m}
                onClick={() => setMusic(m)}
                className={`option-card w-full flex items-center gap-3 ${music === m ? 'selected' : ''}`}
              >
                <span className="text-xl">{MUSIC_EMOJIS[m]}</span>
                <span className="font-medium text-sm" style={{ color: music === m ? 'var(--color-brown)' : 'var(--color-text)' }}>
                  {m}
                </span>
                {music === m && (
                  <span className="ml-auto text-xs" style={{ color: 'var(--color-gold)' }}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm text-center" style={{ background: 'var(--color-rose-light)', color: 'var(--color-rose)' }}>
            {error}
          </div>
        )}

        {/* CTA */}
        <button onClick={handleNext} className="btn-primary w-full mb-8">
          That sounds like a plan →
        </button>
      </div>
    </div>
  )
}
