import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
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

// Redirige vers la bonne page d'accueil selon le rôle
function HomeByRole() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'SUPER_ADMIN') return <Navigate to="/admin/super" replace />
  if (user.role === 'ADMIN') return <Navigate to="/admin" replace />
  return <Navigate to="/account" replace />
}

// Redirige les utilisateurs déjà connectés hors de login/register
function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <>{children}</>
  if (user.role === 'SUPER_ADMIN') return <Navigate to="/admin/super" replace />
  if (user.role === 'ADMIN') return <Navigate to="/admin" replace />
  return <Navigate to="/account" replace />
}

// Requiert le rôle USER uniquement (pas admin)
function RequireUser({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') return <Navigate to="/admin" replace />
  return <>{children}</>
}

// Requiert ADMIN ou SUPER_ADMIN
function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') return <Navigate to="/account" replace />
  return <>{children}</>
}

// Requiert SUPER_ADMIN uniquement
function RequireSuperAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== 'SUPER_ADMIN') return <Navigate to="/admin" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route path="/"                element={<Home />} />
      <Route path="/about"           element={<About />} />
      <Route path="/products"        element={<Products />} />
      <Route path="/products/:id"    element={<ProductDetail />} />
      <Route path="/services"        element={<Services />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Pages auth — redirige si déjà connecté */}
      <Route path="/login"    element={<GuestOnly><Login /></GuestOnly>} />
      <Route path="/register" element={<GuestOnly><Register /></GuestOnly>} />

      {/* Redirection intelligente selon le rôle */}
      <Route path="/dashboard" element={<HomeByRole />} />

      {/* Pages USER uniquement */}
      <Route path="/appointments" element={<RequireUser><Appointments /></RequireUser>} />
      <Route path="/checkout"     element={<RequireUser><Checkout /></RequireUser>} />
      <Route path="/account"      element={<RequireUser><Account /></RequireUser>} />
      <Route path="/orders"       element={<RequireUser><Orders /></RequireUser>} />
      <Route path="/profile"      element={<RequireUser><Profile /></RequireUser>} />

      {/* Pages ADMIN + SUPER_ADMIN */}
      <Route path="/admin"              element={<RequireAdmin><Dashboard /></RequireAdmin>} />
      <Route path="/admin/bookings"     element={<RequireAdmin><Bookings /></RequireAdmin>} />
      <Route path="/admin/products/add" element={<RequireAdmin><AddProduct /></RequireAdmin>} />
      <Route path="/admin/settings"     element={<RequireAdmin><Settings /></RequireAdmin>} />
      <Route path="/admin/orders"       element={<RequireAdmin><OrderHistory /></RequireAdmin>} />
      <Route path="/admin/analytics"    element={<RequireAdmin><Statistics /></RequireAdmin>} />

      {/* Page SUPER_ADMIN uniquement */}
      <Route path="/admin/super" element={<RequireSuperAdmin><SuperAdminPanel /></RequireSuperAdmin>} />

      <Route path="*" element={<div className="flex items-center justify-center min-h-screen font-serif text-headline-sm text-sage-deep">Page introuvable</div>} />
    </Routes>
  )
}
