import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Services from './pages/Services'
import Appointments from './pages/Appointments'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import AddProduct from './pages/admin/AddProduct'
import Settings from './pages/admin/Settings'
import Dashboard from './pages/admin/Dashboard'
import OrderHistory from './pages/admin/OrderHistory'
import Bookings from './pages/admin/Bookings'
import Statistics from './pages/admin/Statistics'
import SuperAdminPanel from './pages/admin/SuperAdminPanel'
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import ForgotPassword from './pages/ForgotPassword'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"             element={<Home />} />
        <Route path="/about"        element={<About />} />
        <Route path="/products"     element={<Products />} />
        <Route path="/products/:id"  element={<ProductDetail />} />
        <Route path="/checkout"      element={<Checkout />} />
        <Route path="/services"     element={<Services />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/account"      element={<Account />} />
        <Route path="/admin"              element={<Dashboard />} />
        <Route path="/admin/bookings"      element={<Bookings />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/settings"      element={<Settings />} />
        <Route path="/admin/orders"        element={<OrderHistory />} />
        <Route path="/admin/analytics"     element={<Statistics />} />
        <Route path="/admin/super"          element={<SuperAdminPanel />} />
        <Route path="/profile"             element={<Profile />} />
        <Route path="/orders"              element={<Orders />} />
        <Route path="*"             element={<div className="flex items-center justify-center min-h-screen font-serif text-headline-sm text-sage-deep">Page introuvable</div>} />
      </Routes>
    </BrowserRouter>
  )
}
