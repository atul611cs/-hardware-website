import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts } from '../../api/products.js'

import { getCategories } from '../../api/categories.js'

const Navbar = () => {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const searchRef = useRef(null)
  const inputRef = useRef(null)

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

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false)
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
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleResultClick = (slug) => {
    navigate(`/products/${slug}`)
    setSearchOpen(false)
    setSearchQuery('')
  }

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

          {/* Logo — left side */}
          <Link to='/' className='flex items-center gap-2 shrink-0'>
            <div className='w-8 h-8 bg-gray-900 rounded flex items-center justify-center'>
              <span className='text-white text-xs font-bold'>HW</span>
            </div>
            <span className='font-semibold text-gray-900 text-lg'>Hardware Co.</span>
          </Link>

          {/* Right side — nav + search + CTA */}
          <div className='hidden md:flex items-center gap-1'>

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

            {/* Divider */}
            <div className='w-px h-5 bg-gray-200 mx-2'></div>

            {/* Search */}
            <div ref={searchRef} className='relative'>
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className='flex items-center'>
                  <input
                    ref={inputRef}
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search products...'
                    className='w-56 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-gray-400 transition'
                  />
                  <button type='button' onClick={() => { setSearchOpen(false); setSearchQuery('') }} className='ml-2 text-gray-400 hover:text-gray-900 transition'>
                    <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
                    </svg>
                  </button>
                </form>
              ) : (
                <button onClick={() => setSearchOpen(true)} className='p-2 text-gray-500 hover:text-gray-900 transition'>
                  <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
                  </svg>
                </button>
              )}

              {/* Search results dropdown */}
              {searchOpen && searchQuery.length > 1 && (
                <div className='absolute top-full right-0 mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden'>
                  {isFetching ? (
                    <div className='p-4 text-sm text-gray-400 text-center'>Searching...</div>
                  ) : results.length === 0 ? (
                    <div className='p-4 text-sm text-gray-400 text-center'>No products found</div>
                  ) : (
                    <>
                      <div className='px-4 py-2 border-b border-gray-50'>
                        <p className='text-xs text-gray-400'>{results.length} results for "{searchQuery}"</p>
                      </div>
                      {results.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => handleResultClick(product.slug)}
                          className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left'
                        >
                          <div className='w-10 h-10 bg-gray-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center'>
                            {product.images?.[0] ? (
                              <img src={product.images[0].url} alt={product.name} className='w-full h-full object-cover' />
                            ) : (
                              <span className='text-gray-300 text-xs'>HW</span>
                            )}
                          </div>
                          <div>
                            <p className='text-sm font-medium text-gray-900'>{product.name}</p>
                            <p className='text-xs text-gray-400'>{product.category?.name} · {product.sku}</p>
                          </div>
                        </button>
                      ))}
                      <div className='px-4 py-2 border-t border-gray-50'>
                        <button onClick={handleSearchSubmit} className='text-xs text-gray-500 hover:text-gray-900 transition'>
                          See all results for "{searchQuery}"
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* CTA */}
            <Link to='/contact' className='ml-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition'>
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className='md:hidden p-2 text-gray-600' onClick={() => setMobileOpen(!mobileOpen)}>
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