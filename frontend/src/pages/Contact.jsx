import { useState } from 'react'
import { submitInquiry } from '../api/inquiry.js'

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await submitInquiry({ ...form, items: [] })
      setSuccess(true)
      setForm({ name: '', email: '', phone: '', company: '', message: '' })
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-16'>
      <div className='mb-12'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>Get in Touch</h1>
        <p className='text-gray-500'>Send us an inquiry and we will get back to you within 24 hours.</p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>

        <div>
          {success ? (
            <div className='bg-green-50 border border-green-200 rounded-xl p-8 text-center'>
              <h3 className='font-semibold text-gray-900 mb-2'>Inquiry Sent!</h3>
              <p className='text-sm text-gray-500 mb-4'>We will get back to you within 24 hours.</p>
              <button onClick={() => setSuccess(false)} className='text-sm text-gray-900 underline'>Send another inquiry</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Name *</label>
                  <input type='text' name='name' value={form.name} onChange={handleChange} required className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition' placeholder='Your name' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Company</label>
                  <input type='text' name='company' value={form.company} onChange={handleChange} className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition' placeholder='Company name' />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Email *</label>
                <input type='email' name='email' value={form.email} onChange={handleChange} required className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition' placeholder='your@email.com' />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                <input type='tel' name='phone' value={form.phone} onChange={handleChange} className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition' placeholder='+91 98765 43210' />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Message *</label>
                <textarea name='message' value={form.message} onChange={handleChange} required rows={5} className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition resize-none' placeholder='Tell us about your requirements — product, quantity, finish, destination...' />
              </div>

              {error && <p className='text-sm text-red-500'>{error}</p>}

              <button type='submit' disabled={loading} className='w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50'>
                {loading ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          )}
        </div>

        <div className='space-y-8'>
          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Contact Information</h3>
            <ul className='space-y-3 text-sm text-gray-600'>
              <li className='flex gap-3'>
                <span className='text-gray-400 shrink-0'>Loc:</span>
                <span>123 Industrial Area, Aligarh, UttarPradesh 202001, India</span>
              </li>
              <li className='flex gap-3'>
                <span className='text-gray-400 shrink-0'>Tel:</span>
                <a href='tel:+911234567890' className='hover:text-gray-900 transition'>+91 12345 67890</a>
              </li>
              <li className='flex gap-3'>
                <span className='text-gray-400 shrink-0'>Email:</span>
                <a href='mailto:info@hardware.com' className='hover:text-gray-900 transition'>info@hardware.com</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Business Hours</h3>
            <ul className='space-y-2 text-sm text-gray-600'>
              <li className='flex justify-between'><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></li>
              <li className='flex justify-between'><span>Saturday</span><span>9:00 AM - 2:00 PM</span></li>
              <li className='flex justify-between'><span>Sunday</span><span className='text-gray-400'>Closed</span></li>
            </ul>
          </div>

          <div>
            <h3 className='font-semibold text-gray-900 mb-4'>Quick Connect</h3>
            <a href='https://wa.me/911234567890' target='_blank' rel='noreferrer' className='inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition'>WhatsApp Us</a>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact