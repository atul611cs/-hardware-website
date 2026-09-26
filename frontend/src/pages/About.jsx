import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const timelineMilestones = [
  {
    year: '1980',
    title: 'Founder & Foundry Roots',
    tag: 'Building the Metallurgical Foundation',
    desc: 'Recognizing the surge in industrial growth, Shri Suresh Chandra Garg established a dedicated heavy Cast Iron (C.I.) foundry. Operating high-temperature furnaces, revolving flywheels, slag pots, and radial drills, He built an unshakeable foundation in material science, heavy machinery casting, and shop-floor discipline.',
    stats: 'Furnaces • Heavy C.I. Foundry • Metallurgical Mastery',
  },
  {
    year: '1985',
    title: 'Regional Reputation & Multi-State Scale',
    tag: 'Industrial Growth & Expansion',
    desc: 'By delivering dense, load-bearing C.I. machinery castings built for extreme industrial stress, Suresh Chandra Ji expanded supply networks beyond the local industrial belt, shipping heavy components across state lines and cementing a trusted 25-year reputation in heavy manufacturing.',
    stats: 'Multi-State Logistics • High-Stress Machinery Castings',
  },
  {
    year: 'Post-2005',
    title: 'Partnership & Hardware Division',
    tag: 'Introducing the Manufacturing of Door Hardware',
    desc: 'Mr. Gaurav Garg (S/O Suresh Chandra Garg) joined as an official partner, uniting with hands-on casting expertise with a vision for modern hardware. To bridge foundry operations with high-volume production, Mr. Gaurav introduced the factory’s expanding Manufacturing into iron door fittings (aldrops, hooks, hasps) and commercial transport handles.',
    stats: 'Architectural Door Hardware • Transport Fittings',
  },
  {
    year: '2015',
    title: 'Architectural Ironmongery & Machinery Fleet',
    tag: 'Factory Scale & In-House Tool & Die Division',
    desc: 'With Mr. Gaurav Garg taking the operational helm, the firm made a dedicated push into comprehensive architectural ironmongery. The factory floor was heavily expanded with high-tonnage power presses, precision drilling machinery for countersunk fittings, spot-welding bays, and an extensive in-house Tool & Die division managed by master toolmakers.',
    stats: 'Power Press Lines • Precision Countersinking • Custom Tool & Die',
  },
  {
    year: 'Present',
    title: 'In-House Plating Plants & Two-Generation Synergy',
    tag: 'Complete Finish Control & Quality Assurance',
    desc: "Under Mr. Gaurav's active management and supported by Shri Suresh Chandra Ji's foundational wisdom, Balaji Founders & Engineers built its own multi-line finishing plants in their own Factory. Operating 100% in-house Powder Coating, Zinc, Chrome, and Electro-Brass plating lines, our production team delivers total finish control, zero-defect quality, and custom OEM capabilities to our clients.",
    stats: '100% In-House Plating • Multi-Line Finishing • Turnkey OEM',
  },
]

const finishTreatments = [
  {
    title: 'Electro-Brass Plating',
    desc: 'High-lustre electro-brass coating engineered for premium architectural hardware finishes.',
    spec: 'High-Lustre Finish',
    icon: (
      <svg className='w-6 h-6 text-[#C89E47]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' />
      </svg>
    ),
  },
  {
    title: 'Zinc Plating',
    desc: 'Electrogalvanized zinc protective coating for corrosion resistance on outdoor ironware and utility fittings.',
    spec: 'Corrosion Shield',
    icon: (
      <svg className='w-6 h-6 text-[#C89E47]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
      </svg>
    ),
  },
  {
    title: 'Chrome Plating',
    desc: 'High-mirror chrome plating for durable, wear-resistant decorative and commercial hardware finishes.',
    spec: 'Mirror Polish',
    icon: (
      <svg className='w-6 h-6 text-[#C89E47]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
      </svg>
    ),
  },
  {
    title: 'Powder Coating',
    desc: 'Thermoset protective powder coating engineered for weather-resistant heavy hardware.',
    spec: 'Weather-Resistant',
    icon: (
      <svg className='w-6 h-6 text-[#C89E47]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' />
      </svg>
    ),
  },
  {
    title: 'Custom OEM Tooling',
    desc: 'Full in-house Tool & Die shop developing custom stamping dies from CAD designs and physical samples.',
    spec: 'Proprietary Die Shop',
    icon: (
      <svg className='w-6 h-6 text-[#C89E47]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.75} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
      </svg>
    ),
  },
]

const whyWorkWithUs = [
  {
    title: 'NSS Tested Finishes',
    desc: 'Tested to Neutral Salt Spray standards for long-term corrosion resistance in harsh maritime climates.',
  },
  {
    title: 'Strict SOP Quality Control',
    desc: 'Multi-stage inspection checkpoints covering stamping tolerances, pin movement, weld strength, and surface luster.',
  },
  {
    title: 'Secure Intellectual Property',
    desc: 'All custom OEM dies remain strictly protected inside our own factory shop.',
  },
]

const oemSteps = [
  {
    step: '01',
    title: 'Input',
    desc: 'Share your CAD drawings, blueprints, or physical golden samples.',
  },
  {
    step: '02',
    title: 'Tooling',
    desc: 'In-house die development tailored to your exact specifications.',
  },
  {
    step: '03',
    title: 'Approval',
    desc: 'Pre-production sample sign-off before full production runs.',
  },
  {
    step: '04',
    title: 'Production',
    desc: 'High-volume manufacturing backed by multi-stage SOP inspection.',
  },
]

const About = () => {
  return (
    <div className='bg-[#0A0A0A] text-[#F5F0E6] min-h-screen selection:bg-[#C89E47]/30 selection:text-white'>

      {/* 1. Hero Section */}
      <section className='relative overflow-hidden pt-14 pb-14 md:pt-20 md:pb-20 px-4 sm:px-6 lg:px-8 border-b border-white/5'>
        {/* Spotlight Cinematic Ambient Backlights */}
        <div className='pointer-events-none absolute -top-40 right-10 md:right-1/4 w-[36rem] h-[36rem] bg-[radial-gradient(ellipse_at_center,rgba(200,158,71,0.18)_0%,rgba(200,158,71,0.04)_45%,transparent_70%)] blur-2xl -z-10' />
        <div className='pointer-events-none absolute top-1/2 left-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(200,158,71,0.08)_0%,transparent_60%)] blur-3xl -z-10' />

        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'>
            <div className='lg:col-span-8 flex flex-col items-start text-left'>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141311]/80 border border-[#C89E47]/40 mb-3.5'
              >
                <span className='w-2 h-2 rounded-full bg-[#C89E47] animate-pulse' />
                <span className='text-[11px] font-semibold uppercase tracking-[0.24em] text-[#C89E47]'>
                  Balaji Founders & Engineers • Estd 1980
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className='font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-[#F5F0E6] leading-[1.08] mb-3'
              >
                45 Years of Hardware Manufacturing.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className='text-sm sm:text-base md:text-lg font-semibold uppercase tracking-[0.2em] text-[#C89E47] mb-3.5 flex flex-wrap items-center gap-x-2.5 gap-y-1'
              >
                <span>Built to Last</span>
                <span className='text-white/30'>•</span>
                <span>Precision Engineered</span>
                <span className='text-white/30'>•</span>
                <span>Industrial Quality</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className='text-[#A39A8A] text-base sm:text-lg md:text-xl leading-relaxed font-normal max-w-2xl mb-6'
              >
                Built on two generations of manufacturing expertise—uniting heavy foundry roots with modern, high-precision architectural ironmongery and complete finish control under one roof.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className='flex flex-wrap items-center gap-3.5'
              >
                <Link
                  to='/contact'
                  className='btn-primary px-7 py-3 text-xs font-semibold uppercase tracking-widest text-[#0A0A0A] bg-[#C89E47] hover:bg-[#d6aa52] rounded-full shadow-[0_0_25px_rgba(200,158,71,0.4)] transition-all duration-300 hover:scale-105'
                >
                  Partner With Us
                </Link>
                <Link
                  to='/products'
                  className='btn-ghost px-7 py-3 text-xs font-semibold uppercase tracking-widest text-[#F5F0E6] border border-[#C89E47]/40 hover:border-[#C89E47] rounded-full bg-[#141311]/60 hover:bg-[#141311] transition-all duration-300'
                >
                  Explore Hardware
                </Link>
              </motion.div>
            </div>

            {/* Hero Emblem Card */}
            <div className='lg:col-span-4 flex items-center justify-center lg:justify-end'>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className='w-full max-w-sm relative p-7 sm:p-8 rounded-3xl bg-[#141311]/70 backdrop-blur-xl border border-[#C89E47]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-center overflow-hidden'
              >
                <div className='absolute -right-16 -top-16 w-44 h-44 bg-[radial-gradient(circle,rgba(200,158,71,0.3)_0%,transparent_70%)] pointer-events-none' />

                <div className='w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-5 flex items-center justify-center p-3 rounded-2xl bg-gradient-to-b from-[#C89E47]/20 via-[#0A0A0A] to-[#0A0A0A] border border-[#C89E47]/40 shadow-[0_0_30px_rgba(200,158,71,0.25)]'>
                  <img
                    src={logo}
                    alt='Balaji Hardware Heritage'
                    className='w-full h-full object-contain drop-shadow-[0_0_15px_rgba(200,158,71,0.4)]'
                  />
                </div>

                <div className='text-2xl sm:text-3xl font-bold font-display text-[#F5F0E6] tracking-tight'>
                  1980 – Present
                </div>
                <div className='text-xs uppercase tracking-[0.25em] text-[#C89E47] font-semibold mt-1 mb-5'>
                  45 Years of Heritage
                </div>

                <div className='pt-5 border-t border-white/10 grid grid-cols-2 gap-4 text-left'>
                  <div>
                    <div className='text-[10px] uppercase tracking-wider text-[#A39A8A] font-semibold'>Generations</div>
                    <div className='text-sm sm:text-base font-bold text-[#F5F0E6] font-display mt-0.5'>Two Generations</div>
                  </div>
                  <div>
                    <div className='text-[10px] uppercase tracking-wider text-[#A39A8A] font-semibold'>Finishing</div>
                    <div className='text-sm sm:text-base font-bold text-[#C89E47] font-display mt-0.5'>100% In-House</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. A 45-Year Industrial Heritage (Vertical Timeline) */}
      <section className='py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative'>
        <div className='max-w-7xl mx-auto'>

          <div className='max-w-3xl mb-16 md:mb-24'>
            <span className='text-xs font-semibold tracking-[0.28em] uppercase text-[#C89E47] mb-3 block'>
              Our Metallurgical Legacy
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F0E6] tracking-tight'>
              A 45-Year Industrial Heritage
            </h2>
            <p className='text-[#A39A8A] text-base sm:text-lg mt-4 font-normal leading-relaxed'>
              From high-temperature Cast Iron foundry roots to state-of-the-art architectural ironmongery and precision plating lines.
            </p>
          </div>

          {/* Sleek Vertical Timeline */}
          <div className='relative pl-6 sm:pl-10 md:pl-12 border-l-2 border-[#C89E47]/30 space-y-12 md:space-y-16 ml-3 sm:ml-4'>
            {timelineMilestones.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className='relative group'
              >
                {/* Glowing Brass Dot on Line */}
                <div className='absolute -left-[31px] sm:-left-[47px] md:-left-[55px] top-6 w-5 h-5 rounded-full bg-[#0A0A0A] border-2 border-[#C89E47] shadow-[0_0_12px_rgba(200,158,71,0.8)] flex items-center justify-center group-hover:scale-125 transition-transform duration-300'>
                  <div className='w-1.5 h-1.5 rounded-full bg-[#C89E47]' />
                </div>

                {/* Timeline Card */}
                <div className='p-6 sm:p-8 rounded-2xl bg-[#141311]/60 backdrop-blur-md border border-[#C89E47]/30 hover:border-[#C89E47] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_30px_rgba(200,158,71,0.15)]'>
                  <div className='flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3'>
                    <div className='flex items-center gap-3'>
                      <span className='font-display text-2xl sm:text-3xl font-bold text-[#C89E47] tracking-tight'>
                        {item.year}
                      </span>
                      <span className='hidden sm:inline text-white/20'>—</span>
                      <h3 className='font-display text-xl sm:text-2xl font-bold text-[#F5F0E6]'>
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className='inline-block mb-4 px-3 py-1 rounded-md bg-[#C89E47]/10 border border-[#C89E47]/25 text-xs font-semibold uppercase tracking-wider text-[#C89E47]'>
                    {item.tag}
                  </div>

                  <p className='text-[#A39A8A] text-sm sm:text-base leading-relaxed mb-6 font-normal'>
                    {item.desc}
                  </p>

                  <div className='pt-4 border-t border-white/5 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#C89E47]/90'>
                    <span className='w-1.5 h-1.5 rounded-full bg-[#C89E47]' />
                    <span>{item.stats}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Complete Finish Control Under One Roof (Grid Section) */}
      <section className='py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-[#0e0d0b]/40 relative'>
        <div className='pointer-events-none absolute top-1/3 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(200,158,71,0.06)_0%,transparent_70%)] blur-2xl -z-10' />

        <div className='max-w-7xl mx-auto'>
          <div className='max-w-3xl mb-16'>
            <span className='text-xs font-semibold tracking-[0.28em] uppercase text-[#C89E47] mb-3 block'>
              Integrated Surface Engineering
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F0E6] tracking-tight'>
              Complete Finish Control Under One Roof
            </h2>
            <p className='text-[#A39A8A] text-base sm:text-lg mt-4 font-normal leading-relaxed'>
              Operating multi-line in-house finishing plants to eliminate third-party bottlenecks, safeguard intellectual property, and deliver unmatched surface consistency.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            {finishTreatments.map((finish, idx) => (
              <motion.div
                key={finish.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className='p-7 sm:p-8 rounded-2xl bg-[#141311]/60 backdrop-blur-md border border-[#C89E47]/30 hover:border-[#C89E47] hover:shadow-[0_0_30px_rgba(200,158,71,0.18)] transition-all duration-300 flex flex-col justify-between group'
              >
                <div>
                  <div className='w-14 h-14 rounded-2xl bg-gradient-to-br from-[#C89E47]/25 via-[#0A0A0A] to-[#0A0A0A] border border-[#C89E47]/40 flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(200,158,71,0.2)] group-hover:scale-105 transition-transform duration-300'>
                    {finish.icon}
                  </div>

                  <h3 className='font-display text-xl font-bold text-[#F5F0E6] mb-3 group-hover:text-[#C89E47] transition-colors duration-300'>
                    {finish.title}
                  </h3>

                  <p className='text-[#A39A8A] text-sm leading-relaxed font-normal mb-6'>
                    {finish.desc}
                  </p>
                </div>

                <div className='pt-4 border-t border-white/5 flex items-center justify-between'>
                  <span className='text-[11px] font-semibold uppercase tracking-wider text-[#C89E47]'>
                    {finish.spec}
                  </span>
                  <span className='text-xs text-[#A39A8A] font-mono'>100% In-House</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Work With Us & OEM Process (Two-Column Layout) */}
      <section className='py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative'>
        <div className='max-w-7xl mx-auto'>

          <div className='max-w-3xl mb-16'>
            <span className='text-xs font-semibold tracking-[0.28em] uppercase text-[#C89E47] mb-3 block'>
              Precision Specifications & Protocols
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F0E6] tracking-tight'>
              Why Work With Us & OEM Process
            </h2>
            <p className='text-[#A39A8A] text-base sm:text-lg mt-4 font-normal leading-relaxed'>
              Designed for institutional buyers, hardware brands, and high-volume contractors requiring strict tolerances and dependable delivery.
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>

            {/* Left Column: Why Work With Us */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className='p-8 sm:p-10 rounded-3xl bg-[#141311]/60 backdrop-blur-md border border-[#C89E47]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between'
            >
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89E47]/10 border border-[#C89E47]/30 text-xs font-semibold uppercase tracking-widest text-[#C89E47] mb-6'>
                  Industrial Standards
                </div>
                <h3 className='font-display text-2xl sm:text-3xl font-bold text-[#F5F0E6] mb-8'>
                  Why Work With Us
                </h3>

                <div className='space-y-6'>
                  {whyWorkWithUs.map((item) => (
                    <div key={item.title} className='flex items-start gap-4 group'>
                      <div className='w-8 h-8 rounded-full bg-[#C89E47]/15 border border-[#C89E47]/50 flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 group-hover:bg-[#C89E47]/25 transition-all duration-300'>
                        <svg className='w-4 h-4 text-[#C89E47]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2.5} d='M5 13l4 4L19 7' />
                        </svg>
                      </div>
                      <div>
                        <h4 className='font-display text-lg font-bold text-[#F5F0E6] mb-1.5'>
                          {item.title}
                        </h4>
                        <p className='text-[#A39A8A] text-sm leading-relaxed font-normal'>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#A39A8A]'>
                <span>Zero Compromise Manufacturing</span>
                <span className='text-[#C89E47] font-semibold uppercase tracking-wider'>ISO-Grade Protocols</span>
              </div>
            </motion.div>

            {/* Right Column: Our OEM Process Workflow */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className='p-8 sm:p-10 rounded-3xl bg-[#141311]/60 backdrop-blur-md border border-[#C89E47]/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between'
            >
              <div>
                <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C89E47]/10 border border-[#C89E47]/30 text-xs font-semibold uppercase tracking-widest text-[#C89E47] mb-6'>
                  Turnkey Execution
                </div>
                <h3 className='font-display text-2xl sm:text-3xl font-bold text-[#F5F0E6] mb-8'>
                  Our OEM Process Workflow
                </h3>

                <div className='space-y-6'>
                  {oemSteps.map((step) => (
                    <div key={step.step} className='flex items-start gap-5 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C89E47]/40 transition-colors duration-300'>
                      <div className='font-display text-2xl font-bold text-[#C89E47] tracking-tight shrink-0 w-10'>
                        {step.step}
                      </div>
                      <div>
                        <h4 className='font-display text-base font-bold text-[#F5F0E6] mb-1 uppercase tracking-wide'>
                          {step.title}
                        </h4>
                        <p className='text-[#A39A8A] text-sm leading-relaxed font-normal'>
                          {step.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className='mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-[#A39A8A]'>
                <span>In-House Master Toolmakers</span>
                <span className='text-[#C89E47] font-semibold uppercase tracking-wider'>CAD to Golden Sample</span>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 5. Bottom Partnership CTA */}
      <section className='py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#0A0A0A] via-[#141311]/80 to-[#0A0A0A]'>
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,158,71,0.12)_0%,transparent_65%)]' />

        <div className='max-w-5xl mx-auto text-center relative z-10'>
          <span className='text-xs font-semibold uppercase tracking-[0.28em] text-[#C89E47] mb-4 block'>
            Factory-Direct Engagement
          </span>
          <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[#F5F0E6] tracking-tight mb-6'>
            Initiate Your Hardware Specification
          </h2>
          <p className='text-[#A39A8A] text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal'>
            Whether you require high-tonnage architectural hardware, customized OEM tooling, or batch sample approvals, our two-generation engineering team is ready to deliver.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-4'>
            <Link
              to='/contact'
              className='btn-primary px-9 py-4 text-xs font-semibold uppercase tracking-widest text-[#0A0A0A] bg-[#C89E47] hover:bg-[#d6aa52] rounded-full shadow-[0_0_30px_rgba(200,158,71,0.4)] transition-all duration-300 hover:scale-105'
            >
              Request Technical Quotation
            </Link>
            <Link
              to='/products'
              className='btn-ghost px-9 py-4 text-xs font-semibold uppercase tracking-widest text-[#F5F0E6] border border-[#C89E47]/40 hover:border-[#C89E47] rounded-full bg-[#141311]/60 hover:bg-[#141311] transition-all duration-300'
            >
              View Products Catalog
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default About
