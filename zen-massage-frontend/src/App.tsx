import { Suspense, lazy } from 'react'
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
import Profile from './pages/Profile'
import Orders from './pages/Orders'
import OrderDetail from './pages/OrderDetail'
import ForgotPassword from './pages/ForgotPassword'
import ProductDetail from './pages/ProductDetail'
import Checkout from './pages/Checkout'

const Dashboard = lazy(() => import('./pages/admin/Dashboard'))
const Bookings = lazy(() => import('./pages/admin/Bookings'))
const CategoriesManagement = lazy(() => import('./pages/admin/CategoriesManagement'))
const ProductsManagement = lazy(() => import('./pages/admin/ProductsManagement'))
const AddProduct = lazy(() => import('./pages/admin/AddProduct'))
const EditProduct = lazy(() => import('./pages/admin/EditProduct'))
const Settings = lazy(() => import('./pages/admin/Settings'))
const OrderHistory = lazy(() => import('./pages/admin/OrderHistory'))
const Statistics = lazy(() => import('./pages/admin/Statistics'))
const SuperAdminPanel = lazy(() => import('./pages/admin/SuperAdminPanel'))

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

function LazyPage({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-body-md text-on-surface-variant">
          Chargement…
        </div>
      }
    >
      {children}
    </Suspense>
  )
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
      <Route path="/orders/:id"   element={<RequireUser><OrderDetail /></RequireUser>} />
      <Route path="/profile"      element={<RequireUser><Profile /></RequireUser>} />

      {/* Pages ADMIN + SUPER_ADMIN */}
      <Route path="/admin"              element={<RequireAdmin><LazyPage><Dashboard /></LazyPage></RequireAdmin>} />
      <Route path="/admin/bookings"     element={<RequireAdmin><LazyPage><Bookings /></LazyPage></RequireAdmin>} />
      <Route path="/admin/categories"   element={<RequireAdmin><LazyPage><CategoriesManagement /></LazyPage></RequireAdmin>} />
      <Route path="/admin/products"     element={<RequireAdmin><LazyPage><ProductsManagement /></LazyPage></RequireAdmin>} />
      <Route path="/admin/products/add" element={<RequireAdmin><LazyPage><AddProduct /></LazyPage></RequireAdmin>} />
      <Route path="/admin/products/:id/edit" element={<RequireAdmin><LazyPage><EditProduct /></LazyPage></RequireAdmin>} />
      <Route path="/admin/settings"     element={<RequireAdmin><LazyPage><Settings /></LazyPage></RequireAdmin>} />
      <Route path="/admin/orders"       element={<RequireAdmin><LazyPage><OrderHistory /></LazyPage></RequireAdmin>} />
      <Route path="/admin/analytics"    element={<RequireAdmin><LazyPage><Statistics /></LazyPage></RequireAdmin>} />

      {/* Page SUPER_ADMIN uniquement */}
      <Route path="/admin/super" element={<RequireSuperAdmin><LazyPage><SuperAdminPanel /></LazyPage></RequireSuperAdmin>} />

      <Route path="*" element={<div className="flex items-center justify-center min-h-screen font-serif text-headline-sm text-sage-deep">Page introuvable</div>} />
    </Routes>
  )
}
