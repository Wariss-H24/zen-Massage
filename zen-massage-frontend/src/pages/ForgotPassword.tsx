import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

type Step = 'form' | 'loading' | 'success'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState<Step>('form')

  useEffect(() => {
    document.title = 'Récupération de mot de passe | Zen Massage & Wellness'
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStep('loading')
    setTimeout(() => setStep('success'), 1500)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop relative overflow-hidden">

      {/* Décor fond */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-sand-light/60 blur-3xl" />
      </div>

      {/* Card principale */}
      <main className="relative z-10 w-full max-w-md animate-[fadeIn_0.6s_ease-out]">
        <div
          className="rounded-xl p-stack-lg shadow-sm border border-white/30"
          style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)' }}
        >
          {/* Brand */}
          <div className="flex flex-col items-center mb-stack-lg">
            <div className="w-16 h-16 bg-primary-fixed rounded-full flex items-center justify-center mb-stack-md text-primary">
              <span className="material-symbols-outlined text-4xl">spa</span>
            </div>
            <h1 className="font-headline-md text-headline-md text-sage-deep mb-1">Zen Wellness</h1>
            <p className="font-body-md text-body-md text-on-surface-variant text-center px-gutter">
              Sérénité retrouvée. Entrez votre email pour réinitialiser votre accès.
            </p>
          </div>

          {/* Formulaire */}
          {step !== 'success' && (
            <form className="space-y-stack-md" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block font-label-md text-label-md text-secondary mb-1 ml-1"
                >
                  Adresse Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="nom@exemple.com"
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant focus:border-primary focus:ring-0 transition-all px-4 py-3 font-body-md text-body-md text-on-surface rounded-t-lg placeholder:text-on-surface-variant/40 outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={step === 'loading'}
                className="w-full group relative overflow-hidden bg-primary text-on-primary py-4 rounded-xl font-label-md text-label-md transition-all hover:bg-sage-deep active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {step === 'loading' ? (
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                ) : (
                  <>
                    <span>Envoyer le lien de réinitialisation</span>
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Message succès */}
          {step === 'success' && (
            <div className="text-center py-stack-md animate-[fadeIn_0.5s_ease-out]">
              <div className="w-12 h-12 bg-status-confirmed/20 text-status-confirmed rounded-full flex items-center justify-center mx-auto mb-stack-md">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
              <p className="font-headline-sm text-headline-sm text-sage-deep mb-1">Lien envoyé</p>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Consultez votre boîte de réception pour continuer.
              </p>
            </div>
          )}

          {/* Retour connexion */}
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

        {/* Badge sécurité */}
        <div className="mt-stack-lg flex justify-center opacity-60">
          <div className="flex items-center gap-stack-sm text-on-surface-variant font-caption text-caption">
            <span className="material-symbols-outlined text-sm">lock</span>
            <span>Connexion sécurisée par cryptage 256-bit</span>
          </div>
        </div>
      </main>

      {/* Citation footer */}
      <footer className="fixed bottom-gutter left-0 w-full text-center pointer-events-none">
        <p className="font-headline-sm text-headline-sm text-on-surface-variant/20 italic opacity-50">
          Le calme est le berceau de la clarté.
        </p>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
