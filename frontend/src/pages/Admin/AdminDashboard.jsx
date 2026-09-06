import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../api/products.js'
import { getInquiries } from '../../api/inquiry.js'
import { getCategories } from '../../api/categories.js'
import { logout } from '../../api/auth.js'
import logo from '../../assets/logo.png'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const { data: productsData } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => getProducts({ limit: 5 }),
  })

  const { data: inquiriesData } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: () => getInquiries({ limit: 5 }),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const products = productsData?.data || []
  const inquiries = inquiriesData?.data || []
  const categories = categoriesData?.data || []

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Admin Navbar */}
      <header className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-3'>
            <div className='h-8 w-auto flex items-center justify-center'>
              <img src={logo} alt='Balaji Hardware' className='h-7 w-auto object-contain' />
            </div>
            <span className='font-semibold text-gray-900'>Balaji Admin Panel</span>
          </div>
          <div className='flex items-center gap-4'>
            <Link to='/' className='text-sm text-gray-500 hover:text-gray-900 transition'>View Site</Link>
            <button onClick={handleLogout} className='text-sm text-red-500 hover:text-red-700 transition'>Logout</button>
          </div>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-10'>
        {/* Stats */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-10'>
          <div className='bg-white rounded-xl border border-gray-100 p-6'>
            <p className='text-sm text-gray-500 mb-1'>Total Products</p>
            <p className='text-3xl font-bold text-gray-900'>{productsData?.pagination?.total || 0}</p>
            <Link to='/admin/products' className='text-xs text-gray-400 hover:text-gray-900 transition mt-2 block'>Manage products</Link>
          </div>
          <div className='bg-white rounded-xl border border-gray-100 p-6'>
            <p className='text-sm text-gray-500 mb-1'>Total Inquiries</p>
            <p className='text-3xl font-bold text-gray-900'>{inquiriesData?.pagination?.total || 0}</p>
            <Link to='/admin/inquiries' className='text-xs text-gray-400 hover:text-gray-900 transition mt-2 block'>View inquiries</Link>
          </div>
          <div className='bg-white rounded-xl border border-gray-100 p-6'>
            <p className='text-sm text-gray-500 mb-1'>Categories</p>
            <p className='text-3xl font-bold text-gray-900'>{categories.length}</p>
            <span className='text-xs text-gray-400 mt-2 block'>Top level categories</span>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {/* Recent products */}
          <div className='bg-white rounded-xl border border-gray-100 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='font-semibold text-gray-900'>Recent Products</h2>
              <Link to='/admin/products' className='text-xs text-gray-400 hover:text-gray-900 transition'>View all</Link>
            </div>
            <div className='space-y-3'>
              {products.map((product) => (
                <div key={product.id} className='flex items-center justify-between py-2 border-b border-gray-50'>
                  <div>
                    <p className='text-sm font-medium text-gray-900'>{product.name}</p>
                    <p className='text-xs text-gray-400'>SKU: {product.sku}</p>
                  </div>
                  <span className='text-xs text-gray-400'>{product.category?.name}</span>
                </div>
              ))}
            </div>
            <Link to='/admin/products' className='mt-4 block w-full py-2 border border-gray-200 rounded-lg text-sm text-center text-gray-600 hover:border-gray-900 transition'>
              Add New Product
            </Link>
          </div>

          {/* Recent inquiries */}
          <div className='bg-white rounded-xl border border-gray-100 p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='font-semibold text-gray-900'>Recent Inquiries</h2>
              <Link to='/admin/inquiries' className='text-xs text-gray-400 hover:text-gray-900 transition'>View all</Link>
            </div>
            <div className='space-y-3'>
              {inquiries.length === 0 ? (
                <p className='text-sm text-gray-400'>No inquiries yet</p>
              ) : (
                inquiries.map((inquiry) => (
                  <div key={inquiry.id} className='flex items-center justify-between py-2 border-b border-gray-50'>
                    <div>
                      <p className='text-sm font-medium text-gray-900'>{inquiry.name}</p>
                      <p className='text-xs text-gray-400'>{inquiry.email}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      inquiry.status === 'PENDING' ? 'bg-yellow-50 text-yellow-700' :
                      inquiry.status === 'REPLIED' ? 'bg-green-50 text-green-700' :
                      'bg-gray-50 text-gray-600'
                    }`}>
                      {inquiry.status}
                    </span>
                  </div>
                ))
              )}
            </div>
            <Link to='/admin/inquiries' className='mt-4 block w-full py-2 border border-gray-200 rounded-lg text-sm text-center text-gray-600 hover:border-gray-900 transition'>
              View All Inquiries
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard