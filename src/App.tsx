import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Hls from 'hls.js'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
})

const Navbar = () => (
  <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 md:px-28 py-4 bg-transparent">
    <div className="flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className="w-7 h-7 rounded-full border-2 border-foreground/60"></div>
        <div className="w-3 h-3 absolute rounded-full border border-foreground/60"></div>
      </div>
      <span className="font-bold text-xl tracking-tight">Medulla</span>
    </div>
    <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
      <a href="#" className="hover:text-foreground transition-colors">Home</a>
      <span>•</span>
      <a href="#" className="hover:text-foreground transition-colors">How It Works</a>
      <span>•</span>
      <a href="#" className="hover:text-foreground transition-colors">Philosophy</a>
      <span>•</span>
      <a href="#" className="hover:text-foreground transition-colors">Courses</a>
    </div>
    <div className="flex items-center gap-3">
      <a href="#" className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center hover:scale-105 transition-transform text-muted-foreground hover:text-foreground">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
      </a>
      <a href="#" className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center hover:scale-105 transition-transform text-muted-foreground hover:text-foreground">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
      </a>
      <a href="#" className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center hover:scale-105 transition-transform text-muted-foreground hover:text-foreground">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
      </a>
    </div>
  </nav>
)

const Hero = () => (
  <section className="relative h-screen flex flex-col items-center justify-center pt-28 md:pt-32 overflow-hidden">
    <video 
      autoPlay 
      loop 
      muted 
      playsInline
      className="absolute inset-0 w-full h-full object-cover opacity-60 z-0"
    >
      <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4" type="video/mp4" />
    </video>
    
    <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-background to-transparent z-10"></div>
    
    <div className="relative z-20 flex flex-col items-center text-center px-4 w-full">
      <motion.div {...fadeUp(0.1)} className="flex items-center gap-3 mb-6">
        <div className="flex -space-x-2">
          <img src="/avatar-1.png" alt="User" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
          <img src="/avatar-2.png" alt="User" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
          <img src="/avatar-3.png" alt="User" className="w-8 h-8 rounded-full border-2 border-background object-cover" />
        </div>
        <span className="text-muted-foreground text-sm">7,000+ learners already joined</span>
      </motion.div>

      <motion.h1 {...fadeUp(0.2)} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-2px] mb-6">
        Get <span className="font-serif italic font-normal">Inspired</span> with Us
      </motion.h1>

      <motion.p {...fadeUp(0.3)} className="text-lg max-w-2xl text-[hsl(var(--hero-subtitle))] mb-12">
        Join our platform for meaningful digital courses, masterclasses around technology and a shared journey toward depth and direction.
      </motion.p>

      <motion.div {...fadeUp(0.4)} className="liquid-glass rounded-full p-2 w-full max-w-lg flex items-center justify-between">
        <div className="flex gap-4">
          <a href="/login" className="px-6 py-3 text-sm font-medium hover:text-white/80 transition-colors">Log In</a>
        </div>
        <motion.a 
          href="/signup"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-foreground text-background rounded-full px-8 py-3 text-sm font-medium whitespace-nowrap"
        >
          Sign Up
        </motion.a>
      </motion.div>
    </div>
  </section>
)

const SearchChanged = () => (
  <section className="pt-52 md:pt-64 pb-6 md:pb-9 px-8 md:px-28">
    <div className="text-center max-w-4xl mx-auto mb-24">
      <motion.h2 {...fadeUp(0.1)} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-[-1px] mb-6">
        Learning has <span className="font-serif italic font-normal">changed.</span> Have you?
      </motion.h2>
      <motion.p {...fadeUp(0.2)} className="text-muted-foreground text-lg">
        The old ways of scattered tutorials are fading. The new era demands structured, AI-assisted mastery.
      </motion.p>
    </div>

    <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-20">
      {[
        { name: "ChatGPT", desc: "For quick answers, not deep mastery.", icon: "/icon-chatgpt.png" },
        { name: "Perplexity", desc: "For fast research, not guided learning.", icon: "/icon-perplexity.png" },
        { name: "Google", desc: "For endless searching, not structured paths.", icon: "/icon-google.png" },
      ].map((platform, i) => (
        <motion.div key={platform.name} {...fadeUp(0.2 + i * 0.1)} className="flex flex-col items-center text-center">
          <div className="w-[200px] h-[200px] mb-6 liquid-glass rounded-3xl flex items-center justify-center p-8">
            <img src={platform.icon} alt={platform.name} className="w-full h-full object-contain" />
          </div>
          <h3 className="font-semibold text-base mb-2">{platform.name}</h3>
          <p className="text-muted-foreground text-sm">{platform.desc}</p>
        </motion.div>
      ))}
    </div>

    <motion.p {...fadeUp(0.5)} className="text-muted-foreground text-sm text-center">
      If you don't master the skills, someone else will.
    </motion.p>
  </section>
)

