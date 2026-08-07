import { useEffect, useState } from 'react'
import UserLayout from '../components/layout/UserLayout'
import { useAuth } from '../context/AuthContext'
import { authService } from '../services/auth.service'
import Toast from '../components/ui/Toast'

const getInitials = (firstName: string, lastName: string) =>
  `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase()

export default function Profile() {
  const { user, refreshUser } = useAuth()
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '',
    email: '', phone: '',
    currentPwd: '', newPwd: '', confirmPwd: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)
  const [toast, setToast]   = useState<{ type: 'success' | 'error'; msg: string } | null>(null)

  useEffect(() => {
    if (user) {
      setForm(f => ({
        ...f,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
      }))
    }
  }, [user])

  useEffect(() => {
    document.title = 'Mon Profil | Ben Massage & Wellness Gabon'
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)

      const data: any = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone || null,
      }

      if (form.newPwd && form.newPwd === form.confirmPwd) {
        data.password = form.newPwd
      } else if (form.newPwd && form.newPwd !== form.confirmPwd) {
        setToast({ type: 'error', msg: 'Les nouveaux mots de passe ne correspondent pas' })
        setSaving(false)
        return
      }

      await authService.updateProfile(data)
      await refreshUser()

      setSaved(true)
      setForm(f => ({ ...f, currentPwd: '', newPwd: '', confirmPwd: '' }))
      setTimeout(() => setSaved(false), 2500)
    } catch (err) {
      setToast({ type: 'error', msg: err instanceof Error ? err.message : 'Erreur lors de la mise à jour du profil' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <UserLayout title="Profil Utilisateur" subtitle="Gérez vos informations personnelles et vos préférences.">
      {toast && <Toast type={toast.type} message={toast.msg} onClose={() => setToast(null)} />}

      <div className="px-6 md:px-margin-desktop pb-section-gap pt-stack-lg max-w-4xl">

            <form className="space-y-stack-lg" onSubmit={handleSubmit}>

              <section className="flex flex-col md:flex-row gap-gutter items-center md:items-start">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-fixed ring-4 ring-background shadow-sm bg-sand-light flex items-center justify-center">
                  <span className="font-display-lg text-display-lg-mobile text-sage-deep">
                    {user && getInitials(user.firstName, user.lastName)}
                  </span>
                </div>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-stack-lg border-t border-outline-variant/30">
                {[
                  { label: 'Prénom',             key: 'firstName', type: 'text',  disabled: false },
                  { label: 'Nom',                key: 'lastName',  type: 'text',  disabled: false },
                  { label: 'Adresse E-mail',     key: 'email',     type: 'email', disabled: true },
                  { label: 'Numéro de téléphone',key: 'phone',     type: 'tel',   disabled: false },
                ].map(({ label, key, type, disabled }) => (
                  <div key={key} className="space-y-stack-sm">
                    <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={e => set(key, e.target.value)}
                      disabled={disabled}
                      className={`w-full border-b border-outline-variant py-3 px-1 font-body-md text-body-md transition-all duration-300 ${
                        disabled ? 'bg-surface-container-low text-on-surface-variant cursor-not-allowed' : 'bg-surface hover:bg-sand-light/30 focus:outline-none focus:border-sage-deep'
                      }`}
                    />
                  </div>
                ))}
              </section>

              <section className="pt-stack-lg border-t border-outline-variant/30">
                <h3 className="font-headline-sm text-headline-sm text-sage-deep mb-stack-md">Sécurité du compte</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                  <div className="space-y-stack-sm">
                    <label className="font-label-md text-label-md text-on-surface-variant">Mot de passe actuel</label>
                    <input
                      type="password"
                      value={form.currentPwd}
                      onChange={e => set('currentPwd', e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-surface border-b border-outline-variant py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-sage-deep transition-all"
                    />
                  </div>
                  <div className="space-y-stack-sm relative">
                    <label className="font-label-md text-label-md text-on-surface-variant">Nouveau mot de passe</label>
                    <input
                      type={showPwd ? 'text' : 'password'}
                      value={form.newPwd}
                      onChange={e => set('newPwd', e.target.value)}
                      className="w-full bg-surface border-b border-outline-variant py-3 px-1 pr-8 font-body-md text-body-md focus:outline-none focus:border-sage-deep transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd(v => !v)}
                      className="absolute right-1 bottom-3 text-outline hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {showPwd ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  <div className="space-y-stack-sm">
                    <label className="font-label-md text-label-md text-on-surface-variant">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      value={form.confirmPwd}
                      onChange={e => set('confirmPwd', e.target.value)}
                      className="w-full bg-surface border-b border-outline-variant py-3 px-1 font-body-md text-body-md focus:outline-none focus:border-sage-deep transition-all"
                    />
                  </div>
                </div>
              </section>

              <div className="flex flex-col md:flex-row justify-end gap-stack-md pt-stack-lg">
                <button
                  type="button"
                  className="px-8 py-3 rounded-full border border-sage-deep text-sage-deep font-label-md text-label-md hover:bg-sand-light transition-all duration-300"
                >
                  Annuler les modifications
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className={`px-12 py-3 rounded-full font-label-md text-label-md shadow-lg transition-all duration-300 ${
                    saved
                      ? 'bg-status-confirmed text-white'
                      : 'bg-primary text-on-primary hover:scale-[1.02] shadow-primary/20'
                  } disabled:opacity-70`}
                >
                  {saving ? 'Enregistrement...' : saved ? 'Modifications enregistrées !' : 'Enregistrer les modifications'}
                </button>
              </div>
            </form>

      </div>
    </UserLayout>
  )
}
