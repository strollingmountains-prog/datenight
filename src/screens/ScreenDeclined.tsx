export default function ScreenDeclined() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(145deg, #FAF7F2 0%, #F5EDE0 100%)' }}>
      <div className="w-full max-w-md text-center animate-fade-in-up">
        <div className="text-5xl mb-4">🥲</div>
        <h1 className="font-playfair text-3xl font-medium mb-4" style={{ color: 'var(--color-text)' }}>
          That's alright.
        </h1>
        <div className="card p-8">
          <p className="text-base leading-relaxed mb-4" style={{ color: 'var(--color-muted)' }}>
            No pressure at all. The invitation stands for another time — whenever you're ready.
          </p>
          <p className="font-playfair text-lg italic" style={{ color: 'var(--color-brown)' }}>
            "The menu will keep. 😊"
          </p>
        </div>
        <p className="mt-6 text-sm" style={{ color: 'var(--color-muted)' }}>
          — Saurabh
        </p>
      </div>
    </div>
  )
}
