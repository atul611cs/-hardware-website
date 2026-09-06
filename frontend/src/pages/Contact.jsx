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
    <div className='bg-[#121212] text-[#F3F4F6] min-h-screen py-14 md:py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <div className='mb-12 md:mb-16 max-w-2xl'>
          <h1 className='font-display text-4xl md:text-5xl font-semibold text-[#F3F4F6] mb-3 tracking-tight'>Get in Touch</h1>
          <p className='text-[#9CA3AF] text-lg'>Send us an inquiry and we will get back to you within 24 hours.</p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start'>
          {/* Form Card */}
          <div>
            {success ? (
              <div className='glass-panel rounded-3xl p-10 text-center bg-[#d97706]/10 border border-[#d97706]/50 shadow-[0_0_30px_rgba(217,119,6,0.2)]'>
                <div className='w-14 h-14 rounded-2xl bg-[#d97706]/20 border border-[#d97706]/50 mx-auto flex items-center justify-center text-[#d97706] text-2xl mb-4'>
                  ✓
                </div>
                <h3 className='font-display font-semibold text-xl text-[#F3F4F6] mb-2'>Inquiry Sent!</h3>
                <p className='text-sm text-[#9CA3AF] mb-5'>We will get back to you within 24 hours.</p>
                <button onClick={() => setSuccess(false)} className='text-sm text-[#d97706] hover:text-[#F3F4F6] underline underline-offset-4 transition-colors'>
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-3xl p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] space-y-7'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div className='field-float'>
                    <input type='text' name='name' id='name' value={form.name} onChange={handleChange} required placeholder='Your name' />
                    <label htmlFor='name'>Name *</label>
                  </div>
                  <div className='field-float'>
                    <input type='text' name='company' id='company' value={form.company} onChange={handleChange} placeholder='Company name' />
                    <label htmlFor='company'>Company</label>
                  </div>
                </div>

                <div className='field-float'>
                  <input type='email' name='email' id='email' value={form.email} onChange={handleChange} required placeholder='your@email.com' />
                  <label htmlFor='email'>Email *</label>
                </div>

                <div className='field-float'>
                  <input type='tel' name='phone' id='phone' value={form.phone} onChange={handleChange} placeholder='+91 98765 43210' />
                  <label htmlFor='phone'>Phone</label>
                </div>

                <div className='field-float'>
                  <textarea name='message' id='message' value={form.message} onChange={handleChange} required rows={5} placeholder='Tell us about your requirements — product, quantity, finish, destination...' className='resize-none' />
                  <label htmlFor='message'>Message *</label>
                </div>

                {error && <p className='text-sm text-red-400 font-mono'>{error}</p>}

                <button type='submit' disabled={loading} className='btn-primary w-full disabled:opacity-50'>
                  {loading ? 'Sending...' : 'Send Inquiry'}
                </button>
              </form>
            )}
          </div>

          {/* Contact Details & Hours */}
          <div className='space-y-8 md:pt-2'>
            <div className='bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'>
              <h3 className='font-display font-semibold text-lg text-[#F3F4F6] mb-5'>Contact Information</h3>
              <ul className='space-y-3.5 text-sm text-[#9CA3AF]'>
                <li className='flex gap-3'>
                  <span className='text-[#d97706] font-semibold shrink-0'>Loc:</span>
                  <span>123 Industrial Area, Aligarh, UttarPradesh 202001, India</span>
                </li>
                <li className='flex gap-3'>
                  <span className='text-[#d97706] font-semibold shrink-0'>Tel:</span>
                  <a href='tel:+911234567890' className='hover:text-[#d97706] transition-colors duration-300'>+91 12345 67890</a>
                </li>
                <li className='flex gap-3'>
                  <span className='text-[#d97706] font-semibold shrink-0'>Email:</span>
                  <a href='mailto:info@hardware.com' className='hover:text-[#d97706] transition-colors duration-300'>info@hardware.com</a>
                </li>
              </ul>
            </div>

            <div className='bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'>
              <h3 className='font-display font-semibold text-lg text-[#F3F4F6] mb-5'>Business Hours</h3>
              <ul className='space-y-3 text-sm text-[#9CA3AF]'>
                <li className='flex justify-between gap-4 border-b border-white/10 pb-2.5'><span>Monday - Friday</span><span>9:00 AM - 6:00 PM</span></li>
                <li className='flex justify-between gap-4 border-b border-white/10 pb-2.5'><span>Saturday</span><span>9:00 AM - 2:00 PM</span></li>
                <li className='flex justify-between gap-4'><span>Sunday</span><span className='text-[#d97706]'>Closed</span></li>
              </ul>
            </div>

            <div className='bg-white/5 backdrop-blur-md border border-[#d97706]/30 rounded-2xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'>
              <h3 className='font-display font-semibold text-lg text-[#F3F4F6] mb-4'>Quick Connect</h3>
              <a href='https://wa.me/911234567890' target='_blank' rel='noreferrer' className='btn-primary inline-flex items-center gap-2'>WhatsApp Us</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

