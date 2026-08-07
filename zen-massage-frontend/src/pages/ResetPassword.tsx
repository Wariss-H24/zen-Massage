import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { authService } from '../services/auth.service'

type Step = 'form' | 'loading' | 'success' | 'error'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') || ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [step, setStep] = useState<Step>('form')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    document.title = 'Nouveau mot de passe | Ben Massage & Wellness'
    if (!token) {
      setErrorMsg('Lien invalide ou manquant.')
      setStep('error')
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) {
      setErrorMsg('Les mots de passe ne correspondent pas.')
      setStep('error')
      return
    }
    if (password.length < 8) {
      setErrorMsg('Le mot de passe doit contenir au moins 8 caractères.')
      setStep('error')
      return
    }
    setStep('loading')
    setErrorMsg('')
    try {
      await authService.resetPassword(token, password)
      setStep('success')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err: any) {
      setErrorMsg(err.message || 'Lien invalide ou expiré.')
      setStep('error')
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">

      {/* Décor fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sand-light/60 blur-3xl" />
      </div>

      <main className="relative z-10 w-full max-w-md">
        <div
          className="rounded-xl p-stack-lg shadow-sm border border-white/30"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)' }}
        >
          {/* Brand */}
          <div className="flex flex-col items-center mb-stack-lg">
            <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-stack-md text-primary">
              <span className="material-symbols-outlined text-4xl">lock_reset</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-sage-deep mb-1">Nouveau mot de passe</h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-center px-gutter">
              Choisissez un mot de passe sécurisé d'au moins 8 caractères.
            </p>
          </div>

          {/* Succès */}
          {step === 'success' && (
            <div className="text-center py-stack-md">
              <div className="w-12 h-12 bg-status-confirmed/20 text-status-confirmed rounded-full flex items-center justify-center mx-auto mb-stack-md">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              </div>
              <p className="font-headline-sm text-headline-sm text-sage-deep mb-1">Mot de passe mis à jour !</p>
              <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                Vous allez être redirigé vers la connexion…
              </p>
              <Link to="/login" className="text-primary font-label-md hover:underline">
                Aller à la connexion
              </Link>
            </div>
          )}

          {/* Formulaire */}
          {step !== 'success' && (
            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1 ml-1">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPwd ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => { setPassword(e.target.value); setStep('form') }}
                    placeholder="8 caractères minimum"
                    className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 pr-12 font-body-md text-body-md text-on-surface rounded-t-lg placeholder:text-on-surface-variant/40 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd(v => !v)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined text-[20px]">{showPwd ? 'visibility_off' : 'visibility'}</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-label-md text-label-md text-secondary mb-1 ml-1">
                  Confirmer le mot de passe
                </label>
                <input
                  type={showPwd ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={e => { setConfirm(e.target.value); setStep('form') }}
                  placeholder="Répétez le mot de passe"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 font-body-md text-body-md text-on-surface rounded-t-lg placeholder:text-on-surface-variant/40 outline-none"
                />
              </div>

              {step === 'error' && errorMsg && (
                <div className="flex items-center gap-2 bg-error-container text-on-error-container px-4 py-3 rounded-xl text-sm">
                  <span className="material-symbols-outlined text-[18px]">error</span>
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={step === 'loading' || !token}
                className="w-full bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md transition-all hover:bg-sage-deep active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {step === 'loading'
                  ? <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  : <><span>Enregistrer le mot de passe</span><span className="material-symbols-outlined text-lg">check</span></>
                }
              </button>
            </form>
          )}

          <div className="mt-stack-lg pt-stack-md border-t border-outline-variant/30 flex justify-center">
            <Link
              to="/login"
              className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
            >
              <span className="material-symbols-outlined text-lg">keyboard_backspace</span>
              Retour à la connexion
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
