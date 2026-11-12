import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sec = useRef(null)

  useGSAP(() => {
    gsap.from(sec.current.children, {
      y: 50, opacity: 0, duration: .85, stagger: .15, ease: 'power3.out',
      scrollTrigger: { trigger: sec.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section id="contact"
      className="relative z-10 py-32 px-6 md:px-12 max-w-[800px] mx-auto text-center">
      <div ref={sec}>

        <div className="mb-14">
          <div className="s-tag mx-auto w-fit mb-5">
            <span className="w-[5px] h-[5px] rounded-full bg-[#a78bfa] animate-pulse inline-block"/>
            Contact
          </div>
          <h2 className="font-black text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', letterSpacing: '-.03em' }}>
            Let's Connect
          </h2>
          <p className="mt-4 text-white/40 text-[1.05rem] max-w-[440px] mx-auto leading-relaxed">
            For projects, collaborations, or just to say hi — reach out anytime.
          </p>
        </div>

        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <a href="https://linkedin.com/in/ataturkdogan"
            target="_blank" rel="noopener noreferrer"
            className="sbtn relative inline-flex items-center gap-3 px-8 py-4
              rounded-[14px] font-semibold text-[1rem] text-white overflow-hidden
              bg-[rgba(12,10,28,.8)] border border-white/[.1] backdrop-blur-xl
              hover:-translate-y-[5px] hover:shadow-[0_16px_48px_rgba(124,58,237,.25)]
              transition-all duration-300">
            <span className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center
              font-black text-[.85rem]
              bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white flex-shrink-0">
              in
            </span>
            LinkedIn
          </a>

          <a href="https://github.com/ataturkdogan"
            target="_blank" rel="noopener noreferrer"
            className="sbtn relative inline-flex items-center gap-3 px-8 py-4
              rounded-[14px] font-semibold text-[1rem] text-white overflow-hidden
              bg-[rgba(12,10,28,.8)] border border-white/[.1] backdrop-blur-xl
              hover:-translate-y-[5px] hover:shadow-[0_16px_48px_rgba(124,58,237,.25)]
              transition-all duration-300">
            <span className="w-[34px] h-[34px] rounded-[9px] flex items-center justify-center
              font-black text-[.85rem]
              bg-gradient-to-br from-[#7c3aed] to-[#4f46e5] text-white flex-shrink-0">
              GH
            </span>
            GitHub
          </a>
        </div>

        <p className="text-white/35 text-[.95rem]">
          or write to{' '}
          <a href="mailto:ata.turkdogan@tedu.edu.tr"
            className="text-[#a78bfa] font-medium
              border-b border-[rgba(167,139,250,.3)] pb-[1px]
              hover:text-white hover:border-[#a78bfa]
              transition-all duration-200">
            ata.turkdogan@tedu.edu.tr
          </a>
        </p>
      </div>
    </section>
  )
}
