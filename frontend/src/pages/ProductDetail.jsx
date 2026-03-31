import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProductBySlug } from '../api/products.js'
import { submitInquiry } from '../api/inquiry.js'

const ProductDetail = () => {
  const { slug } = useParams()
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [inquirySent, setInquirySent] = useState(false)
  const [sending, setSending] = useState(false)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product', slug],
    queryFn: () => getProductBySlug(slug),
  })

  const product = data?.data

  const handleInquiry = async () => {
    setSending(true)
    try {
      await submitInquiry({
        name: 'Website Visitor',
        email: 'inquiry@website.com',
        items: [{ productId: product.id, quantity }],
        message: `Inquiry for ${product.name} — Qty: ${quantity}`,
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
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
          <div className='bg-gray-100 rounded-xl h-96 animate-pulse'></div>
          <div className='space-y-4'>
            <div className='h-8 bg-gray-100 rounded animate-pulse w-3/4'></div>
            <div className='h-4 bg-gray-100 rounded animate-pulse w-1/2'></div>
            <div className='h-24 bg-gray-100 rounded animate-pulse'></div>
          </div>
        </div>
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-16 text-center'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>Product not found</h2>
        <p className='text-gray-500 mb-6'>This product may have been removed or the link is incorrect.</p>
        <Link to='/products' className='px-4 py-2 bg-gray-900 text-white rounded-lg text-sm'>Browse all products</Link>
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
          {product.category && (
            <Link to={`/category/${product.category.slug}`} className='text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition mb-2 block'>
              {product.category.name}
            </Link>
          )}
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>{product.name}</h1>
          {product.sku && <p className='text-sm text-gray-400 mb-4'>SKU: {product.sku}</p>}

          {product.description && (
            <p className='text-gray-600 leading-relaxed mb-6'>{product.description}</p>
          )}

          {/* Finishes */}
          {product.finishes?.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-900 mb-2'>Available Finishes</h3>
              <div className='flex flex-wrap gap-2'>
                {product.finishes.map((finish) => (
                  <span key={finish.id} className='px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full'>{finish.name}</span>
                ))}
              </div>
            </div>
          )}

          {/* Specs */}
          {product.specs?.length > 0 && (
            <div className='mb-6'>
              <h3 className='text-sm font-semibold text-gray-900 mb-2'>Specifications</h3>
              <table className='w-full text-sm'>
                <tbody>
                  {product.specs.map((spec) => (
                    <tr key={spec.id} className='border-b border-gray-100'>
                      <td className='py-2 text-gray-500 w-1/2'>{spec.key}</td>
                      <td className='py-2 text-gray-900 font-medium'>{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Quantity and inquiry */}
          {inquirySent ? (
            <div className='bg-green-50 border border-green-200 rounded-xl p-4 text-center'>
              <p className='text-sm font-medium text-green-800'>Inquiry sent! We will get back to you within 24 hours.</p>
            </div>
          ) : (
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <label className='text-sm font-medium text-gray-700'>Quantity:</label>
                <div className='flex items-center border border-gray-200 rounded-lg overflow-hidden'>
                  <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition'>-</button>
                  <span className='px-4 py-2 text-sm font-medium text-gray-900'>{quantity}</span>
                  <button onClick={() => setQuantity(q => q + 1)} className='px-3 py-2 text-gray-600 hover:bg-gray-50 transition'>+</button>
                </div>
              </div>
              <button onClick={handleInquiry} disabled={sending} className='w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50'>
                {sending ? 'Sending...' : 'Request a Quote'}
              </button>
              <Link to='/contact' className='w-full py-3 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:border-gray-400 transition text-center block'>
                Contact Us Directly
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetail