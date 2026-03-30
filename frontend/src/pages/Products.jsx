import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../api/products.js'
import { getCategories } from '../api/categories.js'

const materials = ['Aluminium', 'Iron', 'Stainless Steel', 'Brass', 'Zinc']

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')

  const category = searchParams.get('category') || ''
  const material = searchParams.get('material') || ''
  const page = parseInt(searchParams.get('page') || '1')

  const { data: productsData, isLoading: productsLoading } = useQuery({
    queryKey: ['products', { category, material, page }],
    queryFn: () => getProducts({ category, material, page, limit: 20 }),
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
  }

  const clearFilters = () => {
    setSearchParams({})
  }

  const products = productsData?.data || []
  const pagination = productsData?.pagination || {}
  const categories = categoriesData?.data || []

  return (
    <div className='max-w-7xl mx-auto px-4 py-12'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>All Products</h1>
        <p className='text-gray-500'>
          {pagination.total ? `${pagination.total} products found` : 'Browse our full catalog'}
        </p>
      </div>

      <div className='flex gap-8'>
        {/* Sidebar filters */}
        <aside className='hidden md:block w-56 shrink-0'>
          <div className='sticky top-24'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='font-semibold text-gray-900 text-sm'>Filters</h3>
              {(category || material) && (
                <button onClick={clearFilters} className='text-xs text-gray-500 hover:text-gray-900 transition'>
                  Clear all
                </button>
              )}
            </div>

            {/* Categories */}
            <div className='mb-6'>
              <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>Category</h4>
              <ul className='space-y-1'>
                <li>
                  <button
                    onClick={() => setFilter('category', '')}
                    className={`text-sm w-full text-left px-2 py-1 rounded transition ${!category ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setFilter('category', cat.slug)}
                      className={`text-sm w-full text-left px-2 py-1 rounded transition ${category === cat.slug ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {cat.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material */}
            <div className='mb-6'>
              <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3'>Material</h4>
              <ul className='space-y-1'>
                <li>
                  <button
                    onClick={() => setFilter('material', '')}
                    className={`text-sm w-full text-left px-2 py-1 rounded transition ${!material ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                  >
                    All Materials
                  </button>
                </li>
                {materials.map((mat) => (
                  <li key={mat}>
                    <button
                      onClick={() => setFilter('material', mat)}
                      className={`text-sm w-full text-left px-2 py-1 rounded transition ${material === mat ? 'text-gray-900 font-medium' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      {mat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Product grid */}
        <div className='flex-1'>
          {productsLoading ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {[...Array(8)].map((_, i) => (
                <div key={i} className='bg-gray-100 rounded-xl h-64 animate-pulse'></div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className='text-center py-20'>
              <p className='text-gray-400 mb-4'>No products found</p>
              <button onClick={clearFilters} className='text-sm text-gray-900 underline'>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {products.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.slug}`}
                    className='group border border-gray-100 rounded-xl overflow-hidden hover:border-gray-300 hover:shadow-md transition'
                  >
                    <div className='bg-gray-50 h-48 flex items-center justify-center'>
                      {product.images?.[0] ? (
                        <img
                          src={product.images[0].url}
                          alt={product.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='text-gray-300 text-xs'>No image</div>
                      )}
                    </div>
                    <div className='p-3'>
                      <p className='text-xs text-gray-400 mb-1'>{product.category?.name}</p>
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

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className='flex justify-center gap-2 mt-10'>
                  {[...Array(pagination.pages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setFilter('page', String(i + 1))}
                      className={`w-8 h-8 rounded text-sm transition ${page === i + 1 ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-600 hover:border-gray-900'}`}
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
  )
}

export default Products