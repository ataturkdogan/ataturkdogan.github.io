export default function Footer() {
  return (
    <footer className="relative z-10 py-8 px-6 text-center text-white/20 text-[.82rem]"
      style={{ borderTop: '1px solid rgba(255,255,255,.05)' }}>
      <p>
        © 2026{' '}
        <span className="font-semibold" style={{
          background: 'linear-gradient(135deg,#a78bfa,#38bdf8)',
          WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent',
        }}>
          Ata Türkdoğan
        </span>
        {' '}— All rights reserved.
      </p>
    </footer>
  )
}
