import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../api/auth.js'

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
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='w-full max-w-sm'>
        <div className='text-center mb-8'>
          <div className='w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center mx-auto mb-4'>
            <span className='text-white text-sm font-bold'>HW</span>
          </div>
          <h1 className='text-xl font-bold text-gray-900'>Admin Login</h1>
          <p className='text-sm text-gray-500 mt-1'>Hardware Co. Management Panel</p>
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