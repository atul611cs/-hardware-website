import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { getCategoryBySlug } from '../api/categories.js'

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

const Category = () => {
  const { slug } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ['category', slug],
    queryFn: () => getCategoryBySlug(slug),
  })

  const category = data?.data
  const products = category?.products || []

  if (isLoading) {
    return (
      <div className='bg-[#121212] min-h-screen text-[#F3F4F6] py-14 md:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-6 bg-white/5 border border-white/10 rounded w-1/4 mb-6 animate-pulse'></div>
          <div className='h-12 bg-white/5 border border-white/10 rounded-2xl w-1/2 mb-12 animate-pulse'></div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'>
            {[...Array(8)].map((_, i) => (
              <div key={i} className='bg-white/5 border border-white/10 rounded-3xl h-80 animate-pulse'></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isError || !category) {
    return (
      <div className='bg-[#121212] min-h-screen text-[#F3F4F6] flex items-center justify-center p-4'>
        <div className='max-w-md w-full mx-auto text-center bg-white/5 backdrop-blur-xl border border-[#d97706]/30 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'>
          <div className='w-14 h-14 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/30 flex items-center justify-center mx-auto mb-5 text-[#d97706]'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          </div>
          <h2 className='font-display text-2xl font-semibold text-[#F3F4F6] mb-3'>Category not found</h2>
          <p className='text-[#9CA3AF] text-sm mb-6 leading-relaxed font-light'>
            This category may have been moved or the requested catalog link is invalid.
          </p>
          <Link to='/products' className='btn-primary w-full text-xs font-semibold uppercase tracking-wider py-3'>
            Browse all products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#121212] text-[#F3F4F6] min-h-screen py-12 md:py-20 selection:bg-[#d97706]/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Breadcrumb Navigation */}
        <nav className='flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-8 sm:mb-10 font-medium'>
          <Link to='/' className='hover:text-[#d97706] transition-colors duration-300'>Home</Link>
          <span className='text-white/30'>/</span>
          <Link to='/products' className='hover:text-[#d97706] transition-colors duration-300'>Products</Link>
          <span className='text-white/30'>/</span>
          <span className='text-[#d97706]'>{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className='mb-10 md:mb-14 max-w-3xl'>
          <span className='text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-3 block'>
            Category Portfolio
          </span>
          <h1 className='font-display text-4xl sm:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF] mb-4'>
            {category.name}
          </h1>
          {category.description && (
            <p className='text-[#9CA3AF] text-base sm:text-lg leading-relaxed font-light mb-4'>
              {category.description}
            </p>
          )}
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d97706]/10 border border-[#d97706]/30 text-xs font-semibold text-[#d97706] uppercase tracking-widest'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#d97706]'></span>
            {products.length} {products.length === 1 ? 'Product' : 'Products'} Listed
          </span>
        </div>

        {/* Subcategories Filter Pills */}
        {category.children?.length > 0 && (
          <div className='mb-10 sm:mb-12'>
            <span className='text-xs font-semibold text-[#9CA3AF] uppercase tracking-widest block mb-3'>
              Sub-categories
            </span>
            <div className='flex flex-wrap gap-2.5'>
              {category.children.map((child) => (
                <Link
                  key={child.id}
                  to={`/category/${child.slug}`}
                  className='px-4 py-2 border border-[#d97706]/30 bg-white/5 backdrop-blur-md rounded-full text-xs font-medium text-[#9CA3AF] hover:border-[#d97706] hover:text-[#F3F4F6] hover:bg-[#d97706]/15 hover:shadow-[0_0_15px_rgba(217,119,6,0.2)] hover:scale-[1.03] transition-all duration-300 ease-premium'
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className='text-center py-20 px-6 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.5)]'>
            <div className='w-16 h-16 rounded-full bg-[#d97706]/10 border border-[#d97706]/30 flex items-center justify-center mx-auto mb-4 text-[#d97706]'>
              <svg className='w-8 h-8' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4' />
              </svg>
            </div>
            <p className='text-[#F3F4F6] font-display text-xl font-semibold mb-2'>
              No products in this category yet
            </p>
            <p className='text-[#9CA3AF] text-sm mb-6 max-w-sm mx-auto font-light'>
              Check back soon or explore our complete hardware catalog.
            </p>
            <Link
              to='/products'
              className='btn-primary inline-flex !px-6 !py-2.5 text-xs font-semibold uppercase tracking-wider'
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8'
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
                        {category.name}
                      </p>
                      <h3 className='font-display text-lg font-semibold text-[#F3F4F6] group-hover:text-[#d97706] transition-colors duration-300 leading-snug line-clamp-2'>
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
        )}
      </div>
    </div>
  )
}

export default Category
