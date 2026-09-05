const milestones = [
  { year: '1995', title: 'Founded', desc: 'Started as a small hardware trading company in Mumbai.' },
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
    <div>
      {/* Hero */}
      <section className='bg-gray-900 text-white py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='max-w-2xl'>
            <span className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 block'>About Us</span>
            <h1 className='text-4xl font-bold mb-6'>Three Decades of Hardware Excellence</h1>
            <p className='text-gray-400 text-lg leading-relaxed'>
              From a small trading company to one of India's leading hardware manufacturers and exporters — our journey has been built on quality, consistency and customer trust.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 py-12'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900 mb-1'>700+</div>
              <div className='text-sm text-gray-500'>Products</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900 mb-1'>30+</div>
              <div className='text-sm text-gray-500'>Countries Served</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900 mb-1'>60,000</div>
              <div className='text-sm text-gray-500'>Sq. Ft. Factory</div>
            </div>
            <div className='text-center'>
              <div className='text-3xl font-bold text-gray-900 mb-1'>8</div>
              <div className='text-sm text-gray-500'>Finishing Plants</div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className='bg-gray-50 py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            <div>
              <h2 className='text-3xl font-bold text-gray-900 mb-6'>Our Mission</h2>
              <p className='text-gray-600 leading-relaxed mb-4'>
                To manufacture and export world-class hardware products that combine functionality, durability and aesthetic appeal — at competitive prices that make quality accessible globally.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                We believe in long-term partnerships with our customers, built on transparency, consistent quality and reliable delivery timelines.
              </p>
            </div>
            <div className='grid grid-cols-2 gap-4'>
              <div className='bg-white p-6 rounded-xl border border-gray-100'>
                <div className='text-2xl font-bold text-gray-900 mb-1'>1,200</div>
                <div className='text-sm text-gray-500'>Tons dispatched in 2021</div>
              </div>
              <div className='bg-white p-6 rounded-xl border border-gray-100'>
                <div className='text-2xl font-bold text-gray-900 mb-1'>90+</div>
                <div className='text-sm text-gray-500'>Containers in 2021</div>
              </div>
              <div className='bg-white p-6 rounded-xl border border-gray-100'>
                <div className='text-2xl font-bold text-gray-900 mb-1'>300</div>
                <div className='text-sm text-gray-500'>Tons aluminium products</div>
              </div>
              <div className='bg-white p-6 rounded-xl border border-gray-100'>
                <div className='text-2xl font-bold text-gray-900 mb-1'>900</div>
                <div className='text-sm text-gray-500'>Tons iron products</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manufacturing */}
      <section id='manufacturing' className='bg-white py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-10'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Manufacturing Process</h2>
            <p className='text-gray-500'>State of the art facilities built for scale and precision</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {manufacturing.map((item) => (
              <div key={item.title} className='p-6 border border-gray-100 rounded-xl'>
                <div className='w-8 h-8 bg-gray-900 rounded mb-4'></div>
                <h3 className='font-semibold text-gray-900 mb-2'>{item.title}</h3>
                <p className='text-sm text-gray-500 leading-relaxed'>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section id='milestones' className='bg-gray-50 py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-10'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Our Journey</h2>
            <p className='text-gray-500'>Key milestones that shaped who we are today</p>
          </div>
          <div className='space-y-6'>
            {milestones.map((m, i) => (
              <div key={m.year} className='flex gap-6 items-start'>
                <div className='w-16 shrink-0 text-right'>
                  <span className='text-sm font-bold text-gray-900'>{m.year}</span>
                </div>
                <div className='w-px bg-gray-200 self-stretch relative'>
                  <div className='w-3 h-3 bg-gray-900 rounded-full absolute -left-1 top-1'></div>
                </div>
                <div className='pb-6'>
                  <h3 className='font-semibold text-gray-900 mb-1'>{m.title}</h3>
                  <p className='text-sm text-gray-500'>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className='bg-white py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-10'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Leadership</h2>
            <p className='text-gray-500'>The team behind Hardware Co.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {team.map((member) => (
              <div key={member.name} className='p-6 border border-gray-100 rounded-xl'>
                <div className='w-12 h-12 bg-gray-200 rounded-full mb-4'></div>
                <h3 className='font-semibold text-gray-900'>{member.name}</h3>
                <p className='text-sm text-gray-500'>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id='sustainability' className='bg-gray-900 text-white py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='max-w-2xl'>
            <h2 className='text-3xl font-bold mb-6'>Sustainability</h2>
            <p className='text-gray-400 leading-relaxed mb-4'>
              We are committed to responsible manufacturing. Our facilities use energy-efficient processes, and we continuously work to reduce waste and emissions across our production lines.
            </p>
            <p className='text-gray-400 leading-relaxed'>
              All our packaging materials are recyclable, and we work with suppliers who share our commitment to environmental responsibility.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About