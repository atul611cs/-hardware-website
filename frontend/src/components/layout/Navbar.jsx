import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts } from '../../api/products.js'
import { getCategories } from '../../api/categories.js'
import logo from '../../assets/logo.png'

import { getCategories } from '../../api/categories.js'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(false)
  const searchRef = useRef(null)

  const { data: searchResults, isFetching } = useQuery({
    queryKey: ['search', searchQuery],
    queryFn: () => getProducts({ search: searchQuery, limit: 5 }),
    enabled: searchQuery.length > 1,
    staleTime: 300,
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 60000,
  })

  const dbCategories = categoriesData?.data || []

  const results = searchResults?.data || []

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileCategoryOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchQuery('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
      setMobileOpen(false)
    }
  }

  const handleResultClick = (slug) => {
    navigate(`/products/${slug}`)
    setSearchQuery('')
    setMobileOpen(false)
  }

  return (
    <header className='sticky top-0 z-50 w-full'>
      {/* Top Announcement & Quick Contact Bar */}
      <div className='bg-[#0a0a0a]/90 backdrop-blur-md text-[#9CA3AF] text-xs py-2 border-b border-white/5'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center gap-3'>
          <span className='tracking-wider text-[11px] uppercase text-[#9CA3AF] flex items-center gap-1.5'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#C89E47] animate-pulse'></span>
            Proudly Made in India
          </span>
          <div className='flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs'>
            <a
              href='tel:+911234567890'
              className='hover:text-[#C89E47] transition-colors duration-300 font-medium'
            >
              +91 12345 67890
            </a>
            <a
              href='mailto:info@hardware.com'
              className='hidden sm:inline hover:text-[#C89E47] transition-colors duration-300 font-medium'
            >
              info@hardware.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div className='relative glass-nav noise-overlay bg-[#121212]/85 backdrop-blur-xl border-b border-[#C89E47]/30 shadow-[0_8px_32px_rgba(0,0,0,0.5)]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex items-center justify-between h-[4.75rem] md:h-[5.25rem] gap-4'>

            {/* Brand Logo */}
            <Link to='/' className='flex items-center gap-3.5 shrink-0 group'>
              <div className='h-12 sm:h-14 md:h-16 flex items-center justify-center'>
                <img
                  src={logo}
                  alt='Balaji Hardware'
                  className='h-11 sm:h-14 md:h-15 w-auto object-contain drop-shadow-[0_0_15px_rgba(200,158,71,0.4)] group-hover:scale-105 transition-transform duration-500 ease-out'
                />
              </div>
              <div className='flex flex-col'>
                <span className='font-display font-bold text-[#F5F0E6] text-xl sm:text-2xl tracking-tight leading-tight group-hover:text-white transition-colors duration-300'>
                  Balaji
                </span>
                <span className='text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#C89E47] font-semibold leading-none mt-0.5'>
                  Hardware • Estd 1980
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links (md: and above) */}
            <nav className='hidden md:flex items-center justify-center gap-1 lg:gap-2'>
              {/* Home Link */}
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 group ${
                    isActive ? 'text-[#C89E47]' : 'text-[#A39A8A] hover:text-[#F5F0E6]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Home</span>
                    <span
                      className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C89E47] transition-transform duration-300 ease-out origin-left ${
                        isActive ? 'scale-x-100 shadow-[0_0_8px_rgba(200,158,71,0.8)]' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>

              {/* Products Mega Dropdown */}
              <div
                className='relative group'
                onMouseEnter={() => setActiveDropdown('products')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  to='/products'
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-medium tracking-wide transition-colors duration-300 flex items-center gap-1.5 ${
                      isActive || activeDropdown === 'products' ? 'text-[#C89E47]' : 'text-[#A39A8A] hover:text-[#F5F0E6]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>Products</span>
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-300 ${
                          activeDropdown === 'products' ? 'rotate-180 text-[#C89E47]' : 'group-hover:rotate-180'
                        }`}
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                      >
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                      </svg>
                      <span
                        className={`absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C89E47] transition-transform duration-300 ease-out origin-left ${
                          isActive ? 'scale-x-100 shadow-[0_0_8px_rgba(200,158,71,0.8)]' : 'scale-x-0 group-hover:scale-x-100'
                        }`}
                      />
                    </>
                  )}
                </NavLink>

              <AnimatePresence>
                {activeDropdown === 'products' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className='absolute top-full -right-20 w-[850px] bg-white/95 backdrop-blur-xl border border-gray-100 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.08)] p-6 z-50 mt-4 origin-top'
                  >
                    {/* Decorative Pointer */}
                    <div className='absolute -top-2 left-1/4 w-4 h-4 bg-white border-l border-t border-gray-100 transform rotate-45 -translate-x-1/2'></div>
                    
                    <div className='grid grid-cols-3 gap-6 relative z-10'>
                      {dbCategories.map((cat) => (
                        <div key={cat.slug} className='flex flex-col'>
                          <Link
                            to={`/category/${cat.slug}`}
                            className='text-base font-bold text-gray-900 hover:text-blue-600 transition block mb-2 border-b border-gray-100/80 pb-2 group flex items-center justify-between'
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span>{cat.name}</span>
                            <svg className='w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                            </svg>
                          </Link>
                          <ul className='space-y-1 flex-1'>
                            {cat.children?.map((sub) => (
                              <li key={sub.slug}>
                                <Link
                                  to={`/category/${sub.slug}`}
                                  className='text-[14px] text-gray-500 hover:text-gray-900 hover:translate-x-1 transition-all block'
                                  onClick={() => setActiveDropdown(null)}
                                >
                                  {sub.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      <div className='col-span-3 pt-4 mt-1 border-t border-gray-100/80 flex justify-end'>
                        <Link to='/products' className='px-6 py-2 bg-gray-50 hover:bg-gray-100 text-sm font-semibold text-gray-900 rounded-xl transition flex items-center gap-2 group'>
                          View all products
                          <svg className='w-4 h-4 transform group-hover:translate-x-1 transition-transform' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8l4 4m0 0l-4 4m4-4H3' />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Hamburger Button (visible only on md:hidden) */}
            <div className='flex items-center gap-2 md:hidden'>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className='p-2.5 rounded-xl bg-[#141311]/60 border border-[#C89E47]/30 text-[#A39A8A] hover:text-[#C89E47] hover:border-[#C89E47] transition-all duration-300'
                aria-label={mobileOpen ? 'Close Menu' : 'Open Menu'}
              >
                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  {mobileOpen ? (
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                  ) : (
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
                  )}
                </svg>
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Menu Drawer / Dropdown (Obsidian & Brushed Brass aesthetic) */}
        <AnimatePresence>
          {mobileOpen && (
            <MotionDiv
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className='md:hidden overflow-hidden bg-[#141311]/95 backdrop-blur-xl border-b border-[#C89E47]/30 absolute top-full left-0 w-full flex flex-col p-4 z-50 shadow-[0_20px_50px_rgba(0,0,0,0.9)]'
            >
              <div className='space-y-4 max-h-[calc(100vh-5.5rem)] overflow-y-auto pb-4'>
                
                {/* Full-width Search Bar inside Mobile Drawer */}
                <form onSubmit={handleSearchSubmit} className='relative flex items-center'>
                  <div className='absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none'>
                    <svg className='w-4 h-4 text-[#A39A8A]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                    </svg>
                  </div>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search here...'
                    className='w-full bg-[#141311]/80 border border-[#C89E47]/30 rounded-full pl-10 pr-16 py-2.5 text-xs text-[#F5F0E6] placeholder-[#A39A8A] focus:outline-none focus:border-[#C89E47] focus:ring-1 focus:ring-[#C89E47] transition-all'
                  />
                  <button
                    type='submit'
                    className='absolute right-2 px-3 py-1 bg-[#C89E47] hover:bg-[#b08736] text-black text-xs font-semibold rounded-full transition-colors'
                  >
                    Go
                  </button>
                </form>

                {/* Mobile Search Live Results */}
                {searchQuery.length > 1 && results.length > 0 && (
                  <div className='bg-[#141311] border border-[#C89E47]/30 rounded-2xl overflow-hidden divide-y divide-white/5'>
                    {results.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleResultClick(product.slug)}
                        className='w-full flex items-center gap-3 px-3.5 py-2.5 text-left hover:bg-white/5'
                      >
                        <div className='w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center shrink-0 overflow-hidden'>
                          {product.images?.[0] ? (
                            <img src={product.images[0].url} alt={product.name} className='w-full h-full object-contain p-0.5' />
                          ) : (
                            <span className='text-[9px] text-[#A39A8A] font-bold'>HW</span>
                          )}
                        </div>
                        <div className='min-w-0 flex-1'>
                          <p className='text-xs font-medium text-[#F5F0E6] truncate'>{product.name}</p>
                          <p className='text-[10px] text-[#A39A8A] truncate'>{product.category?.name}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Mobile Navigation Links */}
                <div className='space-y-1.5 pt-1'>
                  {/* Home */}
                  <NavLink
                    to='/'
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                        isActive
                          ? 'bg-[#C89E47]/15 text-[#C89E47] border border-[#C89E47]/30'
                          : 'text-[#F5F0E6] hover:text-[#C89E47] hover:bg-white/5'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    Home
                  </NavLink>

                  {/* Products Clickable Accordion (Stacked cleanly without overlapping) */}
                  <div className='rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]'>
                    <div className='flex items-center justify-between py-2.5 px-3.5 text-sm font-medium tracking-wide text-[#F5F0E6]'>
                      <NavLink
                        to='/products'
                        className={({ isActive }) =>
                          `flex-1 transition-colors ${isActive ? 'text-[#C89E47] font-semibold' : 'hover:text-[#C89E47]'}`
                        }
                        onClick={() => setMobileOpen(false)}
                      >
                        Products
                      </NavLink>
                      <button
                        type='button'
                        onClick={() => setMobileCategoryOpen(!mobileCategoryOpen)}
                        className='p-1.5 rounded-lg text-[#A39A8A] hover:text-[#C89E47] hover:bg-white/5 transition-colors'
                        aria-label='Toggle Products Categories'
                      >
                        <svg
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileCategoryOpen ? 'rotate-180 text-[#C89E47]' : ''
                          }`}
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
                        </svg>
                      </button>
                    </div>

                    {/* Collapsible Category List */}
                    {mobileCategoryOpen && (
                      <div className='pl-4 pr-3 pb-3 pt-1 space-y-2.5 border-t border-white/5'>
                        <Link
                          to='/products'
                          className='block py-1.5 px-2.5 text-xs font-semibold text-[#C89E47] hover:underline'
                          onClick={() => setMobileOpen(false)}
                        >
                          → View All Products Catalog
                        </Link>

                        {dbCategories.map((cat) => (
                          <div key={cat.slug} className='space-y-1 pl-1 border-l-2 border-[#C89E47]/30'>
                            <NavLink
                              to={`/category/${cat.slug}`}
                              className={({ isActive }) =>
                                `block py-1 px-2.5 rounded-lg text-xs font-medium transition-colors ${
                                  isActive
                                    ? 'text-[#C89E47] font-semibold bg-[#C89E47]/10'
                                    : 'text-[#F5F0E6] hover:text-[#C89E47]'
                                }`
                              }
                              onClick={() => setMobileOpen(false)}
                            >
                              {cat.name}
                            </NavLink>

                            {cat.children && cat.children.length > 0 && (
                              <div className='pl-4 space-y-1'>
                                {cat.children.map((sub) => (
                                  <NavLink
                                    key={sub.slug}
                                    to={`/category/${sub.slug}`}
                                    className={({ isActive }) =>
                                      `block py-0.5 text-[11px] transition-colors ${
                                        isActive
                                          ? 'text-[#C89E47] font-medium'
                                          : 'text-[#A39A8A] hover:text-[#F5F0E6]'
                                      }`
                                    }
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    • {sub.name}
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* About Us */}
                  <NavLink
                    to='/about'
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                        isActive
                          ? 'bg-[#C89E47]/15 text-[#C89E47] border border-[#C89E47]/30'
                          : 'text-[#F5F0E6] hover:text-[#C89E47] hover:bg-white/5'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    About Us
                  </NavLink>

                  {/* Contact Us */}
                  <NavLink
                    to='/contact'
                    className={({ isActive }) =>
                      `flex items-center justify-between py-2.5 px-3.5 rounded-xl text-sm font-medium tracking-wide transition-all ${
                        isActive
                          ? 'bg-[#C89E47]/15 text-[#C89E47] border border-[#C89E47]/30'
                          : 'text-[#F5F0E6] hover:text-[#C89E47] hover:bg-white/5'
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    Contact Us
                  </NavLink>
                </div>

                {/* Mobile CTA */}
                <div className='pt-2 border-t border-white/10'>
                  <Link
                    to='/contact'
                    className='btn-primary w-full text-center py-3 text-xs uppercase tracking-widest font-semibold block'
                    onClick={() => setMobileOpen(false)}
                  >
                    Request a Quote
                  </Link>
                </div>

              </div>
            </MotionDiv>
          )}
        </AnimatePresence>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className='md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-2'>
          <form onSubmit={handleSearchSubmit} className='flex gap-2 mb-3'>
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search products...'
              className='flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400'
            />
            <button type='submit' className='px-3 py-2 bg-gray-900 text-white rounded-lg text-sm'>Go</button>
          </form>

          <Link to='/' className='block py-2 text-sm text-gray-700' onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to='/products' className='block py-2 text-sm text-gray-700' onClick={() => setMobileOpen(false)}>Products</Link>
          {dbCategories.map((cat) => (
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
          <Link to='/contact' className='block mt-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg text-center' onClick={() => setMobileOpen(false)}>
            Get a Quote
          </Link>
        </div>
      )}
    </header>
  )
}

export default Navbar