const Mission = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  const text1 = "We're building a space where curiosity meets clarity — where learners find depth, creators find reach, and every course becomes a transformation worth having."
  const words1 = text1.split(" ")
  
  const text2 = "A platform where content, community, and insight flow together — with less noise, less friction, and more meaning for everyone involved."
  const words2 = text2.split(" ")

  return (
    <section ref={containerRef} className="pt-0 pb-32 md:pb-44 px-8 md:px-28 relative">
      <div className="flex justify-center mb-24">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full max-w-[800px] aspect-square object-cover rounded-3xl opacity-80"
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="max-w-5xl mx-auto space-y-10">
        <p className="text-2xl md:text-4xl lg:text-5xl font-medium tracking-[-1px] flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2">
          {words1.map((word, i) => {
            const isHighlight = ["curiosity", "meets", "clarity", "transformation"].some(w => word.includes(w))
            return (
              <motion.span 
                key={i}
                className={isHighlight ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]"}
                initial={{ opacity: 0.15 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false, margin: "-100px" }}
                transition={{ duration: 0.4, delay: i * 0.02 }}
              >
                {word}
              </motion.span>
            )
          })}
        </p>

        <p className="text-xl md:text-2xl lg:text-3xl font-medium flex flex-wrap gap-x-2 md:gap-x-3 gap-y-2">
          {words2.map((word, i) => (
            <motion.span 
              key={i}
              className="text-[hsl(var(--hero-subtitle))]"
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.02 }}
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  )
}

const Solution = () => (
  <section className="py-32 md:py-44 px-8 md:px-28 border-t border-border/30">
    <div className="mb-16">
      <motion.p {...fadeUp(0.1)} className="text-xs tracking-[3px] uppercase text-muted-foreground mb-4">
        SOLUTION
      </motion.p>
      <motion.h2 {...fadeUp(0.2)} className="text-4xl md:text-6xl font-medium tracking-[-1px]">
        The platform for <span className="font-serif italic font-normal">meaningful</span> learning
      </motion.h2>
    </div>

    <motion.div {...fadeUp(0.3)} className="mb-20">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        className="w-full aspect-[3/1] object-cover rounded-2xl opacity-90"
      >
        <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4" type="video/mp4" />
      </video>
    </motion.div>

    <div className="grid md:grid-cols-4 gap-8">
      {[
        { title: "Curated Courses", desc: "Expert-led digital courses designed to cut through the noise." },
        { title: "Creator Tools", desc: "Powerful tools for instructors to build, host, and sell courses." },
        { title: "Community", desc: "Engage with peers and mentors in dedicated learning spaces." },
        { title: "Distribution", desc: "Reach the right audience with built-in marketing channels." },
      ].map((feature, i) => (
        <motion.div key={feature.title} {...fadeUp(0.4 + i * 0.1)}>
          <h3 className="font-semibold text-base mb-2">{feature.title}</h3>
          <p className="text-muted-foreground text-sm">{feature.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
)

const CTA = () => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const src = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }
  }, [])

  return (
    <section className="relative py-32 md:py-44 border-t border-border/30 overflow-hidden">
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      />
      <div className="absolute inset-0 bg-background/45 z-[1]"></div>
      
      <div className="relative z-10 flex flex-col items-center text-center px-4">
        <motion.div {...fadeUp(0.1)} className="relative flex items-center justify-center mb-8">
          <div className="w-10 h-10 rounded-full border-2 border-foreground/60"></div>
          <div className="w-5 h-5 absolute rounded-full border border-foreground/60"></div>
        </motion.div>
        
        <motion.h2 {...fadeUp(0.2)} className="text-4xl md:text-6xl font-serif italic mb-4">
          Start Your Journey
        </motion.h2>
        
        <motion.p {...fadeUp(0.3)} className="text-muted-foreground text-lg mb-10 max-w-md">
          Join Medulla today and step into a new era of digital learning.
        </motion.p>
        
        <motion.div {...fadeUp(0.4)} className="flex flex-col sm:flex-row items-center gap-4">
          <motion.a 
            href="/signup"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-foreground text-background rounded-lg px-8 py-3.5 font-medium min-w-[160px]"
          >
            Sign Up Now
          </motion.a>
          <motion.a 
            href="/teach"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="liquid-glass rounded-lg px-8 py-3.5 font-medium min-w-[160px]"
          >
            Start Teaching
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

const Footer = () => (
  <footer className="py-12 px-8 md:px-28 border-t border-border/20 flex flex-col md:flex-row items-center justify-between gap-4">
    <p className="text-muted-foreground text-sm">© 2026 Medulla. All rights reserved.</p>
    <div className="flex items-center gap-6 text-sm text-muted-foreground">
      <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
      <a href="#" className="hover:text-foreground transition-colors">Terms</a>
      <a href="#" className="hover:text-foreground transition-colors">Contact</a>
    </div>
  </footer>
)

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <SearchChanged />
      <Mission />
      <Solution />
      <CTA />
      <Footer />
    </div>
  )
}
