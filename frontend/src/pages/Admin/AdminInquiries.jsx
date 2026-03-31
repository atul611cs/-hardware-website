import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getInquiries, updateInquiryStatus } from '../../api/inquiry.js'

const statusColors = {
  PENDING: 'bg-yellow-50 text-yellow-700',
  SEEN: 'bg-blue-50 text-blue-700',
  REPLIED: 'bg-green-50 text-green-700',
  CLOSED: 'bg-gray-100 text-gray-500',
}

const AdminInquiries = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery({
    queryKey: ['admin-inquiries'],
    queryFn: () => getInquiries({ limit: 100 }),
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => updateInquiryStatus(id, status),
    onSuccess: () => queryClient.invalidateQueries(['admin-inquiries']),
  })

  const inquiries = data?.data || []

  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center gap-4'>
          <Link to='/admin' className='text-sm text-gray-500 hover:text-gray-900 transition'>Dashboard</Link>
          <span className='text-gray-300'>/</span>
          <span className='text-sm font-medium text-gray-900'>Inquiries</span>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-10'>
        <div className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-100 flex items-center justify-between'>
            <h2 className='font-semibold text-gray-900'>All Inquiries ({inquiries.length})</h2>
            <div className='flex gap-2'>
              {['PENDING', 'SEEN', 'REPLIED', 'CLOSED'].map((s) => (
                <span key={s} className={`text-xs px-2 py-1 rounded-full ${statusColors[s]}`}>{s}</span>
              ))}
            </div>
          </div>

          {isLoading ? (
            <div className='p-8 text-center text-sm text-gray-400'>Loading inquiries...</div>
          ) : inquiries.length === 0 ? (
            <div className='p-8 text-center text-sm text-gray-400'>No inquiries yet</div>
          ) : (
            <div className='divide-y divide-gray-50'>
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className='p-6'>
                  <div className='flex items-start justify-between gap-4'>
                    <div className='flex-1'>
                      <div className='flex items-center gap-3 mb-1'>
                        <h3 className='font-medium text-gray-900'>{inquiry.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${statusColors[inquiry.status]}`}>
                          {inquiry.status}
                        </span>
                      </div>
                      <div className='flex gap-4 text-xs text-gray-400 mb-3'>
                        <span>{inquiry.email}</span>
                        {inquiry.phone && <span>{inquiry.phone}</span>}
                        {inquiry.company && <span>{inquiry.company}</span>}
                        <span>{new Date(inquiry.createdAt).toLocaleDateString('en-IN')}</span>
                      </div>
                      {inquiry.message && (
                        <p className='text-sm text-gray-600 mb-3'>{inquiry.message}</p>
                      )}
                      {inquiry.items?.length > 0 && (
                        <div className='flex flex-wrap gap-2'>
                          {inquiry.items.map((item) => (
                            <span key={item.id} className='text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-full'>
                              {item.product?.name} x{item.quantity}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Status updater */}
                    <div className='shrink-0'>
                      <select
                        value={inquiry.status}
                        onChange={(e) => updateMutation.mutate({ id: inquiry.id, status: e.target.value })}
                        className='border border-gray-200 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-gray-400'
                      >
                        <option value='PENDING'>Pending</option>
                        <option value='SEEN'>Seen</option>
                        <option value='REPLIED'>Replied</option>
                        <option value='CLOSED'>Closed</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminInquiries