import type { DrinkOption, AmbienceOption, MusicOption } from '../types'
import { FOOD_MENU } from '../types'

interface Props {
  selectedDrink: DrinkOption
  selectedAmbience: AmbienceOption
  selectedMusic: MusicOption
  arrivalTime: string
}

export default function Screen04Confirmation({ selectedDrink, selectedAmbience, selectedMusic, arrivalTime }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center py-10 px-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      {/* Background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-10 text-5xl opacity-10 animate-float">🌹</div>
        <div className="absolute top-1/4 right-8 text-5xl opacity-10 animate-float" style={{ animationDelay: '0.8s' }}>✨</div>
        <div className="absolute bottom-24 left-16 text-5xl opacity-10 animate-float" style={{ animationDelay: '1.6s' }}>🍷</div>
        <div className="absolute bottom-16 right-12 text-4xl opacity-10 animate-float" style={{ animationDelay: '2.4s' }}>🎶</div>
      </div>

      <div className="w-full max-w-lg animate-fade-in-up">
        {/* Main heading */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4 animate-float">🎉</div>
          <h1 className="font-playfair text-2xl md:text-3xl font-medium mb-4 leading-relaxed" style={{ color: 'var(--color-text)' }}>
            It's a date. Well, technically, it's dinner. Let's not get ahead of ourselves. 😉
          </h1>
          <p className="text-base" style={{ color: 'var(--color-muted)' }}>
            Your Saturday evening is officially planned.
          </p>
          <div className="divider w-24 mx-auto mt-4" />
        </div>

        {/* Summary card */}
        <div className="card p-6 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="divider flex-1" />
            <span className="section-label px-2">Rinki's Saturday Plan</span>
            <div className="divider flex-1" />
          </div>

          <div className="text-center mb-5">
            <span className="text-sm font-medium px-4 py-2 rounded-full" style={{ background: 'var(--color-gold-light)', color: 'var(--color-brown)' }}>
              Saturday, 21 November 2026
            </span>
          </div>

          <div className="space-y-4">
            {/* Arrival */}
            <div className="flex gap-4 p-3 rounded-xl" style={{ background: 'linear-gradient(135deg, #FDF8F0, #FAF0E0)' }}>
              <span className="text-2xl">⏰</span>
              <div>
                <p className="section-label mb-1">Arrival</p>
                <p className="font-semibold" style={{ color: 'var(--color-text)' }}>{arrivalTime}</p>
              </div>
            </div>

            <div className="divider" />

            {/* Dinner */}
            <div className="flex gap-4">
              <span className="text-2xl">🍽️</span>
              <div>
                <p className="section-label mb-2">Dinner</p>
                <div className="space-y-1">
                  {FOOD_MENU.map((f) => (
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
              <span className="text-2xl">🥂</span>
              <div>
                <p className="section-label mb-1">Drinks</p>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>{selectedDrink}</p>
              </div>
            </div>

            <div className="divider" />

            {/* Ambience */}
            <div className="flex gap-4">
              <span className="text-2xl">🕯️</span>
              <div>
                <p className="section-label mb-1">Ambience</p>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>{selectedAmbience}</p>
              </div>
            </div>

            <div className="divider" />

            {/* Music */}
            <div className="flex gap-4">
              <span className="text-2xl">🎶</span>
              <div>
                <p className="section-label mb-1">Music</p>
                <p className="font-medium" style={{ color: 'var(--color-text)' }}>{selectedMusic}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Closing message */}
        <div className="card p-6 mb-6 text-center" style={{ background: 'linear-gradient(135deg, #FDF8F0, #FAF0E0)', border: '1px solid var(--color-gold-light)' }}>
          <p className="font-playfair text-lg italic mb-2" style={{ color: 'var(--color-brown)' }}>
            "All that's left is to show up. I'll take care of the rest. 👨‍🍳"
          </p>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="font-playfair text-xl" style={{ color: 'var(--color-gold)' }}>
            See you Saturday, Rinki! 🌹
          </p>
          <p className="text-xs mt-2" style={{ color: 'var(--color-muted)' }}>
            Handcrafted with 💛 by Saurabh
          </p>
        </div>
      </div>
    </div>
  )
}
