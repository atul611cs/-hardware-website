import logo from '../assets/logo.png'

const milestones = [
  { year: '1980', title: 'Founded', desc: 'Established Balaji Hardware with a commitment to architectural craftsmanship.' },
  { year: '2000', title: 'Manufacturing begins', desc: 'Opened our first manufacturing unit with 5,000 sq. ft. of space.' },
  { year: '2008', title: 'Export milestone', desc: 'First international shipment to the UK and Middle East markets.' },
  { year: '2015', title: 'Factory expansion', desc: 'Expanded to 60,000 sq. ft. with 8 finishing and treatment plants.' },
  { year: '2020', title: '700+ products', desc: 'Crossed 700 products across aluminium, iron and architectural hardware.' },
  { year: '2024', title: 'Global reach', desc: 'Now exporting to 30+ countries across 5 continents.' },
]

const team = [
  { name: 'Rajesh Kumar', role: 'Founder and Managing Director' },
  { name: 'Priya Sharma', role: 'Head of Operations' },
  { name: 'Amit Patel', role: 'Export Manager' },
]

const manufacturing = [
  { title: 'Die Casting', desc: 'High pressure die casting for aluminium components ensuring precise dimensions.' },
  { title: 'Finishing Plants', desc: '8 finishing and treatment plants for chrome, brass, powder coat and more.' },
  { title: 'Quality Control', desc: 'Every batch tested for strength, finish consistency and dimensional accuracy.' },
  { title: 'Packaging', desc: 'Export-grade packaging to ensure products arrive without damage.' },
]

