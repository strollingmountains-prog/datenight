import { useState, useRef, useCallback, useEffect } from 'react'

interface Props {
  onAccept: () => void
  onDecline: () => void
}

const DODGE_MESSAGES = [
  'Nice try! 😂',
  'Are you really trying to escape a home-cooked dinner?',
  'Saurabh has already started planning the menu. 🥲',
  'That button seems to have commitment issues.',
  'Okay, we both know you\'re curious. 😉',
]

export default function Screen01Invitation({ onAccept, onDecline }: Props) {
  const [dodgeMessage, setDodgeMessage] = useState('')
  const [showDeclineOption, setShowDeclineOption] = useState(false)
  const [declineCount, setDeclineCount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const msgIndexRef = useRef(0)
  const shakeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const angleRef = useRef(Math.random() * Math.PI * 2)
  const animFrameRef = useRef<number | null>(null)
  const orbitingRef = useRef(false)

  useEffect(() => {
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
    }
  }, [])

  const getNextDodgeMessage = () => {
    const msg = DODGE_MESSAGES[msgIndexRef.current % DODGE_MESSAGES.length]
    msgIndexRef.current++
    return msg
  }

  const startOrbit = useCallback(() => {
    if (orbitingRef.current) return
    orbitingRef.current = true

    const btn = noButtonRef.current
    if (!btn) return

    const w = btn.offsetWidth
    const h = btn.offsetHeight

    btn.style.position = 'fixed'
    btn.style.transition = 'none'
    btn.style.zIndex = '100'
    btn.style.width = `${w}px`
    btn.style.height = `${h}px`

    const tick = () => {
      angleRef.current += 0.025
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const radius = Math.min(window.innerWidth, window.innerHeight) * 0.35
      const x = cx + radius * Math.cos(angleRef.current) - w / 2
      const y = cy + radius * Math.sin(angleRef.current) - h / 2
      if (btn) {
        btn.style.left = `${x}px`
        btn.style.top = `${y}px`
      }
      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)
    setDodgeMessage(getNextDodgeMessage())
    setDeclineCount(prev => {
      const next = prev + 1
      if (next >= 4) setShowDeclineOption(true)
      return next
    })
  }, [])

  const handleMobileTap = useCallback(() => {
    const btn = noButtonRef.current
    if (!btn) return

    const angles = [
      { x: 80, y: 0 }, { x: -80, y: 0 },
      { x: 0, y: 60 }, { x: 0, y: -60 },
      { x: 60, y: 40 }, { x: -60, y: 40 },
    ]
    const angle = angles[Math.floor(Math.random() * angles.length)]

    btn.style.transition = 'transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
    btn.style.transform = `translate(${angle.x}px, ${angle.y}px) rotate(${Math.random() * 20 - 10}deg)`

    if (shakeTimeoutRef.current) clearTimeout(shakeTimeoutRef.current)
    shakeTimeoutRef.current = setTimeout(() => {
      btn.style.transform = 'translate(0, 0) rotate(0)'
    }, 500)

    setDodgeMessage(getNextDodgeMessage())
    setDeclineCount(prev => prev + 1)

    if (declineCount >= 3) {
      setShowDeclineOption(true)
    }
  }, [declineCount])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-10" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl opacity-10 animate-float">🌹</div>
        <div className="absolute top-1/3 right-8 text-5xl opacity-10 animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-32 left-16 text-4xl opacity-10 animate-float" style={{ animationDelay: '2s' }}>🍷</div>
        <div className="absolute bottom-16 right-20 text-5xl opacity-10 animate-float" style={{ animationDelay: '0.5s' }}>🕯️</div>
      </div>

      <div className="w-full max-w-lg animate-fade-in-up">
        {/* Header label */}
        <div className="text-center mb-8">
          <span className="section-label">A Personal Invitation</span>
          <div className="divider w-24 mx-auto mt-3" />
        </div>

        {/* Main card */}
        <div className="card p-8 md:p-10 text-center">
          {/* Greeting */}
          <h1 className="font-playfair text-4xl md:text-5xl font-medium mb-6" style={{ color: 'var(--color-text)' }}>
            Hey, Arshi! 👋
          </h1>

          <div className="divider w-16 mx-auto mb-6" />

          {/* Main message */}
          <p className="text-lg leading-relaxed mb-4" style={{ color: 'var(--color-text)', fontFamily: 'Inter' }}>
            Since you finally decided to go out with Saurabh, he'd like to host you this Saturday, 28th November.
          </p>

          <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--color-muted)' }}>
            He'll take care of the cooking. Your only responsibilities are bringing the energy, the appetite and some good conversation.
          </p>

          {/* Highlight box */}
          <div className="rounded-xl p-4 mb-8" style={{ background: 'linear-gradient(135deg, #FDF8F0, #FAF0E0)', border: '1px solid var(--color-gold-light)' }}>
            <p className="font-playfair text-xl italic" style={{ color: 'var(--color-brown)' }}>
              "He cooks. You show up. Deal? 😉"
            </p>
          </div>

          {/* Event details */}
          <div className="flex justify-center gap-6 mb-8">
            <div className="text-center">
              <p className="section-label mb-1">Date</p>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>Saturday, 28 November 2026</p>
            </div>
            <div className="w-px" style={{ background: 'var(--color-gold-light)' }} />
            <div className="text-center">
              <p className="section-label mb-1">Host</p>
              <p className="font-medium" style={{ color: 'var(--color-text)' }}>Saurabh 👨‍🍳</p>
            </div>
          </div>

          {/* Dodge message */}
          {dodgeMessage && (
            <div className="mb-4 py-2 px-4 rounded-full text-sm animate-scale-in" style={{ background: 'var(--color-rose-light)', color: 'var(--color-rose)' }}>
              {dodgeMessage}
            </div>
          )}

          {/* Buttons — relative container for dodge */}
          <div className="relative" style={{ minHeight: isMobile ? 'auto' : '80px' }}>
            {/* Yes button */}
            <button
              onClick={onAccept}
              className="btn-primary w-full mb-3"
            >
              Yes, I'm in! ❤️
            </button>

            {/* No button — orbits on desktop hover, bounces on mobile tap */}
            <button
              ref={noButtonRef}
              onMouseEnter={isMobile ? undefined : startOrbit}
              onClick={isMobile ? handleMobileTap : undefined}
              className="w-full py-3 px-6 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                border: '2px solid #E8E0D5',
                color: 'var(--color-muted)',
                background: 'white',
                fontFamily: 'Inter',
              }}
            >
              No, thanks 🙃
            </button>
          </div>

          {/* Discreet real decline option */}
          {showDeclineOption && (
            <div className="mt-4 animate-fade-in-up">
              <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>
                If you genuinely can't make it:
              </p>
              <button
                onClick={onDecline}
                className="text-xs underline"
                style={{ color: 'var(--color-muted)' }}
              >
                I really can't come this time
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: 'var(--color-muted)' }}>
          Handcrafted with 💛 by Saurabh
        </p>
      </div>
    </div>
  )
}
