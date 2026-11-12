import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const work = [
  {
    company: 'Innova',
    badge: 'Intern',
    role: 'Application Development Intern',
    desc: "At Innova, one of Turkey's leading IT companies (a Türk Telekom subsidiary), I actively participated in web application development projects, gaining real-world software engineering experience.",
    logo: '/assets/logos/innova.png', bg: '#fff',
  },
  {
    company: 'Rysesoft',
    badge: 'Intern',
    role: 'Game Developer Intern',
    desc: 'At Rysesoft, an Ankara-based game development studio, I worked on game development projects, building interactive experiences and deepening my knowledge of game mechanics and design.',
    logo: '/assets/logos/rysesoft.png', bg: '#000',
  },
  {
    company: 'Bluesense',
    badge: 'Intern',
    role: 'Artificial Intelligence Intern',
    desc: 'Contributed to the AI pipeline of Smart Beauty, an AI-powered skincare application that uses computer vision and machine learning to analyze skin conditions and deliver personalized product recommendations.',
    logo: '/assets/logos/bluesense.png', bg: '#fff',
  },
]

const community = [
  {
    company: 'CyberTEDU',
    badge: 'Organizer',
    role: 'Cybersecurity Club — Organizer',
    desc: "Organized events and workshops at TED University's cybersecurity club, ensuring member activity and contributing to the technical growth of the community.",
    logo: '/assets/logos/cybertedu.png', bg: '#000',
  },
  {
    company: 'Huawei Student Developers TEDU',
    badge: 'Campus Ambassador',
    role: 'Huawei Student Developer Club — Campus Ambassador',
    desc: 'As General Coordinator of the Huawei Student Developer Club at TED University, I organized various events and actively contributed to the Huawei ecosystem, helping grow the student developer community.',
    logo: '/assets/logos/hsd.png', bg: '#fff',
  },
  {
    company: 'GDG on Campus TEDU',
    badge: 'Business & Marketing',
    role: 'Google Developer Groups on Campus — Business Management & Marketing',
    desc: 'Responsible for organizing events for the club and securing sponsorships, establishing partnerships to support the developer community at TED University.',
    logo: '/assets/logos/gdg.png', bg: '#fff',
  },
]

function Card({ company, badge, role, desc, logo, bg, type }) {
  return (
    <article className="gcard flex gap-5 p-7 cursor-default group">
      <div className="w-[52px] h-[52px] rounded-[13px] flex-shrink-0 overflow-hidden
        flex items-center justify-center p-[6px]
        shadow-[0_2px_16px_rgba(0,0,0,.5)]
        transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[-3deg]"
        style={{ background: bg }}>
        <img src={logo} alt={company} className="w-full h-full object-contain block"/>
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
          <h4 className="text-[1rem] font-bold text-white">{company}</h4>
          <span className={`text-[.65rem] font-bold px-[.65rem] py-[.22rem] rounded-full
            whitespace-nowrap flex-shrink-0
            ${type === 'work'
              ? 'bg-[rgba(124,58,237,.15)] text-[#a78bfa] border border-[rgba(124,58,237,.25)]'
              : 'bg-[rgba(79,70,229,.15)] text-[#818cf8] border border-[rgba(79,70,229,.25)]'
            }`}>
            {badge}
          </span>
        </div>
        <p className="text-[.82rem] text-[#a78bfa] font-medium mb-3">{role}</p>
        <p className="text-[.875rem] text-white/45 leading-[1.65] mb-4">{desc}</p>
        <span className={`text-[.67rem] font-bold tracking-[.08em] uppercase
          px-[.65rem] py-[.22rem] rounded-full
          ${type === 'work'
            ? 'text-[#a78bfa] bg-[rgba(124,58,237,.12)] border border-[rgba(124,58,237,.2)]'
            : 'text-[#818cf8] bg-[rgba(79,70,229,.12)] border border-[rgba(79,70,229,.2)]'
          }`}>
          {type === 'work' ? 'Work' : 'Community'}
        </span>
      </div>
    </article>
  )
}

export default function Experience() {
  const sec     = useRef(null)
  const workRef = useRef(null)
  const commRef = useRef(null)

  useGSAP(() => {
    gsap.from(sec.current.querySelector('.sec-hdr'), {
      y: 50, opacity: 0, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: sec.current, start: 'top 78%' },
    })
    gsap.from(workRef.current.querySelectorAll('article'), {
      y: 70, opacity: 0, duration: .75, stagger: .13, ease: 'power3.out',
      scrollTrigger: { trigger: workRef.current, start: 'top 80%' },
    })
    gsap.from(commRef.current.querySelectorAll('article'), {
      y: 70, opacity: 0, duration: .75, stagger: .13, ease: 'power3.out',
      scrollTrigger: { trigger: commRef.current, start: 'top 80%' },
    })
  }, [])

  return (
    <section id="experience" ref={sec}
      className="relative z-10 py-32 px-6 md:px-12 max-w-[1200px] mx-auto">

      <div className="sec-hdr text-center mb-20">
        <div className="s-tag mx-auto w-fit">
          <span className="w-[5px] h-[5px] rounded-full bg-[#a78bfa] animate-pulse inline-block"/>
          Experience
        </div>
        <h2 className="font-black text-white leading-tight"
          style={{ fontSize: 'clamp(2.2rem,4.5vw,3.5rem)', letterSpacing: '-.03em' }}>
          Work &amp; Community
        </h2>
        <p className="mt-4 text-white/40 text-[1.05rem] max-w-[480px] mx-auto leading-relaxed">
          My internship experience and student communities I have been part of.
        </p>
      </div>

      <div className="mb-16" ref={workRef}>
        <p className="gbar relative z-10">Work Experience</p>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
          {work.map(item => <Card key={item.company} {...item} type="work"/>)}
        </div>
      </div>

      <div ref={commRef} className="mt-8">
        <p className="gbar relative z-10">Communities &amp; Clubs</p>
        <div className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
          {community.map(item => <Card key={item.company} {...item} type="community"/>)}
        </div>
      </div>
    </section>
  )
}
