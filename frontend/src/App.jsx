import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Products from './pages/Products.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Category from './pages/Category.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import AdminLogin from './pages/Admin/AdminLogin.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import AdminProducts from './pages/Admin/AdminProducts.jsx'
import AdminInquiries from './pages/Admin/AdminInquiries.jsx'
import ProtectedRoute from './components/ui/ProtectedRoute.jsx'
import ScrollToTop from './components/layout/ScrollToTop.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Public routes with Navbar and Footer */}
        <Route path='/' element={<><Navbar /><main><Home /></main><Footer /></>} />
        <Route path='/products' element={<><Navbar /><main><Products /></main><Footer /></>} />
        <Route path='/products/:slug' element={<><Navbar /><main><ProductDetail /></main><Footer /></>} />
        <Route path='/category/:slug' element={<><Navbar /><main><Category /></main><Footer /></>} />
        <Route path='/about' element={<><Navbar /><main><About /></main><Footer /></>} />
        <Route path='/contact' element={<><Navbar /><main><Contact /></main><Footer /></>} />

        {/* Admin routes — no Navbar/Footer */}
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/admin' element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path='/admin/products' element={<ProtectedRoute><AdminProducts /></ProtectedRoute>} />
        <Route path='/admin/inquiries' element={<ProtectedRoute><AdminInquiries /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App