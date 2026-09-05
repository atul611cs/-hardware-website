import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getCategories } from '../api/categories.js'
import { motion } from 'framer-motion'

const stats = [
  { number: '700+', label: 'Products' },
  { number: '90+', label: 'Containers Dispatched' },
  { number: '60,000', label: 'Sq. Ft. Factory' },
  { number: '25+', label: 'Years Experience' },
]

const features = [
  { title: 'Proudly Made in India', desc: 'All products manufactured in our 60,000 sq. ft. facility in India.' },
  { title: 'Export Quality', desc: 'Shipped to 30+ countries with consistent quality and finish standards.' },
  { title: 'Custom Finishes', desc: 'Chrome, antique brass, powder coat and more — tailored to your spec.' },
  { title: 'Bulk Orders', desc: 'Capacity to handle large volume orders with fast turnaround.' },
]

const Home = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const dbCategories = categoriesData?.data || []

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
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
          >
            {dbCategories.map((cat, index) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  className='block h-full bg-white rounded-3xl p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-500 group relative overflow-hidden transform hover:-translate-y-1'
                >
                  {/* Decorative Background Element */}
                  <div className='absolute top-0 right-0 w-40 h-40 bg-gray-50/80 rounded-bl-full -mr-10 -mt-10 transition-transform duration-700 group-hover:scale-125'></div>
                  
                  <div className='relative z-10'>
                    <div className='w-14 h-14 bg-gray-900 rounded-2xl mb-6 flex items-center justify-center transform transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-lg'>
                      <span className='text-white text-sm font-bold tracking-wider'>HW</span>
                    </div>
                    
                    <h3 className='text-xl font-bold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors'>{cat.name}</h3>
                    <p className='text-xs font-semibold text-gray-400 mb-5 uppercase tracking-wider'>{cat._count?.products || 0} products</p>
                    
                    {cat.children?.length > 0 && (
                      <div className='pt-5 border-t border-gray-100/80'>
                        <p className='text-sm text-gray-500 leading-relaxed line-clamp-3'>
                          {cat.children.map(sub => sub.name).join(' • ')}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
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
      <section className='bg-white py-20 px-4 border-b border-gray-100'>
        <div className='max-w-6xl mx-auto bg-gray-900 rounded-3xl p-12 md:p-20 text-center shadow-xl'>
          <h2 className='text-3xl md:text-4xl font-bold text-white mb-4'>Ready to Place an Order?</h2>
          <p className='text-gray-400 text-lg mb-10 max-w-2xl mx-auto'>
            Get in touch with our team for bulk pricing, custom finishes, and export inquiries.
          </p>
          <div className='flex gap-4 justify-center flex-wrap'>
            <Link to='/contact' className='px-8 py-3.5 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition'>
              Contact Us
            </Link>
            <a href='https://wa.me/911234567890' target='_blank' rel='noreferrer' className='px-8 py-3.5 border border-gray-600 text-white rounded-lg font-medium hover:bg-gray-800 transition'>
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home