import { useState, useEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const links = [
  { label: 'Home',       href: '#hero'       },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog',       href: '#blog'       },
  { label: 'Contact',    href: '#contact'    },
]

export default function Navbar() {
  const [open, setOpen]     = useState(false)
  const [active, setActive] = useState('#hero')
  const [scrolled, setScrolled] = useState(false)
  const navRef       = useRef(null)
  const navigating   = useRef(false)

  useGSAP(() => {
    gsap.from(navRef.current, { y: -70, opacity: 0, duration: .9, ease: 'power3.out', delay: .2 })
  }, [])

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 40)
      if (navigating.current) return
      const secs = Array.from(document.querySelectorAll('section[id]'))
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 120
      if (atBottom && secs.length) {
        setActive('#' + secs[secs.length - 1].id)
        return
      }
      let cur = '#hero'
      secs.forEach(s => { if (window.scrollY >= s.offsetTop - 160) cur = '#' + s.id })
      setActive(cur)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    setActive(href)
    navigating.current = true
    setTimeout(() => { navigating.current = false }, 1200)
    const el = document.querySelector(href)
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' })
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <nav ref={navRef}
        className="flex items-center gap-1 px-2 py-[7px] rounded-full transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,6,22,.92)' : 'rgba(8,6,22,.72)',
          backdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,.09)',
          boxShadow: '0 8px 48px rgba(0,0,0,.6)',
          maxWidth: 'calc(100vw - 2rem)',
        }}>

        {/* Logo */}
        <a href="#hero" onClick={e => go(e, '#hero')}
          className="px-3 py-1 mr-1 font-black tracking-[.06em] whitespace-nowrap"
          style={{
            fontSize: 'clamp(.65rem, 1.2vw, .82rem)',
            background: 'linear-gradient(135deg, #a78bfa, #38bdf8)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
          ATA TÜRKDOĞAN
        </a>

        {/* Desktop links — shown at lg (1024px+) */}
        <ul className="hidden lg:flex items-center">
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => go(e, l.href)}
                className={`nlink px-3 py-2 rounded-full text-[.82rem] font-medium transition-colors duration-200
                  ${active === l.href ? 'text-white active' : 'text-white/45 hover:text-white/80'}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Connect */}
        <a href="#contact" onClick={e => go(e, '#contact')}
          className="ml-2 px-5 py-[.45rem] rounded-full text-[.82rem] font-bold
            bg-white text-[#06040f] hover:bg-white/90
            shadow-[0_2px_16px_rgba(255,255,255,.15)]
            transition-all duration-200 whitespace-nowrap">
          Connect
        </a>

        {/* Hamburger — visible below lg */}
        <button className="lg:hidden ml-2 p-2 flex flex-col gap-[4.5px]"
          onClick={() => setOpen(o => !o)} aria-label="Menu">
          <span className={`block w-4 h-[2px] bg-white/65 rounded transition-all duration-300 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`}/>
          <span className={`block w-4 h-[2px] bg-white/65 rounded transition-opacity ${open ? 'opacity-0' : ''}`}/>
          <span className={`block w-4 h-[2px] bg-white/65 rounded transition-all duration-300 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`}/>
        </button>
      </nav>

      {open && (
        <ul className="absolute top-[72px] left-4 right-4 z-50 rounded-2xl p-3 flex flex-col gap-1"
          style={{ background: 'rgba(8,6,22,.97)', backdropFilter: 'blur(28px)', border: '1px solid rgba(255,255,255,.08)', boxShadow: '0 24px 64px rgba(0,0,0,.7)' }}>
          {links.map(l => (
            <li key={l.href}>
              <a href={l.href} onClick={e => go(e, l.href)}
                className={`block px-4 py-3 rounded-xl font-medium text-[.95rem] transition-all
                  ${active === l.href ? 'text-white bg-white/[.07]' : 'text-white/55 hover:text-white hover:bg-white/[.05]'}`}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  )
}
