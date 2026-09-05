import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-gray-400'>
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>

          <div className='col-span-1'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='w-8 h-8 bg-white rounded flex items-center justify-center'>
                <span className='text-gray-900 text-xs font-bold'>HW</span>
              </div>
              <span className='text-white font-semibold text-lg'>Hardware Co.</span>
            </div>
            <p className='text-sm leading-relaxed mb-6'>
              Manufacturers and exporters of premium architectural hardware,
              gate hardware, and aluminium fittings. Proudly made in India.
            </p>
            <div className='flex gap-3'>
              <a href='#' className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition'><span className='text-xs'>in</span></a>
              <a href='#' className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition'><span className='text-xs'>ig</span></a>
              <a href='#' className='w-8 h-8 bg-gray-800 rounded flex items-center justify-center hover:bg-gray-700 transition'><span className='text-xs'>fb</span></a>
            </div>
          </div>

          <div>
            <h4 className='text-white text-sm font-semibold mb-4'>Products</h4>
            <ul className='space-y-2 text-sm'>
              <li><Link to='/category/architectural-hardware' className='hover:text-white transition'>Architectural Hardware</Link></li>
              <li><Link to='/category/gate-hardware' className='hover:text-white transition'>Gate Hardware</Link></li>
              <li><Link to='/category/ironmongery' className='hover:text-white transition'>Ironmongery</Link></li>
              <li><Link to='/products' className='hover:text-white transition'>View All Products</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-white text-sm font-semibold mb-4'>Company</h4>
            <ul className='space-y-2 text-sm'>
              <li><Link to='/about' className='hover:text-white transition'>About Us</Link></li>
              <li><Link to='/about' className='hover:text-white transition'>Manufacturing</Link></li>
              <li><Link to='/about' className='hover:text-white transition'>Milestones</Link></li>
              <li><Link to='/about' className='hover:text-white transition'>Sustainability</Link></li>
              <li><Link to='/contact' className='hover:text-white transition'>Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className='text-white text-sm font-semibold mb-4'>Get in Touch</h4>
            <ul className='space-y-3 text-sm'>
              <li className='flex gap-2'>
                <span className='shrink-0 text-gray-500'>Loc:</span>
                <span>123 Industrial Area, Mumbai, Maharashtra 400001</span>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 text-gray-500'>Tel:</span>
                <a href='tel:+911234567890' className='hover:text-white transition'>+91 12345 67890</a>
              </li>
              <li className='flex gap-2'>
                <span className='shrink-0 text-gray-500'>Email:</span>
                <a href='mailto:info@hardware.com' className='hover:text-white transition'>info@hardware.com</a>
              </li>
            </ul>
            <a href='https://wa.me/911234567890' target='_blank' rel='noreferrer' className='mt-4 inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition'>WhatsApp Us</a>
          </div>

        </div>
      </div>

      <div className='border-t border-gray-800'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs'>
          <span>2025 Hardware Co. All rights reserved.</span>
          <div className='flex gap-4'>
            <Link to='#' className='hover:text-white transition'>Privacy Policy</Link>
            <Link to='#' className='hover:text-white transition'>Terms of Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer