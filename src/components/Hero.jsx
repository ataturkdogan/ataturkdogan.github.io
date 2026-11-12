import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* ── 2D Canvas Particle Network ── */
function initParticles(canvas) {
  const ctx = canvas.getContext('2d')
  let W = canvas.width  = window.innerWidth
  let H = canvas.height = window.innerHeight
  const mouse = { x: -9999, y: -9999 }

  const COUNT = 160
  const CONNECT_DIST = 140
  const REPEL_DIST   = 130

  const particles = Array.from({ length: COUNT }, () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    r:  1.2 + Math.random() * 1.8,
    hue: Math.random() > 0.5 ? 262 : 190,   // violet or cyan
  }))

  let raf
  function draw() {
    raf = requestAnimationFrame(draw)
    ctx.clearRect(0, 0, W, H)

    /* update positions */
    particles.forEach(p => {
      /* mouse repulsion */
      const dx = p.x - mouse.x
      const dy = p.y - mouse.y
      const d2 = dx * dx + dy * dy
      if (d2 < REPEL_DIST * REPEL_DIST && d2 > 0) {
        const d = Math.sqrt(d2)
        const force = (REPEL_DIST - d) / REPEL_DIST * 1.8
        p.vx += (dx / d) * force * 0.4
        p.vy += (dy / d) * force * 0.4
      }

      /* speed clamp */
      const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
      if (spd > 2) { p.vx /= spd / 2; p.vy /= spd / 2; }

      p.x += p.vx
      p.y += p.vy

      /* wrap edges */
      if (p.x < -10) p.x = W + 10
      if (p.x > W + 10) p.x = -10
      if (p.y < -10) p.y = H + 10
      if (p.y > H + 10) p.y = -10
    })

    /* draw connections */
    for (let i = 0; i < COUNT - 1; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const d  = Math.sqrt(dx * dx + dy * dy)
        if (d < CONNECT_DIST) {
          const a = (1 - d / CONNECT_DIST) * 0.55
          const g = ctx.createLinearGradient(particles[i].x, particles[i].y, particles[j].x, particles[j].y)
          g.addColorStop(0, `hsla(${particles[i].hue},80%,65%,${a})`)
          g.addColorStop(1, `hsla(${particles[j].hue},80%,65%,${a})`)
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = g
          ctx.lineWidth = 0.9
          ctx.stroke()
        }
      }
    }

    /* draw particles */
    particles.forEach(p => {
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${p.hue},80%,72%,0.85)`
      ctx.shadowColor = `hsla(${p.hue},100%,70%,0.6)`
      ctx.shadowBlur  = 8
      ctx.fill()
      ctx.shadowBlur  = 0
    })
  }
  draw()

  const onMove = e => { mouse.x = e.clientX; mouse.y = e.clientY }
  const onLeave = () => { mouse.x = -9999; mouse.y = -9999 }
  const onResize = () => {
    W = canvas.width  = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseleave', onLeave)
  window.addEventListener('resize', onResize)
  return () => {
    cancelAnimationFrame(raf)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('mouseleave', onLeave)
    window.removeEventListener('resize', onResize)
  }
}

export default function Hero() {
  const canvasRef  = useRef(null)
  const headingRef = useRef(null)
  const subRef     = useRef(null)
  const descRef    = useRef(null)
  const ctaRef     = useRef(null)

  useEffect(() => initParticles(canvasRef.current), [])

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.4 })
    tl.from(headingRef.current, { y: 80, opacity: 0, duration: 1.1, ease: 'power4.out' })
      .from(subRef.current,     { y: 40, opacity: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .from(descRef.current,    { y: 30, opacity: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
      .from(ctaRef.current.children, { y: 24, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out' }, '-=0.45')
  }, [])

  const go = href => {
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden flex items-center justify-center">

      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" style={{ zIndex: 0 }} />

      {/* Animated color blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        <div style={{
          position: 'absolute', width: 700, height: 700, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,.22) 0%, transparent 70%)',
          top: '-15%', left: '-10%', filter: 'blur(60px)',
          animation: 'blobA 18s ease-in-out infinite',
        }}/>
        <div style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,.18) 0%, transparent 70%)',
          bottom: '-10%', right: '-8%', filter: 'blur(70px)',
          animation: 'blobB 22s ease-in-out infinite 3s',
        }}/>
        <div style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(192,132,252,.15) 0%, transparent 70%)',
          top: '40%', left: '55%', filter: 'blur(50px)',
          animation: 'blobC 14s ease-in-out infinite 6s',
        }}/>
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{
        zIndex: 2,
        background: 'radial-gradient(ellipse 80% 70% at 50% 50%, transparent 40%, rgba(4,4,12,.85) 100%)',
      }}/>

      {/* Content — centered */}
      <div className="relative text-center px-6 max-w-[860px] mx-auto" style={{ zIndex: 3 }}>

        <div ref={headingRef}>
          <p className="text-white/40 font-medium tracking-[.22em] uppercase text-sm mb-5">
            Computer Engineering Student · Software Developer
          </p>
          <h1 className="g-text font-black leading-[1] mb-0"
            style={{ fontSize: 'clamp(4.5rem,11vw,9.5rem)', letterSpacing: '-.04em' }}>
            Ata
          </h1>
          <h1 className="g-text font-black leading-[.95]"
            style={{ fontSize: 'clamp(4.5rem,11vw,9.5rem)', letterSpacing: '-.04em', paddingBottom: '.15em' }}>
            Türkdoğan
          </h1>
        </div>

        <p ref={subRef}
          className="mt-8 text-white/50 leading-[1.75] max-w-[520px] mx-auto"
          style={{ fontSize: 'clamp(.95rem,1.5vw,1.08rem)' }}>
          Passionate about artificial intelligence and game development,
          always building things that leave a mark.
        </p>

        {/* Glowing divider */}
        <div ref={descRef} className="my-8 flex items-center justify-center gap-4">
          <div style={{ height: 1, flex: 1, maxWidth: 140, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,.6))' }}/>
          <span className="text-white/20 text-xs tracking-[.18em] uppercase">Portfolio</span>
          <div style={{ height: 1, flex: 1, maxWidth: 140, background: 'linear-gradient(90deg, rgba(6,182,212,.6), transparent)' }}/>
        </div>

        <div ref={ctaRef} className="flex gap-4 justify-center flex-wrap">
          <button onClick={() => go('#experience')}
            className="px-8 py-[.9rem] rounded-full font-bold text-white text-[.95rem]
              bg-gradient-to-r from-[#7c3aed] to-[#4f46e5]
              shadow-[0_0_36px_rgba(124,58,237,.55),0_4px_16px_rgba(0,0,0,.4)]
              hover:shadow-[0_0_56px_rgba(124,58,237,.75),0_8px_24px_rgba(0,0,0,.5)]
              hover:scale-[1.04] transition-all duration-300 cursor-pointer">
            View Experience
          </button>
          <button onClick={() => go('#contact')}
            className="px-8 py-[.9rem] rounded-full font-semibold text-white/70 text-[.95rem]
              bg-white/[.06] border border-white/[.12] backdrop-blur-sm
              hover:bg-white/[.11] hover:text-white hover:border-white/25
              hover:scale-[1.04] transition-all duration-300 cursor-pointer">
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30" style={{ zIndex: 3 }}>
        <div className="w-5 h-8 rounded-full border border-white/30 flex items-start justify-center pt-1">
          <div className="w-[3px] h-[8px] rounded-full bg-white/60"
            style={{ animation: 'scrollDot 1.6s ease-in-out infinite' }}/>
        </div>
      </div>

      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0); opacity: 1; }
          80%  { transform: translateY(10px); opacity: 0; }
          100% { transform: translateY(0); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
