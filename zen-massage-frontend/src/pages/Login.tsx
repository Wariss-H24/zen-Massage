import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/auth.service'

export default function Login() {
  useEffect(() => {
    document.title = 'Connexion | Zen Massage & Wellness Gabon'
  }, [])

  const navigate = useNavigate()
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPwd, setShowPwd]   = useState(false)
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await authService.login({ email, password })
      const role = res.data.role
      navigate(role === 'USER' ? '/account' : '/admin')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-surface font-body-md text-on-surface">

      {/* ── Top logo ── */}
      <header className="fixed top-0 left-0 w-full z-50 py-stack-md flex justify-center md:justify-start md:px-margin-desktop">
        <Link to="/" className="group flex items-center gap-2">
          <span className="font-display-lg text-headline-sm text-sage-deep group-hover:text-primary transition-colors duration-300">
            Zen Massage &amp; Wellness
          </span>
        </Link>
      </header>

      <main className="flex min-h-screen">

        {/* ── Left — Visual ── */}
        <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-sand-light">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-110"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD-e5Faod_NzYdCgVc7_t3Vv6qHzfCc1AhY9hMmqtfF7eIqG2ShaFfCgR13zB3tXYG_vXKSRv2t3AjgG4S4kjEaAkSxQ9V17032BVraD_fAR-I5MM-FG_TeeYv_dw1iDUKJQN_k9AVMVdEkFQcKCvQPHhVMDNNyIxR4WbNU7PgH54I9cw2V8-tFtAfQY4pe2J8ySk3pfsKOPc-mWfb_xIJBwzs1z42MLs9b2oBNWYHCitOjwiTDcdYbGw')" }}
          />
          <div className="absolute inset-0 bg-sage-deep/10" />
          <div className="relative z-10 m-auto text-center px-12">
            <h1 className="font-display-lg text-display-lg text-white mb-stack-sm drop-shadow-sm">
              Retrouvez votre sanctuaire
            </h1>
            <p className="font-body-lg text-body-lg text-white/90 max-w-md mx-auto italic">
              Un espace dédié à la sérénité et à l'excellence clinique au cœur du Gabon.
            </p>
          </div>
          <div className="absolute bottom-12 left-12 flex items-center gap-4 text-white/70">
            <span className="material-symbols-outlined text-[32px]">spa</span>
            <span className="font-label-md text-label-md tracking-widest uppercase">Équilibre &amp; Harmonie</span>
          </div>
        </section>

        {/* ── Right — Form ── */}
        <section className="w-full lg:w-1/2 flex items-center justify-center bg-surface px-margin-mobile md:px-margin-desktop py-section-gap">
          <div className="w-full max-w-md">

            <div className="text-center md:text-left mb-12">
              <h2 className="font-headline-md text-headline-md text-sage-deep mb-2">Bienvenue</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Veuillez vous connecter pour accéder à votre espace bien-être.
              </p>
            </div>

            <form className="space-y-stack-lg" onSubmit={handleSubmit}>

              {/* Email */}
              <div className="group">
                <label
                  htmlFor="email"
                  className="block font-label-md text-label-md text-on-surface-variant mb-1 group-focus-within:text-primary transition-colors"
                >
                  Adresse e-mail
                </label>
                <input
                  id="email" type="email" required placeholder="votre@email.com"
                  value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-sage-deep transition-all"
                  style={{ boxShadow: 'none' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                />
              </div>

              {/* Password */}
              <div className="group relative">
                <label
                  htmlFor="password"
                  className="block font-label-md text-label-md text-on-surface-variant mb-1 group-focus-within:text-primary transition-colors"
                >
                  Mot de passe
                </label>
                <input
                  id="password" type={showPwd ? 'text' : 'password'} required placeholder="••••••••"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-transparent border-0 border-b border-outline-variant py-3 px-0 pr-8 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:border-sage-deep transition-all"
                  style={{ boxShadow: 'none' }}
                  onFocus={e => (e.currentTarget.style.boxShadow = '0 1px 0 0 #4A594D')}
                  onBlur={e => (e.currentTarget.style.boxShadow = 'none')}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(v => !v)}
                  className="absolute right-0 bottom-3 text-outline hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPwd ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                    className="h-5 w-5 rounded border-outline-variant text-primary focus:ring-primary focus:ring-offset-0 bg-transparent"
                  />
                  <span className="font-body-md text-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                    Se souvenir de moi
                  </span>
                </label>
                <Link
                  to="/forgot-password"
                  className="font-label-md text-label-md text-primary hover:text-sage-deep transition-colors underline underline-offset-4 decoration-outline-variant"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Erreur */}
              {error && (
                <p className="text-error font-body-md text-body-md text-center">{error}</p>
              )}

              {/* CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-stack-lg bg-transparent border-2 border-sage-deep text-sage-deep font-label-md text-label-md uppercase tracking-widest rounded-full hover:bg-sage-deep hover:text-white transition-all duration-300 active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                  <span className="material-symbols-outlined">arrow_forward</span>
                </button>
              </div>
            </form>

            {/* Footer form */}
            <div className="mt-12 pt-8 border-t border-surface-container-highest text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Nouveau parmi nous ?{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline underline-offset-4 ml-1">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* ── Bottom footer ── */}
      <footer className="fixed bottom-0 w-full py-6 px-margin-desktop hidden md:flex justify-between items-center bg-transparent pointer-events-none">
        <p className="font-caption text-caption text-on-surface-variant opacity-60">
          © 2024 Zen Massage &amp; Wellness Gabon. Sanctuaire à travers le design.
        </p>
        <div className="flex gap-stack-lg pointer-events-auto">
          <a href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors">Contact</a>
          <a href="#" className="font-caption text-caption text-on-surface-variant hover:text-primary transition-colors">Confidentialité</a>
        </div>
      </footer>
    </div>
  )
}
