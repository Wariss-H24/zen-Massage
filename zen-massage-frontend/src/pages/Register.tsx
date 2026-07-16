import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/auth.service'

export default function Register() {
  useEffect(() => {
    document.title = 'Inscription | Zen Massage & Wellness Gabon'
  }, [])

  const navigate = useNavigate()
  const { refreshUser } = useAuth()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirm: '', terms: false,
  })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirm) return setError('Les mots de passe ne correspondent pas')
    if (!form.terms) return setError('Veuillez accepter les conditions d\'utilisation')
    setLoading(true)
    try {
      // Inscription — l'API renvoie un cookie de connexion
      await authService.register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        phone: form.phone || undefined,
      })
      // Recharge l'utilisateur connecté
      await refreshUser()
      navigate('/account', { replace: true })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-x-hidden">

      {/* ── Left — Visual ── */}
      <aside className="hidden md:flex md:w-1/2 relative overflow-hidden bg-sage-deep">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPhbPFCP5tNi8Aw_uA6rqWgUQ1zwYturGcSDuq8WSe40XZxEnRAym1carvDz8LXnsJHBGFWrH0JEQXZQizlznyT5MG6eJOpGT5nefpYj190ZoBjhZ0zHpe5qwYca3lmiFsURdcuXHCdgwJyQEDFBwZOlMmeSIdrvNCr-ef5vyrTFEpSolGhvd0x729Uxl6wSUZ5LTMPC_Ow5rGZTw2Z78ImxTNq0S9C1AhZhrgIyVzuxfJMdnaenlirQ')" }}
        />
        <div className="absolute inset-0 bg-sage-deep/20 mix-blend-multiply" />
        <div className="relative z-10 flex flex-col justify-between p-margin-desktop w-full text-white">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-4xl">spa</span>
            <h1 className="font-display-lg text-headline-sm tracking-tight">Zen Massage &amp; Wellness</h1>
          </div>
          <div className="max-w-md">
            <h2 className="font-display-lg text-display-lg mb-stack-md leading-tight">
              Commencez votre voyage vers la sérénité.
            </h2>
            <p className="font-body-lg text-body-lg opacity-90">
              Rejoignez notre sanctuaire et accédez à une expérience de bien-être personnalisée au cœur du Gabon.
            </p>
          </div>
          <p className="font-caption text-caption opacity-70">
            © 2024 Zen Massage &amp; Wellness Gabon. Sanctuaire à travers le design.
          </p>
        </div>
      </aside>

      {/* ── Right — Form ── */}
      <main className="w-full md:w-1/2 min-h-screen bg-surface flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop">

        {/* Mobile logo */}
        <div className="md:hidden flex items-center gap-2 mb-stack-lg w-full">
          <span className="material-symbols-outlined text-primary text-3xl">spa</span>
          <span className="font-display-lg text-headline-sm text-sage-deep">Zen</span>
        </div>

        <div className="w-full max-w-lg">
          <header className="mb-12">
            <h2 className="font-display-lg text-headline-md text-on-surface mb-2">Créer un compte</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Déjà membre ?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline transition-all">
                Se connecter
              </Link>
            </p>
          </header>

          <form className="space-y-stack-lg" onSubmit={handleSubmit}>

            {/* Prénom / Nom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <Field label="Prénom" id="first_name">
                <input
                  type="text" placeholder="Jean" value={form.firstName}
                  onChange={e => set('firstName', e.target.value)}
                  className="w-full bg-transparent py-3 font-body-md text-body-md focus:outline-none placeholder:text-outline-variant/60"
                />
              </Field>
              <Field label="Nom" id="last_name">
                <input
                  type="text" placeholder="Dupont" value={form.lastName}
                  onChange={e => set('lastName', e.target.value)}
                  className="w-full bg-transparent py-3 font-body-md text-body-md focus:outline-none placeholder:text-outline-variant/60"
                />
              </Field>
            </div>

            {/* Email */}
            <Field label="Email" id="email">
              <input
                type="email" placeholder="jean.dupont@exemple.com" value={form.email}
                onChange={e => set('email', e.target.value)}
                className="w-full bg-transparent py-3 font-body-md text-body-md focus:outline-none placeholder:text-outline-variant/60"
              />
            </Field>

            {/* Téléphone */}
            <Field label="Téléphone" id="phone">
              <input
                type="tel" placeholder="+241 00 00 00 00" value={form.phone}
                onChange={e => set('phone', e.target.value)}
                className="w-full bg-transparent py-3 font-body-md text-body-md focus:outline-none placeholder:text-outline-variant/60"
              />
            </Field>

            {/* Mot de passe / Confirmation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
              <Field label="Mot de passe" id="password">
                <input
                  type="password" placeholder="••••••••" value={form.password}
                  onChange={e => set('password', e.target.value)}
                  className="w-full bg-transparent py-3 font-body-md text-body-md focus:outline-none placeholder:text-outline-variant/60"
                />
              </Field>
              <Field label="Confirmation" id="confirm_password">
                <input
                  type="password" placeholder="••••••••" value={form.confirm}
                  onChange={e => set('confirm', e.target.value)}
                  className="w-full bg-transparent py-3 font-body-md text-body-md focus:outline-none placeholder:text-outline-variant/60"
                />
              </Field>
            </div>

            {/* CGU */}
            <div className="flex items-start gap-3 py-4">
              <input
                type="checkbox" id="terms" checked={form.terms}
                onChange={e => set('terms', e.target.checked)}
                className="h-5 w-5 mt-0.5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer flex-shrink-0"
              />
              <label htmlFor="terms" className="font-body-md text-body-md text-on-surface-variant text-sm cursor-pointer">
                J'accepte les{' '}
                <a href="#" className="text-primary hover:underline">conditions d'utilisation</a>
                {' '}et la{' '}
                <a href="#" className="text-primary hover:underline">politique de confidentialité</a>
                {' '}de Zen Massage &amp; Wellness.
              </label>
            </div>

            {/* Erreur */}
            {error && (
              <p className="text-error font-body-md text-body-md text-center">{error}</p>
            )}

            {/* CTA */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 rounded-full border-2 border-primary text-primary font-label-md text-label-md hover:bg-primary hover:text-white transition-all duration-300 group flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? 'Inscription...' : "S'inscrire"}</span>
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </button>
            </div>
          </form>

          {/* Social */}
          <footer className="mt-12 text-center">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px bg-outline-variant/30 flex-grow" />
              <span className="font-caption text-caption text-outline">Ou s'inscrire avec</span>
              <div className="h-px bg-outline-variant/30 flex-grow" />
            </div>
            <div className="flex justify-center gap-stack-md">
              <SocialBtn>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C9.03,19.27 6.59,17.38 6.59,13.21C6.59,9.03 9.07,7.15 12.21,7.15C14.15,7.15 15.75,7.85 16.71,8.74L18.66,6.77C17.1,5.32 14.88,4.42 12.21,4.42C7.3,4.42 3.86,7.85 3.86,13.21C3.86,18.57 7.3,22 12.21,22C16.94,22 21.42,18.69 21.42,13.21C21.42,12.44 21.35,11.1 21.35,11.1Z" fill="currentColor" />
                </svg>
              </SocialBtn>
              <SocialBtn>
                <svg className="w-6 h-6" viewBox="0 0 24 24">
                  <path d="M12,2C6.477,2,2,6.477,2,12c0,5.089,3.803,9.29,8.718,9.897V14.89H8.205V12h2.513V9.803c0-2.48,1.477-3.85,3.737-3.85c1.082,0,2.215,0.193,2.215,0.193v2.435h-1.248c-1.229,0-1.611,0.763-1.611,1.545V12h2.744l-0.439,2.89h-2.305v7.007C18.197,21.29,22,17.089,22,12C22,6.477,17.523,2,12,2z" fill="currentColor" />
                </svg>
              </SocialBtn>
            </div>
          </footer>
        </div>
      </main>
    </div>
  )
}

/* ── Helpers ── */
function Field({ label, id, children }: { label: string; id: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-label-md text-label-md text-on-surface-variant">{label}</label>
      <div className="border-b border-outline-variant focus-within:border-primary focus-within:[box-shadow:0_1px_0_0_#425646] transition-all duration-300">
        {children}
      </div>
    </div>
  )
}

function SocialBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-3 rounded-full border border-outline-variant/50 hover:bg-surface-container-low transition-colors">
      {children}
    </button>
  )
}
