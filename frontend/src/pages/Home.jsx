import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/categories.js'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const stats = [
  { number: '700+', label: 'Products' },
  { number: '90+', label: 'Containers Dispatched' },
  { number: '60,000', label: 'Sq. Ft. Factory' },
  { number: '25+', label: 'Years Experience' },
]

const features = [
  { title: 'Proudly Made in India', desc: 'All products manufactured in our 60,000 sq. ft. facility in India.' },
  { title: 'Export Quality', desc: 'Shipped to 30+ countries with consistent quality and finish standards.' },
  { title: 'Custom Finishes', desc: 'Chrome, antique brass, powder coat and more — tailored to your spec.' },
  { title: 'Bulk Orders', desc: 'Capacity to handle large volume orders with fast turnaround.' },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const Home = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const dbCategories = categoriesData?.data || []

  return (
    <div className='bg-[#121212] text-[#F3F4F6] min-h-screen selection:bg-[#d97706]/30 selection:text-white'>
      {/* Hero Section */}
      <section className='relative overflow-hidden mesh-studio noise-overlay min-h-[calc(100vh-120px)] flex items-center border-b border-white/5 py-8 md:py-12'>
        {/* Ambient Glow Aura */}
        <div className='pointer-events-none absolute inset-0 overflow-hidden'>
          <div className='ambient-glow absolute left-1/2 top-1/2 h-[80vw] w-[80vw] max-w-[800px] max-h-[800px] -translate-x-[12%] -translate-y-[45%] opacity-90' />
        </div>

        <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-14'>

            {/* Left Content Column */}
            <div className='w-full lg:w-7/12 text-left'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className='inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-4 sm:mb-5 px-3.5 py-1.5 rounded-full bg-[#d97706]/10 border border-[#d97706]/30 backdrop-blur-md shadow-[0_0_15px_rgba(217,119,6,0.15)]'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[#d97706] animate-ping'></span>
                  Manufacturer and Exporter
                </span>

                <h1 className='font-display text-4xl sm:text-5xl lg:text-[4.25rem] font-semibold leading-[1.05] sm:leading-[0.98] tracking-tight mb-5 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]'>
                  Premium Hardware for Every Application
                </h1>

                <p className='text-[#9CA3AF] text-base sm:text-lg md:text-xl mb-6 sm:mb-8 leading-relaxed max-w-2xl font-light'>
                  From gate hardware to architectural ironmongery — precision-engineered products built for durability, reliability, and shipped worldwide.
                </p>

                <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4'>
                  <Link
                    to='/products'
                    className='btn-primary text-center !px-8 !py-3.5 text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] transition-all duration-500 ease-out shadow-[0_0_25px_rgba(217,119,6,0.4)]'
                  >
                    Browse Products
                  </Link>
                  <Link
                    to='/contact'
                    className='btn-ghost text-center !px-8 !py-3.5 text-sm font-semibold tracking-wider uppercase hover:scale-[1.03] transition-all duration-500 ease-out'
                  >
                    Request a Quote
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Right Graphic / Spotlight Hero Card */}
            <div className='w-full lg:w-5/12 flex items-center justify-center'>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className='relative w-full max-w-md aspect-square rounded-3xl md:rounded-[2.5rem] bg-white/5 backdrop-blur-xl border border-[#d97706]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_40px_rgba(217,119,6,0.2)] flex items-center justify-center overflow-hidden group hover:border-[#d97706] hover:scale-[1.02] transition-all duration-500 ease-out p-6 sm:p-8 md:p-10'
              >
                {/* Radial Spotlight Gradient Background */}
                <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.4)_0%,rgba(217,119,6,0.08)_40%,transparent_70%)] z-0' />
                <div className='absolute -top-24 -right-24 w-60 h-60 bg-[#d97706]/20 rounded-full blur-3xl pointer-events-none' />

                {/* Center Content */}
                <div className='relative z-10 flex flex-col items-center justify-center text-center'>
                  <div className='w-40 h-40 sm:w-52 sm:h-52 flex items-center justify-center mb-3 group-hover:scale-105 transition-all duration-500 ease-out'>
                    <img
                      src={logo}
                      alt='Balaji Hardware Estd 1980'
                      className='w-full h-full object-contain drop-shadow-[0_0_30px_rgba(217,119,6,0.5)]'
                    />
                  </div>

                  <h2 className='font-display text-xl sm:text-2xl font-semibold text-[#F3F4F6] tracking-tight group-hover:text-[#d97706] transition-colors duration-300'>
                    Precision Cast Architectural Hardware
                  </h2>

                  <p className='text-xs font-semibold text-[#9CA3AF] mt-2 tracking-widest uppercase'>
                    Export Standard Finishing
                  </p>

                  <div className='mt-4 flex items-center gap-2'>
                    <span className='w-2 h-2 rounded-full bg-[#d97706] shadow-[0_0_8px_#d97706]'></span>
                    <span className='text-[11px] text-[#9CA3AF] font-mono'>ISO Standard Certified</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us / Bento Stats */}
      <section className='px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-b border-white/5 relative'>
        <div className='max-w-7xl mx-auto'>

          <div className='mb-12 md:mb-16'>
            <span className='text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-3 block'>
              Engineering Excellence
            </span>
            <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F3F4F6] mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]'>
              Why Choose Us
            </h2>
            <p className='text-[#9CA3AF] text-base md:text-lg max-w-xl font-light leading-relaxed'>
              Built on decades of manufacturing precision and global delivery capabilities.
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            className='grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6'
          >
            {/* Stat 1 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-2 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <div className='font-display text-4xl sm:text-5xl font-semibold text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors'>
                {stats[0].number}
              </div>
              <div className='mt-2.5 text-xs sm:text-sm uppercase tracking-widest text-[#9CA3AF] font-medium'>
                {stats[0].label}
              </div>
            </motion.div>

            {/* Stat 2 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-2 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <div className='font-display text-4xl sm:text-5xl font-semibold text-[#d97706] tracking-tight drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]'>
                {stats[1].number}
              </div>
              <div className='mt-2.5 text-xs sm:text-sm uppercase tracking-widest text-[#9CA3AF] font-medium'>
                {stats[1].label}
              </div>
            </motion.div>

            {/* Stat 3 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-2 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <div className='font-display text-4xl sm:text-5xl font-semibold text-[#F3F4F6] tracking-tight group-hover:text-white transition-colors'>
                {stats[2].number}
              </div>
              <div className='mt-2.5 text-xs sm:text-sm uppercase tracking-widest text-[#9CA3AF] font-medium'>
                {stats[2].label}
              </div>
            </motion.div>

            {/* Featured Bento Cell */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-3 md:row-span-2 bg-gradient-to-br from-[#1c1917] via-[#141414] to-black border-[#d97706]/40 shadow-[0_0_35px_rgba(217,119,6,0.15)] flex flex-col justify-between group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <div>
                <div className='w-11 h-11 rounded-2xl bg-[#d97706]/20 border border-[#d97706]/40 flex items-center justify-center text-[#d97706] font-bold text-lg mb-6 shadow-[0_0_15px_rgba(217,119,6,0.25)] group-hover:scale-110 transition-transform duration-300'>
                  ★
                </div>
                <h3 className='font-display text-2xl sm:text-3xl font-semibold text-[#F3F4F6] mb-4 tracking-tight group-hover:text-[#d97706] transition-colors duration-300'>
                  {features[0].title}
                </h3>
                <p className='text-[#9CA3AF] text-base leading-relaxed font-light'>
                  {features[0].desc}
                </p>
              </div>
              <div className='pt-8 mt-6 border-t border-white/10 flex items-center gap-2 text-xs text-[#d97706] font-semibold uppercase tracking-widest'>
                <span>Direct from Factory</span>
                <span className='text-white/40'>•</span>
                <span>Worldwide Dispatch</span>
              </div>
            </motion.div>

            {/* Stat 4 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-3 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <div className='font-display text-4xl sm:text-5xl font-semibold text-[#d97706] tracking-tight drop-shadow-[0_0_15px_rgba(217,119,6,0.3)]'>
                {stats[3].number}
              </div>
              <div className='mt-2.5 text-xs sm:text-sm uppercase tracking-widest text-[#9CA3AF] font-medium'>
                {stats[3].label}
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-3 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <h3 className='font-display text-lg sm:text-xl font-semibold text-[#F3F4F6] mb-2 tracking-tight group-hover:text-[#d97706] transition-colors duration-300'>
                {features[1].title}
              </h3>
              <p className='text-sm text-[#9CA3AF] leading-relaxed font-light'>{features[1].desc}</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-3 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <h3 className='font-display text-lg sm:text-xl font-semibold text-[#F3F4F6] mb-2 tracking-tight group-hover:text-[#d97706] transition-colors duration-300'>
                {features[2].title}
              </h3>
              <p className='text-sm text-[#9CA3AF] leading-relaxed font-light'>{features[2].desc}</p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div variants={cardVariants} className='bento-cell md:col-span-3 group hover:scale-[1.02] transition-all duration-500 ease-out'>
              <h3 className='font-display text-lg sm:text-xl font-semibold text-[#F3F4F6] mb-2 tracking-tight group-hover:text-[#d97706] transition-colors duration-300'>
                {features[3].title}
              </h3>
              <p className='text-sm text-[#9CA3AF] leading-relaxed font-light'>{features[3].desc}</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className='px-4 sm:px-6 lg:px-8 py-20 md:py-32 border-b border-white/5'>
        <div className='max-w-7xl mx-auto'>

          <div className='flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6'>
            <div>
              <span className='text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-3 block'>
                Hardware Portfolios
              </span>
              <h2 className='font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F3F4F6] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]'>
                Product Categories
              </h2>
              <p className='text-[#9CA3AF] text-base md:text-lg mt-2 font-light'>
                Explore our full range of architectural and gate hardware solutions.
              </p>
            </div>

            <Link
              to='/products'
              className='btn-ghost hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider hover:scale-[1.03] transition-all duration-500 ease-out'
            >
              <span>View All Products</span>
              <svg className='w-4 h-4 text-[#d97706]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
              </svg>
            </Link>
          </div>

          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'
          >
            {dbCategories.map((cat) => (
              <motion.div
                key={cat.slug}
                variants={cardVariants}
                className='h-full'
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className='product-card group block h-full p-7 md:p-8 relative overflow-hidden bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-3xl hover:border-[#d97706] hover:shadow-[0_0_30px_rgba(217,119,6,0.2)] hover:scale-[1.02] transition-all duration-500 ease-out'
                >
                  {/* Radial Spotlight Corner Glow */}
                  <div className='absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_top_right,rgba(217,119,6,0.3)_0%,transparent_65%)] rounded-bl-full -mr-12 -mt-12 transition-transform duration-700 ease-out group-hover:scale-125 pointer-events-none' />

                  <div className='relative z-10 flex flex-col h-full justify-between'>
                    <div>
                      {/* Category Badge Icon */}
                      <div className='w-14 h-14 bg-gradient-to-br from-[#d97706]/30 via-black to-black border border-[#d97706]/40 rounded-2xl mb-6 flex items-center justify-center transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(217,119,6,0.4)]'>
                        <span className='text-[#d97706] text-sm font-bold tracking-wider font-display'>HW</span>
                      </div>

                      <h3 className='font-display text-xl sm:text-2xl font-semibold text-[#F3F4F6] group-hover:text-[#d97706] transition-colors duration-300 mb-2 tracking-tight'>
                        {cat.name}
                      </h3>

                      <p className='text-xs font-semibold text-[#d97706] mb-6 tracking-widest uppercase'>
                        {cat._count?.products || 0} products available
                      </p>

                      {cat.children?.length > 0 && (
                        <div className='pt-5 border-t border-white/10'>
                          <p className='text-xs sm:text-sm text-[#9CA3AF] leading-relaxed line-clamp-3 font-light'>
                            {cat.children.map((sub) => sub.name).join(' • ')}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className='mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-[#9CA3AF] group-hover:text-[#F3F4F6] transition-colors duration-300'>
                      <span className='tracking-wider uppercase font-medium'>Explore Catalog</span>
                      <svg
                        className='w-4 h-4 text-[#d97706] transform group-hover:translate-x-1.5 transition-transform duration-300'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className='mt-12 text-center md:hidden'>
            <Link
              to='/products'
              className='btn-ghost w-full text-center py-3.5 text-xs font-semibold uppercase tracking-wider'
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Order Section */}
      <section className='px-4 sm:px-6 lg:px-8 py-20 md:py-32'>
        <div className='max-w-6xl mx-auto relative overflow-hidden bg-gradient-to-b from-white/5 via-[#181818]/70 to-black backdrop-blur-xl border border-[#d97706]/30 rounded-3xl md:rounded-[2.5rem] p-8 sm:p-14 md:p-20 text-center shadow-[0_0_50px_rgba(217,119,6,0.15)]'>
          <div className='ambient-glow pointer-events-none absolute inset-x-1/4 top-0 h-44 opacity-75' />

          <span className='relative z-10 text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-4 block'>
            Custom Orders & International Supply
          </span>

          <h2 className='relative z-10 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-[#F3F4F6] mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]'>
            Ready to Place an Order?
          </h2>

          <p className='relative z-10 text-[#9CA3AF] text-base sm:text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light leading-relaxed'>
            Connect with our engineering and sales team for volume inquiries, custom finishes, and direct factory container pricing.
          </p>

          <div className='relative z-10 flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center'>
            <Link
              to='/contact'
              className='btn-primary !px-8 !py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:scale-[1.03] transition-all duration-500 ease-out shadow-[0_0_25px_rgba(217,119,6,0.4)]'
            >
              Contact Us
            </Link>
            <a
              href='https://wa.me/911234567890'
              target='_blank'
              rel='noreferrer'
              className='btn-ghost !px-8 !py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:scale-[1.03] transition-all duration-500 ease-out flex items-center justify-center gap-2'
            >
              <span>WhatsApp Us</span>
              <svg className='w-4 h-4 text-[#d97706]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14' />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
