import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getProducts, createProduct, updateProduct, deleteProduct, uploadProductImage } from '../../api/products.js'
import { getCategories } from '../../api/categories.js'

const emptyForm = {
  name: '',
  sku: '',
  slug: '',
  description: '',
  categoryId: '',
  isFeatured: false,
  finishes: '',
  specs: [],
  sizeSpecs: [],
}

const AdminProducts = () => {
  const queryClient = useQueryClient()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')
  const [uploadingId, setUploadingId] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const fileInputRef = useRef(null)
  const [activeUploadProductId, setActiveUploadProductId] = useState(null)

  const { data: productsData } = useQuery({
    queryKey: ['admin-products'],
    queryFn: () => getProducts({ limit: 100 }),
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const createMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      setShowForm(false)
      setForm(emptyForm)
      setError('')
    },
    onError: () => setError('Failed to create product. Please check all fields.'),
  })

  const updateMutation = useMutation({
    mutationFn: (data) => updateProduct(editingId, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-products'])
      setShowForm(false)
      setForm(emptyForm)
      setEditingId(null)
      setError('')
    },
    onError: () => setError('Failed to update product. Please check all fields.'),
  })

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => queryClient.invalidateQueries(['admin-products']),
  })

  const products = productsData?.data || []
  const categories = categoriesData?.data || []

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleNameChange = (e) => {
    const name = e.target.value
    setForm({ ...form, name, slug: generateSlug(name) })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const finishes = form.finishes
      ? form.finishes.split(',').map(f => ({ name: f.trim() })).filter(f => f.name)
      : []

    const generalSpecs = form.specs ? form.specs.filter(s => s.key && s.value).map(s => ({ ...s, size: null })) : []
    const sizedSpecs = form.sizeSpecs ? form.sizeSpecs.flatMap(ss => 
      ss.specs.filter(s => s.key && s.value).map(s => ({ key: s.key, value: s.value, size: ss.size }))
    ) : []
    const combinedSpecs = [...generalSpecs, ...sizedSpecs]

    if (editingId) {
      updateMutation.mutate({ ...form, finishes, specs: combinedSpecs, isActive: true })
    } else {
      createMutation.mutate({ ...form, finishes, specs: combinedSpecs })
    }
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete "${name}"? This cannot be undone.`)) {
      deleteMutation.mutate(id)
    }
  }

  const handleEdit = (product) => {
    const generalSpecs = product.specs?.filter(s => !s.size) || [];
    const sizedSpecs = product.specs?.filter(s => s.size) || [];
    const grouped = {};
    sizedSpecs.forEach(s => {
      if (!grouped[s.size]) grouped[s.size] = [];
      grouped[s.size].push({ key: s.key, value: s.value });
    });
    const sizeSpecs = Object.keys(grouped).map(size => ({ size, specs: grouped[size] }));

    setForm({
      name: product.name,
      sku: product.sku,
      slug: product.slug,
      description: product.description || '',
      categoryId: product.categoryId,
      isFeatured: product.isFeatured,
      finishes: product.finishes?.map(f => f.name).join(', ') || '',
      specs: generalSpecs.map(s => ({ key: s.key, value: s.value })),
      sizeSpecs: sizeSpecs,
    })
    setEditingId(product.id)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleUploadClick = (productId) => {
    setActiveUploadProductId(productId)
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file || !activeUploadProductId) return

    setUploadingId(activeUploadProductId)
    try {
      await uploadProductImage(activeUploadProductId, file)
      queryClient.invalidateQueries(['admin-products'])
    } catch (_err) {
      alert('Image upload failed. Please try again.')
    } finally {
      setUploadingId(null)
      setActiveUploadProductId(null)
      e.target.value = ''
    }
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Hidden file input */}
      <input
        type='file'
        ref={fileInputRef}
        onChange={handleFileChange}
        accept='image/*'
        className='hidden'
      />

      {/* Header */}
      <header className='bg-white border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Link to='/admin' className='text-sm text-gray-500 hover:text-gray-900 transition'>Dashboard</Link>
            <span className='text-gray-300'>/</span>
            <span className='text-sm font-medium text-gray-900'>Products</span>
          </div>
          <button
            onClick={() => {
              if (showForm) {
                setShowForm(false)
                setForm(emptyForm)
                setEditingId(null)
                setError('')
              } else {
                setShowForm(true)
              }
            }}
            className='px-4 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition'
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>
      </header>

      <div className='max-w-7xl mx-auto px-4 py-10'>
        {/* Add product form */}
        {showForm && (
          <div className='bg-white rounded-xl border border-gray-100 p-6 mb-8'>
            <h2 className='font-semibold text-gray-900 mb-6'>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* 1. Category */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Product Category *</label>
                <select name='categoryId' value={form.categoryId} onChange={handleChange} required className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400'>
                  <option value=''>Select category</option>
                  {categories.map((cat) => (
                    <optgroup key={cat.id} label={cat.name}>
                      <option value={cat.id}>{cat.name} (Main)</option>
                      {cat.children?.map(sub => (
                        <option key={sub.id} value={sub.id}>{sub.name}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              {/* 2. Product name & 3. SKU */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Product Name *</label>
                  <input type='text' name='name' value={form.name} onChange={handleNameChange} required className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400' placeholder='Aluminium Door Handle' />
                </div>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>SKU *</label>
                  <input type='text' name='sku' value={form.sku} onChange={handleChange} required className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400' placeholder='AH-101' />
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>Slug</label>
                  <input type='text' name='slug' value={form.slug} onChange={handleChange} required className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400' placeholder='auto-generated from name' />
                </div>
                <div className='flex items-center gap-2 mt-8'>
                  <input type='checkbox' name='isFeatured' checked={form.isFeatured} onChange={handleChange} id='isFeatured' className='rounded' />
                  <label htmlFor='isFeatured' className='text-sm text-gray-700'>Featured product</label>
                </div>
              </div>

              {/* 4. Finishes */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Finishes</label>
                <div className='border border-gray-200 rounded-lg p-3 bg-white'>
                  <div className='grid grid-cols-2 gap-2 mb-3'>
                    {Array.from(new Set([
                      'Zinc', 'Powder Coating/ Black', 'Self colour', 'Chrome', 'E.brass',
                      ...(form.finishes ? form.finishes.split(',').map(f => f.trim()).filter(Boolean) : [])
                    ])).map(finish => {
                      const currentFinishes = form.finishes ? form.finishes.split(',').map(f => f.trim()).filter(Boolean) : [];
                      return (
                        <label key={finish} className='flex items-center gap-2 cursor-pointer'>
                          <input 
                            type='checkbox' 
                            checked={currentFinishes.includes(finish)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setForm({ ...form, finishes: [...currentFinishes, finish].join(', ') });
                              } else {
                                setForm({ ...form, finishes: currentFinishes.filter(f => f !== finish).join(', ') });
                              }
                            }}
                            className='rounded border-gray-300 text-gray-900 focus:ring-gray-900'
                          />
                          <span className='text-gray-700'>{finish}</span>
                        </label>
                      );
                    })}
                  </div>
                  <div className='flex items-center gap-2'>
                    <input 
                      type='text' 
                      id='newFinishInput'
                      placeholder='Add new finish...' 
                      className='w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400'
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const newFinish = e.target.value.trim();
                          if (newFinish) {
                            const currentFinishes = form.finishes ? form.finishes.split(',').map(f => f.trim()).filter(Boolean) : [];
                            if (!currentFinishes.includes(newFinish)) {
                              setForm({ ...form, finishes: [...currentFinishes, newFinish].join(', ') });
                            }
                            e.target.value = '';
                          }
                        }
                      }}
                    />
                    <button 
                      type='button'
                      onClick={() => {
                        const input = document.getElementById('newFinishInput');
                        const newFinish = input.value.trim();
                        if (newFinish) {
                          const currentFinishes = form.finishes ? form.finishes.split(',').map(f => f.trim()).filter(Boolean) : [];
                          if (!currentFinishes.includes(newFinish)) {
                            setForm({ ...form, finishes: [...currentFinishes, newFinish].join(', ') });
                          }
                          input.value = '';
                        }
                      }}
                      className='px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded transition'
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>

              {/* 5 & 6. Sizes and Specifications */}
              <div className='border border-gray-200 rounded-lg p-4 bg-gray-50'>
                <div className='flex items-center justify-between mb-4'>
                  <label className='block text-sm font-medium text-gray-700'>Sizes & Specifications</label>
                  <button 
                    type='button'
                    onClick={() => {
                      setForm({
                        ...form,
                        sizeSpecs: [...(form.sizeSpecs || []), { size: '', specs: [{ key: '', value: '' }] }]
                      });
                    }}
                    className='text-xs bg-white border border-gray-300 px-3 py-1 rounded shadow-sm hover:bg-gray-50 text-gray-700 font-medium'
                  >
                    + Add New Size
                  </button>
                </div>

                {/* Per-size specs */}
                {(form.sizeSpecs || []).map((sizeBlock, sizeIdx) => (
                  <div key={sizeIdx} className='mb-6 bg-white p-4 border border-gray-200 rounded shadow-sm'>
                    <div className='flex items-center justify-between mb-3 border-b border-gray-100 pb-2'>
                      <div className='flex items-center gap-2'>
                        <span className='font-semibold text-gray-800'>Size:</span>
                        <input 
                          type='text'
                          value={sizeBlock.size}
                          onChange={(e) => {
                            const newSizeSpecs = [...form.sizeSpecs];
                            newSizeSpecs[sizeIdx].size = e.target.value;
                            setForm({ ...form, sizeSpecs: newSizeSpecs });
                          }}
                          placeholder='e.g. 2mm'
                          className='border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400 font-semibold'
                        />
                      </div>
                      <button 
                        type='button'
                        onClick={() => {
                          if(window.confirm(`Remove this size and all its specifications?`)) {
                            const newSizeSpecs = [...form.sizeSpecs];
                            newSizeSpecs.splice(sizeIdx, 1);
                            setForm({ ...form, sizeSpecs: newSizeSpecs });
                          }
                        }}
                        className='text-xs text-red-500 hover:text-red-700'
                      >
                        Remove Size
                      </button>
                    </div>
                    {sizeBlock.specs.map((spec, specIdx) => (
                      <div key={specIdx} className='flex gap-2 mb-2'>
                        <input 
                          type='text' 
                          value={spec.key} 
                          onChange={(e) => {
                            const newSizeSpecs = [...form.sizeSpecs];
                            newSizeSpecs[sizeIdx].specs[specIdx].key = e.target.value;
                            setForm({ ...form, sizeSpecs: newSizeSpecs });
                          }}
                          placeholder='Key (e.g. Width)' 
                          className='w-1/3 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400'
                        />
                        <input 
                          type='text' 
                          value={spec.value} 
                          onChange={(e) => {
                            const newSizeSpecs = [...form.sizeSpecs];
                            newSizeSpecs[sizeIdx].specs[specIdx].value = e.target.value;
                            setForm({ ...form, sizeSpecs: newSizeSpecs });
                          }}
                          placeholder='Value (e.g. 10mm)' 
                          className='w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400'
                        />
                        <button 
                          type='button'
                          onClick={() => {
                            const newSizeSpecs = [...form.sizeSpecs];
                            newSizeSpecs[sizeIdx].specs.splice(specIdx, 1);
                            setForm({ ...form, sizeSpecs: newSizeSpecs });
                          }}
                          className='text-red-400 hover:text-red-600 px-1'
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <button 
                      type='button'
                      onClick={() => {
                        const newSizeSpecs = [...form.sizeSpecs];
                        newSizeSpecs[sizeIdx].specs.push({ key: '', value: '' });
                        setForm({ ...form, sizeSpecs: newSizeSpecs });
                      }}
                      className='text-xs text-blue-600 hover:text-blue-700 font-medium mt-1'
                    >
                      + Add Specification for {sizeBlock.size}
                    </button>
                  </div>
                ))}

                {/* General specs */}
                <div className='bg-white p-4 border border-gray-200 rounded shadow-sm'>
                  <div className='flex items-center justify-between mb-3 border-b border-gray-100 pb-2'>
                    <span className='font-semibold text-gray-800'>General Specifications</span>
                  </div>
                  {(form.specs || []).map((spec, idx) => (
                    <div key={idx} className='flex gap-2 mb-2'>
                      <input 
                        type='text' 
                        value={spec.key} 
                        onChange={(e) => {
                          const newSpecs = [...form.specs];
                          newSpecs[idx].key = e.target.value;
                          setForm({ ...form, specs: newSpecs });
                        }}
                        placeholder='Key (e.g. Material)' 
                        className='w-1/3 border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400'
                      />
                      <input 
                        type='text' 
                        value={spec.value} 
                        onChange={(e) => {
                          const newSpecs = [...form.specs];
                          newSpecs[idx].value = e.target.value;
                          setForm({ ...form, specs: newSpecs });
                        }}
                        placeholder='Value' 
                        className='w-full border border-gray-200 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-400'
                      />
                      <button 
                        type='button'
                        onClick={() => {
                          const newSpecs = form.specs.filter((_, i) => i !== idx);
                          setForm({ ...form, specs: newSpecs });
                        }}
                        className='text-red-400 hover:text-red-600 px-1'
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button 
                    type='button'
                    onClick={() => setForm({ ...form, specs: [...(form.specs || []), { key: '', value: '' }] })}
                    className='text-xs text-blue-600 hover:text-blue-700 font-medium mt-1'
                  >
                    + Add General Specification
                  </button>
                </div>
              </div>

              {/* 7. Description */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Description</label>
                <textarea name='description' value={form.description} onChange={handleChange} rows={4} className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-400 resize-none' placeholder='Product description...' />
              </div>

              {error && <p className='text-sm text-red-500'>{error}</p>}

              <button type='submit' disabled={createMutation.isPending || updateMutation.isPending} className='px-6 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 transition disabled:opacity-50'>
                {createMutation.isPending || updateMutation.isPending ? 'Saving...' : (editingId ? 'Update Product' : 'Create Product')}
              </button>
            </form>
          </div>
        )}

        {/* Products table */}
        <div className='bg-white rounded-xl border border-gray-100 overflow-hidden'>
          <div className='px-6 py-4 border-b border-gray-100'>
            <h2 className='font-semibold text-gray-900'>All Products ({products.length})</h2>
          </div>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[900px]'>
              <thead className='bg-gray-50'>
              <tr>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>Image</th>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>Product</th>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>SKU</th>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>Category</th>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>Finishes</th>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>Featured</th>
                <th className='text-left text-xs font-semibold text-gray-500 uppercase tracking-wider px-6 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-50'>
              {products.map((product) => (
                <tr key={product.id} className='hover:bg-gray-50 transition'>
                  <td className='px-6 py-4'>
                    <div className='w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center'>
                      {product.images?.[0] ? (
                        <img src={product.images[0].url} alt={product.name} className='w-full h-full object-cover' />
                      ) : (
                        <span className='text-gray-300 text-xs'>none</span>
                      )}
                    </div>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm font-medium text-gray-900'>{product.name}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-500'>{product.sku}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-500'>{product.category?.name}</p>
                  </td>
                  <td className='px-6 py-4'>
                    <p className='text-sm text-gray-500'>
                      {product.finishes?.length > 0 
                        ? product.finishes.map(f => f.name).join(', ') 
                        : '-'}
                    </p>
                  </td>
                  <td className='px-6 py-4'>
                    <span className={`text-xs px-2 py-1 rounded-full ${product.isFeatured ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-500'}`}>
                      {product.isFeatured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className='px-6 py-4'>
                    <div className='flex items-center gap-3'>
                      <Link to={`/products/${product.slug}`} className='text-xs text-gray-400 hover:text-gray-900 transition'>View</Link>
                      <button onClick={() => handleEdit(product)} className='text-xs text-blue-400 hover:text-blue-600 transition'>Edit</button>
                      <button onClick={() => handleUploadClick(product.id)} disabled={uploadingId === product.id} className='text-xs text-blue-400 hover:text-blue-600 transition disabled:opacity-50'>
                        {uploadingId === product.id ? 'Uploading...' : 'Upload Image'}
                      </button>
                      <button onClick={() => handleDelete(product.id, product.name)} className='text-xs text-red-400 hover:text-red-600 transition'>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProducts