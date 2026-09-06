import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

const Footer = () => {
  return (
    <footer className='bg-[#0a0a0a] text-[#9CA3AF] border-t border-[#d97706]/20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 py-16 md:py-20'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>

          <div className='col-span-1'>
            <div className='flex items-center gap-3.5 mb-5'>
              <div className='h-14 sm:h-16 flex items-center justify-center'>
                <img
                  src={logo}
                  alt='Balaji Hardware'
                  className='h-13 sm:h-15 w-auto object-contain drop-shadow-[0_0_15px_rgba(217,119,6,0.4)]'
                />
              </div>
              <div className='flex flex-col'>
                <span className='text-[#F3F4F6] font-display font-bold text-xl tracking-tight leading-tight'>Balaji</span>
                <span className='text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#d97706] font-semibold leading-none mt-0.5'>Hardware • Estd 1980</span>
              </div>
            </div>
            <p className='text-sm leading-relaxed mb-6 text-[#9CA3AF]'>
              Manufacturers and exporters of premium architectural hardware,
              gate hardware, and aluminium fittings. Proudly made in India.
            </p>
            <div className='flex gap-3'>
              <a href='#' className='w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#d97706] hover:bg-[#d97706]/20 hover:shadow-[0_0_12px_rgba(217,119,6,0.3)] transition-all duration-300'><span className='text-xs'>in</span></a>
              <a href='#' className='w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#d97706] hover:bg-[#d97706]/20 hover:shadow-[0_0_12px_rgba(217,119,6,0.3)] transition-all duration-300'><span className='text-xs'>ig</span></a>
              <a href='#' className='w-9 h-9 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#d97706] hover:bg-[#d97706]/20 hover:shadow-[0_0_12px_rgba(217,119,6,0.3)] transition-all duration-300'><span className='text-xs'>fb</span></a>
            </div>
          </div>

          <div>
            <h4 className='text-[#F3F4F6] text-xs font-semibold tracking-[0.18em] uppercase mb-5'>Products</h4>
            <ul className='space-y-2.5 text-sm'>
              <li><Link to='/category/architectural-hardware' className='hover:text-[#d97706] transition-colors duration-300'>Architectural Hardware</Link></li>
              <li><Link to='/category/gate-hardware' className='hover:text-[#d97706] transition-colors duration-300'>Gate Hardware</Link></li>
              <li><Link to='/category/ironmongery' className='hover:text-[#d97706] transition-colors duration-300'>Ironmongery</Link></li>
              <li><Link to='/products' className='hover:text-[#d97706] transition-colors duration-300'>View All Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-[#F3F4F6] text-xs font-semibold tracking-[0.18em] uppercase mb-5'>Company</h4>
            <ul className='space-y-2.5 text-sm'>
              <li><Link to='/about' className='hover:text-[#d97706] transition-colors duration-300'>About Us</Link></li>
              <li><Link to='/about' className='hover:text-[#d97706] transition-colors duration-300'>Manufacturing</Link></li>
              <li><Link to='/about' className='hover:text-[#d97706] transition-colors duration-300'>Milestones</Link></li>
              <li><Link to='/about' className='hover:text-[#d97706] transition-colors duration-300'>Sustainability</Link></li>
              <li><Link to='/contact' className='hover:text-[#d97706] transition-colors duration-300'>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-[#F3F4F6] text-xs font-semibold tracking-[0.18em] uppercase mb-5'>Get in Touch</h4>
            <ul className='space-y-3 text-sm'>
              <li className='flex gap-2'>
                <span className='shrink-0 text-[#d97706] font-semibold'>Tel:</span>
                <a href='tel:+911234567890' className='hover:text-[#d97706] transition-colors duration-300'>+91 12345 67890</a>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 text-[#d97706] font-semibold'>Email:</span>
                <a href='mailto:info@hardware.com' className='hover:text-[#d97706] transition-colors duration-300'>info@hardware.com</a>
              </li>
            </ul>

            {/* Glassmorphism Embedded Google Map */}
            <div className='w-full h-48 mt-4 rounded-2xl overflow-hidden border border-[#d97706]/30 bg-white/5 backdrop-blur-md group hover:border-[#d97706] hover:shadow-[0_0_15px_rgba(217,119,6,0.15)] transition-all duration-300'>
              <iframe
                src='https://maps.google.com/maps?q=123+Industrial+Area,+Mumbai,+Maharashtra+400001&t=&z=13&ie=UTF8&iwloc=&output=embed'
                className='w-full h-full border-0 grayscale-[20%] invert-[90%] hue-rotate-[180deg] contrast-[85%]'
                loading='lazy'
                referrerPolicy='no-referrer-when-downgrade'
                title='Company Location'
              ></iframe>
            </div>

            <a href='https://wa.me/911234567890' target='_blank' rel='noreferrer' className='mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-[#d97706] hover:bg-[#b45309] text-white text-sm font-medium rounded-full shadow-[0_0_18px_rgba(217,119,6,0.3)] hover:scale-[1.03] transition-all duration-300 ease-premium'>WhatsApp Us</a>
          </div>

        </div>
      </div>

      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs'>
          <span>© 2025 Balaji Hardware Co. All rights reserved.</span>
          <div className='flex gap-5'>
            <Link to='#' className='hover:text-[#d97706] transition-colors duration-300'>Privacy Policy</Link>
            <Link to='#' className='hover:text-[#d97706] transition-colors duration-300'>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer


