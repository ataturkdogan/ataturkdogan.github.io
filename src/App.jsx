import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar     from './components/Navbar'
import Hero       from './components/Hero'
import Experience from './components/Experience'
import Blog       from './components/Blog'
import Contact    from './components/Contact'
import Footer     from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  return (
    <div style={{ background: '#04040c', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,.3), rgba(6,182,212,.3), transparent)', maxWidth: 960, margin: '0 auto' }}/>
        <Experience />
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(79,70,229,.3), transparent)', maxWidth: 960, margin: '0 auto' }}/>
        <Blog />
        <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(124,58,237,.3), transparent)', maxWidth: 960, margin: '0 auto' }}/>
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
