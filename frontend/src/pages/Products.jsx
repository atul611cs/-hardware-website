import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { getProducts } from '../api/products.js'
import { getCategories } from '../api/categories.js'

const finishes = ['Zinc', 'Powder Coating/ Black', 'Self colour', 'Chrome', 'E.brass']

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

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  const category = searchParams.get('category') || ''
  const finish = searchParams.get('finish') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', { category, finish, page, search }],
    queryFn: () => getProducts({ category, finish, page, limit: 20, search }),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page')
    setSearchParams(params)
    setMobileFilterOpen(false)
  }

  const clearFilters = () => {
    setSearchParams({})
    setMobileFilterOpen(false)
  }

  const products = productsData?.data || []
  const pagination = productsData?.pagination || {}
  const categories = categoriesData?.data || []

  return (
    <div className='bg-[#121212] text-[#F3F4F6] min-h-screen py-12 md:py-20 selection:bg-[#d97706]/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Header Title Section */}
        <div className='mb-10 md:mb-14'>
          <span className='text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-3 block'>
            Architectural Catalog
          </span>
          <div className='flex flex-col md:flex-row md:items-end justify-between gap-4'>
            <div>
              <h1 className='font-display text-4xl sm:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]'>
                All Products
              </h1>
              <p className='text-[#9CA3AF] text-base sm:text-lg mt-2 font-light'>
                {search
                  ? `Search results for "${search}"`
                  : pagination.total
                  ? `${pagination.total} products available`
                  : 'Browse our full catalog'}
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <div className='flex items-center gap-3 md:hidden'>
              <button
                onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                className='flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white/5 border border-[#d97706]/40 text-xs font-semibold uppercase tracking-wider text-[#F3F4F6]'
              >
                <svg className='w-4 h-4 text-[#d97706]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z' />
                </svg>
                <span>Filters {(category || finish || search) && '• Active'}</span>
              </button>

              {(category || finish || search) && (
                <button
                  onClick={clearFilters}
                  className='py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-[#d97706]'
                >
                  Reset
                </button>
              )}
            </div>
          </div>

          {search && (
            <div className='mt-4 flex items-center gap-2'>
              <span className='text-xs text-[#9CA3AF]'>Filtered by keyword:</span>
              <span className='px-3 py-1 rounded-full bg-[#d97706]/20 border border-[#d97706]/40 text-xs text-[#F3F4F6] font-medium'>
                "{search}"
              </span>
              <button
                onClick={clearFilters}
                className='text-xs text-[#d97706] hover:text-white transition-colors underline ml-2'
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Mobile Filters Modal / Accordion */}
        <AnimatePresence>
          {mobileFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className='md:hidden overflow-hidden mb-8 rounded-2xl bg-white/5 backdrop-blur-xl border border-[#d97706]/30 p-6 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            >
              <div className='flex items-center justify-between pb-4 border-b border-white/10 mb-6'>
                <h3 className='font-display font-semibold text-[#F3F4F6] text-sm uppercase tracking-wider'>
                  Catalog Filters
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className='text-xs text-[#9CA3AF] hover:text-white'
                >
                  Close
                </button>
              </div>

              {/* Mobile Category List */}
              <div className='mb-6'>
                <h4 className='text-xs font-semibold text-[#d97706] uppercase tracking-widest mb-3'>
                  Category
                </h4>
                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => setFilter('category', '')}
                    className={`text-xs px-3 py-2 rounded-xl transition-all ${
                      !category
                        ? 'bg-[#d97706] text-white font-medium shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                        : 'bg-white/5 text-[#9CA3AF] border border-white/10'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFilter('category', cat.slug)}
                      className={`text-xs px-3 py-2 rounded-xl transition-all ${
                        category === cat.slug
                          ? 'bg-[#d97706] text-white font-medium shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                          : 'bg-white/5 text-[#9CA3AF] border border-white/10'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Finish List */}
              <div>
                <h4 className='text-xs font-semibold text-[#d97706] uppercase tracking-widest mb-3'>
                  Finish
                </h4>
                <div className='flex flex-wrap gap-2'>
                  <button
                    onClick={() => setFilter('finish', '')}
                    className={`text-xs px-3 py-2 rounded-xl transition-all ${
                      !finish
                        ? 'bg-[#d97706] text-white font-medium shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                        : 'bg-white/5 text-[#9CA3AF] border border-white/10'
                    }`}
                  >
                    All Finishes
                  </button>
                  {finishes.map((fin) => (
                    <button
                      key={fin}
                      onClick={() => setFilter('finish', fin)}
                      className={`text-xs px-3 py-2 rounded-xl transition-all ${
                        finish === fin
                          ? 'bg-[#d97706] text-white font-medium shadow-[0_0_12px_rgba(217,119,6,0.3)]'
                          : 'bg-white/5 text-[#9CA3AF] border border-white/10'
                      }`}
                    >
                      {fin}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Layout with Sidebar & Product Grid */}
        <div className='flex flex-col md:flex-row gap-8 lg:gap-12'>
          
          {/* Desktop Filters Sidebar */}
          <aside className='hidden md:block md:w-64 lg:w-72 shrink-0'>
            <div className='sticky top-28 bg-white/5 backdrop-blur-xl border border-[#d97706]/30 rounded-3xl p-6 lg:p-7 shadow-[0_15px_35px_rgba(0,0,0,0.6)]'>
              <div className='flex items-center justify-between mb-6 border-b border-white/10 pb-4'>
                <h3 className='font-display font-semibold text-[#F3F4F6] text-sm uppercase tracking-wider'>
                  Filters
                </h3>
                {(category || finish || search) && (
                  <button
                    onClick={clearFilters}
                    className='text-xs text-[#d97706] hover:text-white transition-colors duration-300 font-medium'
                  >
                    Reset all
                  </button>
                )}
              </div>

              {/* Categories Filter */}
              <div className='mb-8'>
                <h4 className='text-xs font-semibold text-[#d97706] uppercase tracking-widest mb-3'>
                  Categories
                </h4>
                <ul className='space-y-1.5'>
                  <li>
                    <button
                      onClick={() => setFilter('category', '')}
                      className={`text-xs sm:text-sm w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between ${
                        !category
                          ? 'text-[#F3F4F6] font-medium bg-[#d97706]/20 border border-[#d97706]/50 shadow-[0_0_15px_rgba(217,119,6,0.25)]'
                          : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                      }`}
                    >
                      <span>All Categories</span>
                      {!category && <span className='w-1.5 h-1.5 rounded-full bg-[#d97706]'></span>}
                    </button>
                  </li>
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <button
                        onClick={() => setFilter('category', cat.slug)}
                        className={`text-xs sm:text-sm w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between ${
                          category === cat.slug
                            ? 'text-[#F3F4F6] font-medium bg-[#d97706]/20 border border-[#d97706]/50 shadow-[0_0_15px_rgba(217,119,6,0.25)]'
                            : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                        }`}
                      >
                        <span className='truncate'>{cat.name}</span>
                        {category === cat.slug && <span className='w-1.5 h-1.5 rounded-full bg-[#d97706]'></span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Finishes Filter */}
              <div>
                <h4 className='text-xs font-semibold text-[#d97706] uppercase tracking-widest mb-3'>
                  Finishes
                </h4>
                <ul className='space-y-1.5'>
                  <li>
                    <button
                      onClick={() => setFilter('finish', '')}
                      className={`text-xs sm:text-sm w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between ${
                        !finish
                          ? 'text-[#F3F4F6] font-medium bg-[#d97706]/20 border border-[#d97706]/50 shadow-[0_0_15px_rgba(217,119,6,0.25)]'
                          : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                      }`}
                    >
                      <span>All Finishes</span>
                      {!finish && <span className='w-1.5 h-1.5 rounded-full bg-[#d97706]'></span>}
                    </button>
                  </li>
                  {finishes.map((fin) => (
                    <li key={fin}>
                      <button
                        onClick={() => setFilter('finish', fin)}
                        className={`text-xs sm:text-sm w-full text-left px-3.5 py-2.5 rounded-xl transition-all duration-300 flex items-center justify-between ${
                          finish === fin
                            ? 'text-[#F3F4F6] font-medium bg-[#d97706]/20 border border-[#d97706]/50 shadow-[0_0_15px_rgba(217,119,6,0.25)]'
                            : 'text-[#9CA3AF] hover:text-[#F3F4F6] hover:bg-white/5'
                        }`}
                      >
                        <span className='truncate'>{fin}</span>
                        {finish === fin && <span className='w-1.5 h-1.5 rounded-full bg-[#d97706]'></span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product Grid & Pagination Area */}
          <div className='flex-1 min-w-0'>
            {productsLoading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8'>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className='bg-white/5 border border-white/10 rounded-3xl h-80 animate-pulse' />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className='text-center py-20 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)]'>
                <div className='w-16 h-16 rounded-full bg-[#d97706]/10 border border-[#d97706]/30 flex items-center justify-center mx-auto mb-4 text-[#d97706]'>
                  <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                </div>
                <p className='text-[#F3F4F6] font-display text-xl font-semibold mb-2'>
                  {search ? `No products match "${search}"` : 'No products found'}
                </p>
                <p className='text-[#9CA3AF] text-sm mb-6 max-w-sm mx-auto font-light'>
                  Try refining your search terms or resetting your category and finish filters.
                </p>
                <button
                  onClick={clearFilters}
                  className='btn-primary !px-6 !py-2.5 text-xs font-semibold uppercase tracking-wider'
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                {/* Responsive Grid matching requirement */}
                <motion.div
                  variants={containerVariants}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, margin: '-50px' }}
                  className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8'
                >
                  {products.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      viewport={{ once: true, margin: '-50px' }}
                      className='h-full'
                    >
                      <Link
                        to={`/products/${product.slug}`}
                        className='product-card group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-3xl overflow-hidden hover:border-[#d97706] hover:shadow-[0_0_30px_rgba(217,119,6,0.2)] hover:scale-[1.02] transition-all duration-500 ease-out'
                      >
                        {/* Product Image Spotlight Box (MANDATORY STRUCTURE) */}
                        <div className='relative w-full aspect-square min-h-[220px] flex items-center justify-center bg-black/40 overflow-hidden p-6'>
                          {/* Radial Spotlight Background */}
                          <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.35)_0%,rgba(217,119,6,0.05)_40%,transparent_70%)] z-0'></div>
                          
                          {/* Hardware Image */}
                          {product.images?.[0] ? (
                            <img
                              src={product.images[0].url}
                              alt={product.name}
                              className='relative z-10 object-contain w-full h-full max-h-[210px] drop-shadow-[0_15px_20px_rgba(0,0,0,0.85)] group-hover:scale-108 transition-transform duration-500 ease-out'
                            />
                          ) : (
                            <div className='relative z-10 text-[#9CA3AF] text-xs font-mono bg-white/5 px-3 py-1.5 rounded-lg border border-white/10'>
                              No image
                            </div>
                          )}
                        </div>

                        {/* Product Card Text Details */}
                        <div className='p-6 flex flex-col flex-1 justify-between bg-white/[0.02]'>
                          <div>
                            <p className='text-xs uppercase tracking-widest text-[#d97706] font-semibold mb-2'>
                              {product.category?.name || 'Architectural Hardware'}
                            </p>
                            <h3 className='font-display text-lg sm:text-xl font-semibold text-[#F3F4F6] group-hover:text-[#d97706] transition-colors duration-300 leading-snug line-clamp-2'>
                              {product.name}
                            </h3>
                          </div>

                          <div className='mt-5 pt-3.5 border-t border-white/5 flex items-center justify-between'>
                            {product.sku ? (
                              <span className='text-xs text-[#9CA3AF] font-mono tracking-wider'>
                                SKU: {product.sku}
                              </span>
                            ) : (
                              <span className='text-xs text-[#9CA3AF] font-light'>
                                Export Quality
                              </span>
                            )}
                            <span className='w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#9CA3AF] group-hover:text-[#d97706] group-hover:border-[#d97706]/40 group-hover:bg-[#d97706]/10 group-hover:translate-x-0.5 transition-all duration-300'>
                              <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Pagination Controls */}
                {pagination.pages > 1 && (
                  <div className='flex items-center justify-center gap-2 mt-14 pt-8 border-t border-white/5'>
                    {[...Array(pagination.pages)].map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setFilter('page', String(i + 1))}
                        className={`w-10 h-10 rounded-full text-xs font-semibold transition-all duration-300 ${
                          page === i + 1
                            ? 'bg-[#d97706] text-white shadow-[0_0_18px_rgba(217,119,6,0.45)] scale-105'
                            : 'bg-white/5 border border-[#d97706]/30 text-[#9CA3AF] hover:text-[#F3F4F6] hover:border-[#d97706] hover:bg-white/10'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default Products
