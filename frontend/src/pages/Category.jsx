import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCategoryBySlug } from '../api/categories.js'

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
      <div className='max-w-7xl mx-auto px-4 py-16'>
        <div className='h-8 bg-gray-100 rounded animate-pulse w-1/3 mb-4'></div>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {[...Array(8)].map((_, i) => (
            <div key={i} className='bg-gray-100 rounded-xl h-64 animate-pulse'></div>
          ))}
        </div>
      </div>
    )
  }

  if (isError || !category) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-16 text-center'>
        <h2 className='text-xl font-semibold text-gray-900 mb-2'>Category not found</h2>
        <p className='text-gray-500 mb-6'>This category may have been removed or the link is incorrect.</p>
        <Link to='/products' className='px-4 py-2 bg-gray-900 text-white rounded-lg text-sm'>Browse all products</Link>
      </div>
    )
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      {/* Breadcrumb */}
      <nav className='flex gap-2 text-sm text-gray-400 mb-8'>
        <Link to='/' className='hover:text-gray-900 transition'>Home</Link>
        <span>/</span>
        <Link to='/products' className='hover:text-gray-900 transition'>Products</Link>
        <span>/</span>
        <span className='text-gray-600'>{category.name}</span>
      </nav>

      {/* Header */}
      <div className='mb-10'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>{category.name}</h1>
        {category.description && (
          <p className='text-gray-500'>{category.description}</p>
        )}
        <p className='text-sm text-gray-400 mt-1'>{products.length} products</p>
      </div>

      {/* Subcategories */}
      {category.children?.length > 0 && (
        <div className='flex flex-wrap gap-2 mb-8'>
          {category.children.map((child) => (
            <Link
              key={child.id}
              to={`/category/${child.slug}`}
              className='px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gray-900 hover:text-gray-900 transition'
            >
              {child.name}
            </Link>
          ))}
        </div>
      )}

      {/* Products grid */}
      {products.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-gray-400 mb-4'>No products in this category yet</p>
          <Link to='/products' className='text-sm text-gray-900 underline'>Browse all products</Link>
        </div>
      ) : (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.slug}`}
              className='group border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition'
            >
              <div className='bg-gray-50 h-48 flex items-center justify-center'>
                {product.images?.[0] ? (
                  <img src={product.images[0].url} alt={product.name} className='w-full h-full object-cover' />
                ) : (
                  <div className='text-gray-300 text-xs'>No image</div>
                )}
              </div>
              <div className='p-3'>
                <h3 className='text-sm font-medium text-gray-900 group-hover:text-gray-600 transition line-clamp-2'>
                  {product.name}
                </h3>
                {product.sku && (
                  <p className='text-xs text-gray-400 mt-1'>SKU: {product.sku}</p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Category