const About = () => {
  return (
    <div className='bg-[#121212] text-[#F3F4F6] min-h-screen'>
      {/* Hero Section */}
      <section className='relative overflow-hidden mesh-studio noise-overlay py-24 md:py-32 px-4 sm:px-6 border-b border-white/5'>
        <div className='ambient-glow pointer-events-none absolute right-0 top-0 h-[28rem] w-[28rem] opacity-60' />
        <div className='relative max-w-7xl mx-auto'>
          <div className='max-w-3xl'>
            <span className='text-[11px] font-semibold uppercase tracking-[0.28em] text-[#d97706] mb-5 block'>About Us</span>
            <h1 className='font-display text-4xl md:text-6xl font-semibold mb-8 tracking-tight leading-[1.05] text-[#F3F4F6]'>
              Three Decades of Hardware Excellence
            </h1>
            <p className='text-[#9CA3AF] text-lg md:text-xl leading-relaxed font-light'>
              From a small trading company to one of India's leading hardware manufacturers and exporters — our journey has been built on quality, consistency and customer trust.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className='px-4 sm:px-6 py-16 md:py-20 border-b border-white/5'>
        <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4'>
          <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl text-center hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.15)] transition-all duration-300'>
            <div className='font-display text-3xl md:text-4xl font-semibold text-[#F3F4F6] mb-1'>700+</div>
            <div className='text-sm text-[#9CA3AF]'>Products</div>
          </div>
          <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl text-center hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.15)] transition-all duration-300'>
            <div className='font-display text-3xl md:text-4xl font-semibold text-[#d97706] mb-1'>30+</div>
            <div className='text-sm text-[#9CA3AF]'>Countries Served</div>
          </div>
          <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl text-center hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.15)] transition-all duration-300'>
            <div className='font-display text-3xl md:text-4xl font-semibold text-[#F3F4F6] mb-1'>60,000</div>
            <div className='text-sm text-[#9CA3AF]'>Sq. Ft. Factory</div>
          </div>
          <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl text-center hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.15)] transition-all duration-300'>
            <div className='font-display text-3xl md:text-4xl font-semibold text-[#d97706] mb-1'>8</div>
            <div className='text-sm text-[#9CA3AF]'>Finishing Plants</div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className='px-4 sm:px-6 py-20 md:py-28 border-b border-white/5'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start'>
            <div className='lg:col-span-5'>
              <h2 className='font-display text-3xl md:text-5xl font-semibold text-[#F3F4F6] mb-8 tracking-tight'>Our Mission</h2>
              <blockquote className='font-display text-2xl md:text-3xl font-medium text-[#F3F4F6] leading-snug mb-8 border-l-2 border-[#d97706] pl-6'>
                To manufacture and export world-class hardware products that combine functionality, durability and aesthetic appeal — at competitive prices that make quality accessible globally.
              </blockquote>
              <p className='text-[#9CA3AF] leading-relaxed lg:ml-8'>
                We believe in long-term partnerships with our customers, built on transparency, consistent quality and reliable delivery timelines.
              </p>
            </div>
            <div className='lg:col-span-7'>
              <div className='relative overflow-hidden rounded-[2rem] min-h-[220px] md:min-h-[280px] bg-white/5 backdrop-blur-md border border-[#d97706]/30 mb-5 flex items-center justify-center p-8 shadow-[0_0_30px_rgba(217,119,6,0.15)]'>
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.35)_0%,rgba(217,119,6,0.05)_40%,transparent_70%)]' />
                <div className='relative z-10 text-center flex flex-col items-center'>
                  <div className='w-32 h-32 sm:w-40 sm:h-40 mb-3 flex items-center justify-center'>
                    <img
                      src={logo}
                      alt='Balaji Hardware'
                      className='w-full h-full object-contain drop-shadow-[0_0_20px_rgba(217,119,6,0.4)]'
                    />
                  </div>
                  <h4 className='font-display text-xl font-semibold text-[#F3F4F6]'>Heavy Duty Foundry & Metallurgy</h4>
                  <p className='text-xs text-[#9CA3AF] uppercase tracking-widest mt-1'>High Tolerance Industrial Standard</p>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl'>
                  <div className='font-display text-2xl font-semibold text-[#F3F4F6] mb-1'>1,200</div>
                  <div className='text-sm text-[#9CA3AF]'>Tons dispatched in 2021</div>
                </div>
                <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl'>
                  <div className='font-display text-2xl font-semibold text-[#d97706] mb-1'>90+</div>
                  <div className='text-sm text-[#9CA3AF]'>Containers in 2021</div>
                </div>
                <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl'>
                  <div className='font-display text-2xl font-semibold text-[#F3F4F6] mb-1'>300</div>
                  <div className='text-sm text-[#9CA3AF]'>Tons aluminium products</div>
                </div>
                <div className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl'>
                  <div className='font-display text-2xl font-semibold text-[#d97706] mb-1'>900</div>
                  <div className='text-sm text-[#9CA3AF]'>Tons iron products</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section id='manufacturing' className='px-4 sm:px-6 py-20 md:py-28 border-b border-white/5'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-12'>
            <h2 className='font-display text-3xl md:text-5xl font-semibold text-[#F3F4F6] mb-3 tracking-tight'>Manufacturing Process</h2>
            <p className='text-[#9CA3AF]'>State of the art facilities built for scale and precision</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {manufacturing.map((item) => (
              <div key={item.title} className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.15)] transition-all duration-300'>
                <h3 className='font-display text-xl font-semibold text-[#F3F4F6] mb-2'>{item.title}</h3>
                <p className='text-sm text-[#9CA3AF] leading-relaxed'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section id='milestones' className='px-4 sm:px-6 py-20 md:py-28 border-b border-white/5'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-12 md:mb-16'>
            <h2 className='font-display text-3xl md:text-5xl font-semibold text-[#F3F4F6] mb-3 tracking-tight'>Our Journey</h2>
            <p className='text-[#9CA3AF]'>Key milestones that shaped who we are today</p>
          </div>
          <div className='space-y-0'>
            {milestones.map((m) => (
              <div key={m.year} className='grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-8 border-t border-white/10'>
                <div className='md:col-span-2'>
                  <span className='font-display text-2xl font-semibold text-[#d97706]'>{m.year}</span>
                </div>
                <div className='md:col-span-4'>
                  <h3 className='font-display text-xl font-semibold text-[#F3F4F6]'>{m.title}</h3>
                </div>
                <div className='md:col-span-6'>
                  <p className='text-[#9CA3AF] leading-relaxed'>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className='px-4 sm:px-6 py-20 md:py-28 border-b border-white/5'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-12'>
            <h2 className='font-display text-3xl md:text-5xl font-semibold text-[#F3F4F6] mb-3 tracking-tight'>Leadership</h2>
            <p className='text-[#9CA3AF]'>The team behind Hardware Co.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
            {team.map((member) => (
              <div key={member.name} className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.15)] transition-all duration-300'>
                <div className='w-14 h-14 bg-gradient-to-br from-[#d97706]/30 to-black border border-[#d97706]/40 rounded-full mb-5 flex items-center justify-center shadow-[0_0_12px_rgba(217,119,6,0.2)]'>
                  <span className='text-[#d97706] font-bold text-lg'>{member.name.charAt(0)}</span>
                </div>
                <h3 className='font-display text-lg font-semibold text-[#F3F4F6]'>{member.name}</h3>
                <p className='text-sm text-[#d97706] mt-1'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id='sustainability' className='relative overflow-hidden bg-gradient-to-b from-white/5 via-[#181818]/60 to-black backdrop-blur-md text-[#F3F4F6] py-20 md:py-28 px-4 sm:px-6 border-t border-white/5'>
        <div className='ambient-glow pointer-events-none absolute left-1/3 top-0 h-64 w-64 opacity-50' />
        <div className='relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10'>
          <h2 className='lg:col-span-4 font-display text-3xl md:text-5xl font-semibold tracking-tight text-[#F3F4F6]'>Sustainability</h2>
          <div className='lg:col-span-7 lg:col-start-6'>
            <p className='text-[#9CA3AF] leading-relaxed mb-5 text-lg'>
              We are committed to responsible manufacturing. Our facilities use energy-efficient processes, and we continuously work to reduce waste and emissions across our production lines.
            </p>
            <p className='text-[#9CA3AF] leading-relaxed'>
              All our packaging materials are recyclable, and we work with suppliers who share our commitment to environmental responsibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About

