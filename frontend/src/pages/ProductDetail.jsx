import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { getProductBySlug } from '../api/products.js'
import { submitInquiry } from '../api/inquiry.js'

const ProductDetail = () => {
  const { slug } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [activeSize, setActiveSize] = useState(null)
  const [inquirySent, setInquirySent] = useState(false)
  const [sending, setSending] = useState(false)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  })

  const product = data?.data

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setShowBar(!entry.isIntersecting),
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [product])

  const handleInquiry = async () => {
    setSending(true)
    try {
      await submitInquiry({
        name: 'Website Visitor',
        email: 'inquiry@website.com',
        items: [{ productId: product.id, quantity: 1, notes: '' }],
        message: `Inquiry for ${product.name}`,
      })
      setInquirySent(true)
    } catch (_err) {
      alert('Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  if (isLoading) {
    return (
      <div className='bg-[#121212] min-h-screen text-[#F3F4F6] py-14 md:py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-6 bg-white/5 border border-white/10 rounded w-1/4 mb-10 animate-pulse'></div>
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16'>
            <div className='lg:col-span-7 bg-white/5 border border-white/10 rounded-3xl h-[28rem] sm:h-[34rem] animate-pulse'></div>
            <div className='lg:col-span-5 space-y-6'>
              <div className='h-8 bg-white/5 border border-white/10 rounded-xl animate-pulse w-3/4'></div>
              <div className='h-4 bg-white/5 border border-white/10 rounded-lg animate-pulse w-1/3'></div>
              <div className='h-32 bg-white/5 border border-white/10 rounded-2xl animate-pulse'></div>
              <div className='h-12 bg-white/5 border border-white/10 rounded-xl animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className='bg-[#121212] min-h-screen text-[#F3F4F6] flex items-center justify-center p-4'>
        <div className='max-w-md w-full mx-auto text-center bg-white/5 backdrop-blur-xl border border-[#d97706]/30 rounded-3xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]'>
          <div className='w-14 h-14 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/30 flex items-center justify-center mx-auto mb-5 text-[#d97706]'>
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          </div>
          <h2 className='font-display text-2xl font-semibold text-[#F3F4F6] mb-3'>Product not found</h2>
          <p className='text-[#9CA3AF] text-sm mb-6 leading-relaxed font-light'>
            This product may have been discontinued or the catalog link is incorrect.
          </p>
          <Link to='/products' className='btn-primary w-full text-xs font-semibold uppercase tracking-wider py-3'>
            Browse all products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-16'>
      {/* Breadcrumb */}
      <nav className='flex gap-2 text-sm text-gray-400 mb-8'>
        <Link to='/' className='hover:text-gray-900 transition'>Home</Link>
        <span>/</span>
        <Link to='/products' className='hover:text-gray-900 transition'>Products</Link>
        <span>/</span>
        {product.category && (
          <>
            <Link to={`/category/${product.category.slug}`} className='hover:text-gray-900 transition'>{product.category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className='text-gray-600'>{product.name}</span>
      </nav>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
        {/* Images */}
        <div>
          <div className='bg-gray-50 rounded-xl h-96 flex items-center justify-center mb-4 overflow-hidden'>
            {product.images?.length > 0 ? (
              <img src={product.images[activeImage]?.url} alt={product.name} className='w-full h-full object-contain' />
            ) : (
              <div className='text-gray-300 text-sm'>No image available</div>
            )}
          </div>
          {product.images?.length > 1 && (
            <div className='flex gap-2'>
              {product.images.map((img, i) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition ${activeImage === i ? 'border-gray-900' : 'border-transparent'}`}
                >
                  <img src={img.url} alt='' className='w-full h-full object-cover' />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          {/* 1. Category */}
          {product.category && (
            <>
              <Link
                to={`/category/${product.category.slug}`}
                className='hover:text-[#d97706] transition-colors duration-300'
              >
                {product.category.name}
              </Link>
              <span className='text-white/30'>/</span>
            </>
          )}
          {/* 2. Product Name */}
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>{product.name}</h1>
          {/* 3. SKU */}
          {product.sku && <p className='text-sm text-gray-400 mb-4'>SKU: {product.sku}</p>}

          {/* 4. Finishes */}
          {product.finishes?.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-900 mb-2'>Available Finishes</h3>
              <div className='flex flex-wrap gap-2'>
                {product.finishes.map((finish) => (
                  <span key={finish.id} className='px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'>{finish.name}</span>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Product Details (Mobile Bottom, Desktop Right) */}
          <div className='w-full lg:col-span-5 flex flex-col justify-start lg:pt-2'>
            
            {/* Category Subheading */}
            {product.category && (
              <Link
                to={`/category/${product.category.slug}`}
                className='text-xs font-semibold uppercase tracking-widest text-[#d97706] hover:text-white transition-colors duration-300 mb-3 inline-block'
              >
                {product.category.name}
              </Link>
            )}

            {/* Product Title */}
            <h1 className='font-display text-3xl sm:text-4xl md:text-[2.75rem] font-semibold text-[#F3F4F6] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF] mb-4 leading-tight'>
              {product.name}
            </h1>

            {/* SKU Badge */}
            {product.sku && (
              <div className='mb-6'>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-[#9CA3AF]'>
                  <span className='w-1.5 h-1.5 rounded-full bg-[#d97706]'></span>
                  SKU: {product.sku}
                </span>
              </div>
            )}

            {/* Product Description */}
            {product.description && (
              <div className='mb-8 pb-6 border-b border-white/10'>
                <p className='text-[#9CA3AF] text-base sm:text-lg leading-relaxed font-light'>
                  {product.description}
                </p>
              </div>
            )}

          {/* General Specifications */}
          {(() => {
            const generalSpecs = product.specs?.filter(s => !s.size) || [];
            if (generalSpecs.length === 0) return null;
            return (
              <div className='mb-6'>
                <h3 className='text-sm font-semibold text-gray-900 mb-3'>General Specifications</h3>
                <div className='overflow-hidden'>
                  <table className='w-full text-sm text-left bg-transparent'>
                    <tbody className='divide-y divide-gray-100'>
                      {generalSpecs.map((spec) => (
                        <tr key={spec.id} className='hover:bg-gray-50/50 transition'>
                          <td className='py-2.5 pr-4 font-bold text-gray-900 w-1/3'>{spec.key}</td>
                          <td className='py-2.5 px-4 text-gray-600'>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* Sizes */}
          {(() => {
            const sizes = product.specs ? Array.from(new Set(product.specs.filter(s => s.size).map(s => s.size))) : [];
            if (sizes.length === 0) return null;
            
            const currentSize = activeSize && sizes.includes(activeSize) ? activeSize : sizes[0];
            
            return (
              <div className='mb-6'>
                <h3 className='text-sm font-semibold text-gray-900 mb-2'>Sizes</h3>
                <div className='flex flex-wrap gap-2'>
                  {sizes.map((size) => (
                    <button 
                      key={size} 
                      onClick={() => setActiveSize(size)}
                      className={`px-4 py-2 text-sm rounded-lg border transition font-medium ${
                        currentSize === size 
                          ? 'border-gray-900 bg-gray-900 text-white' 
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Size-specific Specifications */}
          {(() => {
            const sizes = product.specs ? Array.from(new Set(product.specs.filter(s => s.size).map(s => s.size))) : [];
            const currentSize = activeSize && sizes.includes(activeSize) ? activeSize : (sizes.length > 0 ? sizes[0] : null);
            
            const sizeSpecs = product.specs?.filter(s => s.size === currentSize) || [];
            if (sizeSpecs.length === 0) return null;
            
            return (
              <div className='mb-6'>
                <h3 className='text-sm font-semibold text-gray-900 mb-3'>{currentSize} Specifications</h3>
                <div className='overflow-hidden'>
                  <table className='w-full text-sm text-left bg-transparent'>
                    <tbody className='divide-y divide-gray-100'>
                      {sizeSpecs.map((spec) => (
                        <tr key={spec.id} className='hover:bg-gray-50/50 transition'>
                          <td className='py-2.5 pr-4 font-bold text-gray-900 w-1/3'>{spec.key}</td>
                          <td className='py-2.5 px-4 text-gray-600'>{spec.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })()}

          {/* 7. Description */}
          {product.description && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-900 mb-2'>Description</h3>
              <p className='text-gray-600 leading-relaxed'>{product.description}</p>
            </div>
          )}

          {/* Inquiry */}
          {inquirySent ? (
            <div className='bg-green-50 border border-green-200 rounded-xl p-4 text-center'>
              <p className='text-sm font-medium text-green-800'>Inquiry sent! We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className='space-y-3'>
              <button onClick={handleInquiry} disabled={sending} className='w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50'>
                {sending ? 'Sending...' : 'Request a Quote'}
              </button>
              <Link to='/contact' className='w-full py-3 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition text-center block'>
                Contact Us Directly
              </Link>
            </div>
          )}
        </div>

        {/* Specifications Section */}
        {product.specs?.length > 0 && (
          <section className='mt-20 md:mt-28 border-t border-white/10 pt-16 md:pt-20'>
            <div className='mb-10'>
              <span className='text-xs font-semibold tracking-widest uppercase text-[#d97706] mb-3 block'>
                Engineering Metrics
              </span>
              <h3 className='font-display text-2xl sm:text-3xl md:text-4xl font-semibold text-[#F3F4F6] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#F3F4F6] via-[#E5E7EB] to-[#9CA3AF]'>
                Technical Specifications
              </h3>
            </div>

            {/* Specifications Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
              {product.specs.map((spec) => (
                <div
                  key={spec.id}
                  className='bento-cell bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl md:rounded-3xl p-6 sm:p-7 hover:border-[#d97706] hover:shadow-[0_0_24px_rgba(217,119,6,0.2)] hover:scale-[1.02] transition-all duration-500 ease-out flex flex-col justify-between'
                >
                  <p className='text-xs text-[#9CA3AF] uppercase tracking-widest font-medium mb-2'>
                    {spec.key}
                  </p>
                  <p className='font-display text-lg sm:text-xl text-[#F3F4F6] font-semibold tracking-tight'>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Floating Bottom Sticky Bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className='fixed bottom-0 inset-x-0 z-40 bg-[#121212]/95 backdrop-blur-2xl border-t border-[#d97706]/30 shadow-[0_-10px_35px_rgba(0,0,0,0.85)]'
          >
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4'>
              <div className='min-w-0'>
                <p className='font-display font-semibold text-sm sm:text-base text-[#F3F4F6] truncate'>
                  {product.name}
                </p>
                {product.sku && (
                  <p className='text-xs text-[#9CA3AF] truncate font-mono'>
                    SKU: {product.sku}
                  </p>
                )}
              </div>

              <div>
                {inquirySent ? (
                  <span className='text-xs sm:text-sm text-[#d97706] font-semibold tracking-wider uppercase px-4 py-2 rounded-full bg-[#d97706]/10 border border-[#d97706]/30'>
                    Inquiry Sent ✓
                  </span>
                ) : (
                  <button
                    onClick={handleInquiry}
                    disabled={sending}
                    className='btn-primary shrink-0 !px-6 !py-2.5 text-xs font-semibold uppercase tracking-wider disabled:opacity-50 hover:scale-[1.03] transition-all duration-500 ease-out'
                  >
                    {sending ? 'Sending...' : 'Request Quote'}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ProductDetail
