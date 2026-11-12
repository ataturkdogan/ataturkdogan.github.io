import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const articles = [
  {
    tags: ['Cloud', 'Security'],
    title: 'Cloud Security',
    excerpt: 'Technology is advancing exponentially. Cloud security explores how organizations protect their data and what cybersecurity measures companies put in place to keep up with a rapidly evolving threat landscape.',
    date: 'Feb 1, 2026',
    href: 'https://medium.com/@hsdtedu/cloud-security-aabb02e8877a',
    accent: 'from-[#7c3aed] to-[#4f46e5]',
  },
  {
    tags: ['Networking', 'IPv6'],
    title: 'Differences Between IPv4 and IPv6 Protocols',
    excerpt: 'Comparing IPv4 and IPv6 — their address structures, capacity differences, and why the global transition to IPv6 matters for the future of the internet.',
    date: 'Apr 17, 2024',
    href: 'https://medium.com/@ata.turkdogan/ipv4-ve-ipv6-protokolleri-aras%C4%B1ndaki-farklar-5922ae9bb187',
    accent: 'from-[#4f46e5] to-[#7c3aed]',
  },
  {
    tags: ['AI', 'Hardware'],
    title: 'Yapay Zekanın Yazılım Dünyasındaki Yükselişi ve Donanım Maliyeti',
    excerpt: 'AI models like DeepSeek and Pangu are reshaping the global hardware supply chain — driving demand for HBM memory and SSDs while pushing up costs for everyday consumers.',
    date: '2026',
    href: 'https://tr.linkedin.com/posts/ataturkdogan_yapay-zekan%C4%B1n-yaz%C4%B1l%C4%B1m-d%C3%BCnyas%C4%B1ndaki-y%C3%BCkseli%C5%9Fini-activity-7455995240806723584-WaBo',
    accent: 'from-[#7c3aed] to-[#a855f7]',
  },
]

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 8h10M9 4l4 4-4 4"/>
  </svg>
)

function BlogCard({ tags, title, excerpt, date, href, accent }) {
  return (
    <article className="gcard bcrd relative flex flex-col p-7 min-h-[280px] group cursor-pointer">
      {/* Top accent bar */}
      <div className={`absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r ${accent} opacity-60`}/>

      <div className="flex gap-2 flex-wrap mb-4">
        {tags.map(t => (
          <span key={t}
            className="text-[.64rem] font-bold tracking-[.1em] uppercase
              px-[.6rem] py-[.22rem] rounded-full
              text-[#a78bfa] bg-[rgba(124,58,237,.14)] border border-[rgba(124,58,237,.2)]">
            {t}
          </span>
        ))}
      </div>

      <h3 className="text-[1.05rem] font-bold text-white leading-[1.35] mb-3
        group-hover:text-[#c4b5fd] transition-colors duration-200">
        <a href={href} target="_blank" rel="noopener noreferrer">{title}</a>
      </h3>

      <p className="text-[.875rem] text-white/40 leading-[1.7] flex-1">{excerpt}</p>

      <div className="mt-5 pt-4 border-t border-white/[.06] flex items-center justify-between">
        <span className="text-[.75rem] text-white/25 tracking-wide">{date}</span>
        <a href={href} target="_blank" rel="noopener noreferrer"
          className="text-[.82rem] text-[#a78bfa] font-semibold
            inline-flex items-center gap-[.35rem]
            hover:text-white hover:gap-[.55rem] transition-all duration-200">
          Read Article <Arrow/>
        </a>
      </div>
    </article>
  )
}

export default function Blog() {
  const sec  = useRef(null)
  const grid = useRef(null)

  useGSAP(() => {
    gsap.from(sec.current.querySelector('.sec-hdr'), {
      y: 50, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: sec.current, start: 'top 78%' },
    })
    gsap.from(grid.current.querySelectorAll('article'), {
      y: 70, opacity: 0, duration: .75, stagger: .13, ease: 'power3.out',
      scrollTrigger: { trigger: grid.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section id="blog" ref={sec}
      className="relative z-10 py-32 px-6 md:px-12 max-w-[1200px] mx-auto">

      <div className="sec-hdr text-center mb-20">
        <div className="s-tag mx-auto w-fit">
          <span className="w-[5px] h-[5px] rounded-full bg-[#a78bfa] animate-pulse inline-block"/>
          Blog
        </div>
        <h2 className="font-black text-white leading-tight"
          style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', letterSpacing: '-.03em' }}>
          Articles &amp; Thoughts
        </h2>
        <p className="mt-4 text-white/40 text-[1.05rem] max-w-[480px] mx-auto leading-relaxed">
          Writing about AI, cloud technology, networking, and software development.
        </p>
      </div>

      <div ref={grid}
        className="grid gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
        {articles.map(a => <BlogCard key={a.title} {...a}/>)}
      </div>
    </section>
  )
}
