import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const categories = [
  {
    name: 'Aluminium Hardware',
    slug: 'aluminium-hardware',
    items: ['Alum Handle', 'Alum Hinge', 'Alum Hook', 'Alum Stay', 'Alum Tower Bolt']
  },
  {
    name: 'Gate Hardware',
    slug: 'gate-hardware',
    items: ['Hinges', 'Pad Bolt', 'Spring Latch', 'Tee Hinge', 'Hook and Band']
  },
  {
    name: 'Architectural Hardware',
    slug: 'architectural-hardware',
    items: ['Pull Handle', 'Tower Bolt', 'Barrel Bolts', 'Turn Button', 'Cabin Hook']
  },
  {
    name: 'Hardware & Ironmongery',
    slug: 'hardware-ironmongery',
    items: ['Door Bolt', 'Door Stopper', 'Hooks', 'Clamps', 'Brackets']
  },
]

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  return (
    <header className='w-full bg-white border-b border-gray-100 sticky top-0 z-50'>
      {/* Top bar */}
      <div className='bg-gray-900 text-gray-300 text-xs py-2'>
        <div className='max-w-7xl mx-auto px-4 flex justify-between items-center'>
          <span>Proudly Made in India</span>
          <div className='flex gap-6'>
            <a href='tel:+911234567890' className='hover:text-white transition'>+91 12345 67890</a>
            <a href='mailto:info@hardware.com' className='hover:text-white transition'>info@hardware.com</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className='max-w-7xl mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <Link to='/' className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-gray-900 rounded flex items-center justify-center'>
              <span className='text-white text-xs font-bold'>HW</span>
            </div>
            <span className='font-semibold text-gray-900 text-lg'>Hardware Co.</span>
          </Link>

          {/* Desktop nav */}
          <nav className='hidden md:flex items-center gap-1'>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded transition ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              Home
            </NavLink>

            {/* Products mega menu */}
            <div
              className='relative'
              onMouseEnter={() => setActiveDropdown('products')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className='px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition flex items-center gap-1'>
                Products
                <svg className='w-3 h-3' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                </svg>
              </button>

              {activeDropdown === 'products' && (
                <div className='absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-gray-100 rounded-xl shadow-xl p-6 grid grid-cols-2 gap-6'>
                  {categories.map((cat) => (
                    <div key={cat.slug}>
                      <Link
                        to={`/category/${cat.slug}`}
                        className='text-sm font-semibold text-gray-900 hover:text-gold-500 transition block mb-2'
                      >
                        {cat.name}
                      </Link>
                      <ul className='space-y-1'>
                        {cat.items.map((item) => (
                          <li key={item}>
                            <Link
                              to={`/products?category=${cat.slug}`}
                              className='text-xs text-gray-500 hover:text-gray-900 transition block'
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  <div className='col-span-2 pt-4 border-t border-gray-100'>
                    <Link
                      to='/products'
                      className='text-sm font-medium text-gray-900 hover:underline'
                    >
                      View all products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to='/about'
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded transition ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              About
            </NavLink>

            <NavLink
              to='/contact'
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded transition ${isActive ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* CTA */}
          <div className='hidden md:flex items-center gap-3'>
            <Link
              to='/contact'
              className='px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition'
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className='md:hidden p-2 text-gray-600'
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            ) : (
              <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2'>
          <Link to='/' className='block py-2 text-sm text-gray-700' onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to='/products' className='block py-2 text-sm text-gray-700' onClick={() => setMobileOpen(false)}>Products</Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className='block py-1 pl-4 text-xs text-gray-500'
              onClick={() => setMobileOpen(false)}
            >
              {cat.name}
            </Link>
          ))}
          <Link to='/about' className='block py-2 text-sm text-gray-700' onClick={() => setMobileOpen(false)}>About</Link>
          <Link to='/contact' className='block py-2 text-sm text-gray-700' onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link
            to='/contact'
            className='block mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg text-center'
            onClick={() => setMobileOpen(false)}
          >
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar