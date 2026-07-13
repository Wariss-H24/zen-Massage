import { useEffect, useState } from 'react'
import UserLayout from '../components/layout/UserLayout'

const AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDLqBWhp8GIsV79j2lPT_daTsvYNl_RPIxuxJnpX9WC-m-cfbBPLCgKww4MpTMN76ES3Jkd5heMr2WRFHvJO72qbB1iAOd5O3nxKTUzi704jGHAZr_-2OfVl_ttZuYkSYhLgwQMtspSGmMii_Uev5a7_qacEy6thVjVaRqZnBbDbOYF7C4Q7C09TfhUpGH764835N3LmzzDI3kUjBGaHp66qfXpVTRE44DZgaVfsCxjoBlhQMe_2SdzbQ'

export default function Profile() {
  const [showPwd, setShowPwd] = useState(false)
  const [form, setForm] = useState({
    firstName: 'Elena', lastName: 'Dubois',
    email: 'elena.dubois@exemple.com', phone: '+241 07 00 00 00',
    currentPwd: '', newPwd: '', confirmPwd: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved]   = useState(false)

  useEffect(() => {
    document.title = 'Mon Profil | Zen Massage & Wellness Gabon'
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2500) }, 1500)
  }

  return (
    <UserLayout title="Profil Utilisateur" subtitle="Gérez vos informations personnelles et vos préférences.">

      <div className="px-6 md:px-margin-desktop pb-section-gap pt-stack-lg max-w-4xl">

            <form className="space-y-stack-lg" onSubmit={handleSubmit}>

              {/* Photo */}
              <section className="flex flex-col md:flex-row gap-gutter items-center md:items-start">
                <div className="relative group cursor-pointer">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary-fixed ring-4 ring-background shadow-sm">
                    <img src={AVATAR} alt="Photo de profil" className="w-full h-full object-cover" />
                  </div>
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="material-symbols-outlined text-white text-3xl">photo_camera</span>
                  </div>
                  <div className="absolute bottom-0 right-0 bg-primary text-on-primary p-2 rounded-full shadow-lg border-2 border-background">
                    <span className="material-symbols-outlined text-sm">edit</span>
                  </div>
                </div>

                <div className="text-center md:text-left flex flex-col justify-center">
                  <h3 className="font-label-md text-label-md text-on-surface-variant mb-1">Photo de profil</h3>
                  <p className="font-caption text-caption text-on-surface-variant opacity-70 mb-3">
                    Format JPG, GIF ou PNG. Taille maximale de 2Mo.
                  </p>
                  <div className="flex gap-stack-sm justify-center md:justify-start">
                    <button
                      type="button"
                      className="px-4 py-2 bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-container-highest transition-colors"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      className="px-4 py-2 border border-error text-error rounded-lg font-label-md text-label-md hover:bg-error-container/20 transition-colors"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              </section>

              {/* Informations personnelles */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-gutter pt-stack-lg border-t border-outline-variant/30">
                {[
                  { label: 'Prénom',             key: 'firstName', type: 'text'  },
                  { label: 'Nom',                key: 'lastName',  type: 'text'  },
                  { label: 'Adresse E-mail',     key: 'email',     type: 'email' },
                  { label: 'Numéro de téléphone',key: 'phone',     type: 'tel'   },
                ].map(({ label, key, type }) => (
                  <div key={key} className="space-y-stack-sm">
                    <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
                    <input
                      type={type}
                      value={form[key as keyof typeof form]}
                      onChange={e => set(key, e.target.value)}
                      className="w-full bg-surface border-b border-outline-variant py-3 px-1 font-body-md text-body-md transition-all duration-300 hover:bg-sand-light/30 focus:outline-none focus:border-sage-deep"
                    />
                  </div>
                ))}
              </section>

              {/* Sécurité */}
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

              {/* Actions */}
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
