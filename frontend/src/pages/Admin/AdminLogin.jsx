import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth.js'
import logo from '../../assets/logo.png'

const AdminLogin = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form)
      navigate('/admin')
    } catch (_err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#121212] text-[#F3F4F6] flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        <div className='text-center mb-8 flex flex-col items-center'>
          <div className='w-20 h-20 mb-3 flex items-center justify-center'>
            <img src={logo} alt='Balaji Hardware' className='w-full h-full object-contain drop-shadow-[0_0_15px_rgba(217,119,6,0.35)]' />
          </div>
          <h1 className='text-xl font-bold font-display text-[#F3F4F6]'>Admin Portal</h1>
          <p className='text-xs text-[#9CA3AF] mt-1'>Balaji Hardware Management Panel</p>
        </div>

        <div className='bg-white rounded-xl border border-gray-100 p-8'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                required
                className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition'
                placeholder='admin@hardware.com'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-1'>Password</label>
              <input
                type='password'
                name='password'
                value={form.password}
                onChange={handleChange}
                required
                className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 transition'
                placeholder='••••••••'
              />
            </div>

            {error && <p className='text-sm text-red-500'>{error}</p>}

            <button
              type='submit'
              disabled={loading}
              className='w-full py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition disabled:opacity-50'
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className='mt-6 pt-6 border-t border-gray-100'>
            <p className='text-xs text-gray-400 text-center'>
              Default: admin@hardware.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin