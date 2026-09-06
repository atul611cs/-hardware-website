import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'
import { getProductBySlug } from '../api/products.js'
import { submitInquiry } from '../api/inquiry.js'

const ProductDetail = () => {
  const { slug } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [inquirySent, setInquirySent] = useState(false)
  const [sending, setSending] = useState(false)
  const [showBar, setShowBar] = useState(false)
  const heroRef = useRef(null)

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
    <div className='bg-[#121212] text-[#F3F4F6] min-h-screen pb-28 sm:pb-32 selection:bg-[#d97706]/30'>
      <div ref={heroRef} className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16'>
        
        {/* Breadcrumb Navigation */}
        <nav className='flex flex-wrap items-center gap-2 text-xs text-[#9CA3AF] mb-8 sm:mb-12 font-medium'>
          <Link to='/' className='hover:text-[#d97706] transition-colors duration-300'>Home</Link>
          <span className='text-white/30'>/</span>
          <Link to='/products' className='hover:text-[#d97706] transition-colors duration-300'>Products</Link>
          <span className='text-white/30'>/</span>
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
          <span className='text-[#d97706] truncate max-w-[200px] sm:max-w-none'>{product.name}</span>
        </nav>

        {/* 2-Column Responsive Layout: Vertical on Mobile, Split 2-Col on Desktop */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start'>
          
          {/* Column 1: Image Showcase (Mobile on Top, Desktop Left) */}
          <div className='w-full lg:col-span-7 flex flex-col'>
            {/* MANDATORY EXACT SPOTLIGHT CONTAINER STRUCTURE */}
            <div className='relative w-full flex items-center justify-center bg-white/5 backdrop-blur-xl border border-[#d97706]/30 rounded-3xl md:rounded-[2.5rem] overflow-hidden group hover:border-[#d97706] hover:shadow-[0_0_35px_rgba(217,119,6,0.25)] transition-all duration-500 min-h-[320px] sm:min-h-[440px] md:min-h-[540px] p-6 sm:p-10 md:p-14 shadow-[0_20px_50px_rgba(0,0,0,0.85)]'>
              {/* Radial Spotlight Ambient Background */}
              <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(217,119,6,0.38)_0%,rgba(217,119,6,0.06)_40%,transparent_70%)] z-0'></div>
              <div className='absolute -bottom-20 -left-20 w-64 h-64 bg-[#d97706]/15 rounded-full blur-3xl pointer-events-none' />

              {/* Hardware Image */}
              {product.images?.length > 0 ? (
                <img
                  src={product.images[activeImage]?.url}
                  alt={product.name}
                  className='relative z-10 w-full h-full max-h-[300px] sm:max-h-[420px] md:max-h-[460px] object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-out group-hover:scale-105'
                />
              ) : (
                <div className='relative z-10 text-[#9CA3AF] text-sm font-mono bg-white/5 px-4 py-2 rounded-xl border border-white/10'>
                  No image available
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {product.images?.length > 1 && (
              <div className='flex gap-3 sm:gap-4 mt-5 overflow-x-auto pb-2 scrollbar-none'>
                {product.images.map((img, i) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImage(i)}
                    className={`w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border p-2 transition-all duration-300 shrink-0 bg-black/60 backdrop-blur-md ${
                      activeImage === i
                        ? 'border-[#d97706] shadow-[0_0_20px_rgba(217,119,6,0.4)] scale-105 bg-[#d97706]/10'
                        : 'border-white/10 hover:border-[#d97706]/50 opacity-70 hover:opacity-100'
                    }`}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img.url} alt='' className='w-full h-full object-contain' />
                  </button>
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

            {/* Available Finishes */}
            {product.finishes?.length > 0 && (
              <div className='mb-8'>
                <span className='text-xs font-semibold uppercase tracking-widest text-[#d97706] mb-3 block'>
                  Available Finishes
                </span>
                <div className='flex flex-wrap gap-2'>
                  {product.finishes.map((finish) => (
                    <span
                      key={finish.id}
                      className='px-4 py-2 bg-white/5 border border-[#d97706]/30 text-[#F3F4F6] text-xs font-medium rounded-full shadow-[0_0_12px_rgba(217,119,6,0.1)] hover:border-[#d97706] transition-all duration-300'
                    >
                      {finish.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Inquiry Action Buttons */}
            {inquirySent ? (
              <div className='glass-panel rounded-2xl p-6 text-center bg-[#d97706]/15 border border-[#d97706]/60 shadow-[0_0_25px_rgba(217,119,6,0.25)]'>
                <div className='w-10 h-10 rounded-full bg-[#d97706]/20 flex items-center justify-center mx-auto mb-3 text-[#d97706] font-bold'>
                  ✓
                </div>
                <h4 className='font-display font-semibold text-[#F3F4F6] text-base mb-1'>Inquiry Received</h4>
                <p className='text-xs text-[#9CA3AF] leading-relaxed'>
                  Our export team will contact you within 24 hours with custom pricing.
                </p>
              </div>
            ) : (
              <div className='flex flex-col sm:flex-row gap-3.5 pt-2'>
                <button
                  onClick={handleInquiry}
                  disabled={sending}
                  className='btn-primary flex-1 !py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:scale-[1.03] transition-all duration-500 ease-out shadow-[0_0_25px_rgba(217,119,6,0.4)] disabled:opacity-50'
                >
                  {sending ? 'Sending Inquiry...' : 'Request a Quote'}
                </button>
                <Link
                  to='/contact'
                  className='btn-ghost flex-1 text-center !py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-wider hover:scale-[1.03] transition-all duration-500 ease-out'
                >
                  Contact Us Directly
                </Link>
              </div>
            )}

          </div>
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
