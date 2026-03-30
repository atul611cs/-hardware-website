import { Link } from 'react-router-dom'

const stats = [
  { number: '700+', label: 'Products' },
  { number: '90+', label: 'Containers Dispatched' },
  { number: '60,000', label: 'Sq. Ft. Factory' },
  { number: '25+', label: 'Years Experience' },
]

const categories = [
  { name: 'Aluminium Hardware', slug: 'aluminium-hardware', count: '50+ products' },
  { name: 'Gate Hardware', slug: 'gate-hardware', count: '80+ products' },
  { name: 'Architectural Hardware', slug: 'architectural-hardware', count: '60+ products' },
  { name: 'Hardware and Ironmongery', slug: 'hardware-ironmongery', count: '70+ products' },
]

const features = [
  { title: 'Proudly Made in India', desc: 'All products manufactured in our 60,000 sq. ft. facility in India.' },
  { title: 'Export Quality', desc: 'Shipped to 30+ countries with consistent quality and finish standards.' },
  { title: 'Custom Finishes', desc: 'Chrome, antique brass, powder coat and more — tailored to your spec.' },
  { title: 'Bulk Orders', desc: 'Capacity to handle large volume orders with fast turnaround.' },
]

const Home = () => {
  return (
    <div>
      {/* Hero */}
      <section className='bg-gray-900 text-white py-24 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='max-w-2xl'>
            <span className='text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4 block'>
              Manufacturer and Exporter
            </span>
            <h1 className='text-5xl font-bold leading-tight mb-6'>
              Premium Hardware for Every Application
            </h1>
            <p className='text-gray-400 text-lg mb-8 leading-relaxed'>
              From gate hardware to architectural ironmongery — quality products built for durability, shipped worldwide.
            </p>
            <div className='flex gap-4 flex-wrap'>
              <Link to='/products' className='px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition'>
                Browse Products
              </Link>
              <Link to='/contact' className='px-6 py-3 border border-gray-600 text-white rounded-lg font-medium hover:border-gray-400 transition'>
                Request a Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 py-12'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
            {stats.map((stat) => (
              <div key={stat.label} className='text-center'>
                <div className='text-3xl font-bold text-gray-900 mb-1'>{stat.number}</div>
                <div className='text-sm text-gray-500'>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className='bg-gray-50 py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-10'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Product Categories</h2>
            <p className='text-gray-500'>Explore our full range of hardware products</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/category/${cat.slug}`}
                className='bg-white rounded-xl p-6 border border-gray-100 hover:border-gray-300 hover:shadow-md transition group'
              >
                <div className='w-12 h-12 bg-gray-900 rounded-lg mb-4 flex items-center justify-center group-hover:bg-gray-700 transition'>
                  <span className='text-white text-xs font-bold'>HW</span>
                </div>
                <h3 className='font-semibold text-gray-900 mb-1'>{cat.name}</h3>
                <p className='text-xs text-gray-400'>{cat.count}</p>
              </Link>
            ))}
          </div>
          <div className='mt-8 text-center'>
            <Link to='/products' className='inline-flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:border-gray-900 transition'>
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className='bg-white py-20 px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='mb-10'>
            <h2 className='text-3xl font-bold text-gray-900 mb-2'>Why Choose Us</h2>
            <p className='text-gray-500'>Built on decades of manufacturing expertise</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {features.map((f) => (
              <div key={f.title} className='p-6 border border-gray-100 rounded-xl'>
                <div className='w-8 h-8 bg-gray-900 rounded mb-4'></div>
                <h3 className='font-semibold text-gray-900 mb-2'>{f.title}</h3>
                <p className='text-sm text-gray-500 leading-relaxed'>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className='bg-gray-900 py-20 px-4'>
        <div className='max-w-7xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-white mb-4'>Ready to Place an Order?</h2>
          <p className='text-gray-400 mb-8 max-w-xl mx-auto'>
            Get in touch with our team for bulk pricing, custom finishes, and export inquiries.
          </p>
          <div className='flex gap-4 justify-center flex-wrap'>
            <Link to='/contact' className='px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition'>
              Contact Us
            </Link>
            <a href='https://wa.me/911234567890' target='_blank' rel='noreferrer' className='px-6 py-3 border border-gray-600 text-white rounded-lg font-medium hover:border-gray-400 transition'>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home