import { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { useAuth } from '../../context/AuthContext'

type Tab = 'profile' | 'notifications' | 'security' | 'system'

/* ── Toggle switch ── */
function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-11 h-6 rounded-full relative transition-colors duration-300 flex-shrink-0 ${checked ? 'bg-primary' : 'bg-surface-container-highest'}`}
    >
      <div className={`absolute top-1 h-4 w-4 bg-white rounded-full shadow transition-all duration-300 ${checked ? 'right-1' : 'left-1'}`} />
    </button>
  )
}

/* ── Underline input ── */
function UInput({ label, type = 'text', defaultValue = '', rows }: { label: string; type?: string; defaultValue?: string; rows?: number }) {
  const base = 'w-full bg-transparent border-0 border-b border-outline-variant py-2 px-0 font-body-md text-body-md focus:outline-none transition-colors'
  const focus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderBottomColor = '#4A594D')
  const blur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    (e.currentTarget.style.borderBottomColor = '')

  return (
    <div className="space-y-1">
      <label className="font-label-md text-label-md text-on-surface-variant">{label}</label>
      {rows ? (
        <textarea rows={rows} defaultValue={defaultValue} className={`${base} resize-none`} onFocus={focus} onBlur={blur} />
      ) : (
        <input type={type} defaultValue={defaultValue} className={base} onFocus={focus} onBlur={blur} />
      )}
    </div>
  )
}

/* ── Number row ── */
function NumRow({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div className="flex items-center justify-between">
      <label className="font-body-md text-on-surface-variant">{label}</label>
      <input
        type="number"
        defaultValue={defaultValue}
        className="w-20 text-right bg-transparent border-0 border-b border-outline-variant focus:outline-none font-semibold"
      />
    </div>
  )
}

export default function Settings() {
  const { user } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')
  const [notifs, setNotifs] = useState({ bookings: true, daily: false, stock: true, newsletter: false })

  useEffect(() => { document.title = 'Paramètres | Admin Ben Massage' }, [])

  const initials = user ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase() : '?'

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile',       label: 'Profil' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'security',      label: 'Sécurité' },
    { id: 'system',        label: 'Paramètres Système' },
  ]

  return (
    <AdminLayout title="Paramètres">
        <div className="px-8 pb-20 pt-8 max-w-5xl mx-auto">

          {/* Tab nav */}
          <div className="flex gap-8 mb-8 border-b border-outline-variant">
            {tabs.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`pb-3 font-label-md text-label-md transition-all ${
                  tab === t.id
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ── Profil ── */}
          {tab === 'profile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="font-headline-sm text-headline-sm mb-2">Informations Personnelles</h3>
                <p className="font-body-md text-on-surface-variant opacity-80">Mettez à jour vos détails personnels et votre adresse email.</p>
                <div className="mt-8 flex flex-col items-center md:items-start">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-surface-container relative group cursor-pointer flex items-center justify-center text-4xl font-bold text-sage-deep">
                    <span>{initials}</span>
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                      <span className="material-symbols-outlined text-white">photo_camera</span>
                    </div>
                  </div>
                  <button className="mt-4 text-primary font-label-md text-label-md hover:underline">Changer la photo</button>
                </div>
              </div>

              <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <UInput label="Prénom" defaultValue={user?.firstName || ''} />
                  <UInput label="Nom" defaultValue={user?.lastName || ''} />
                </div>
                <UInput label="Email Professionnel" type="email" defaultValue={user?.email || ''} />
                <UInput label="Bio / Spécialité" defaultValue="Spécialiste en massages thérapeutiques et aromathérapie holistique. 12 ans d'expérience." rows={3} />
                <div className="pt-4 flex justify-end gap-4">
                  <button className="px-6 py-2 font-label-md text-label-md text-primary border border-primary rounded-full hover:bg-primary-fixed transition-colors">
                    Annuler
                  </button>
                  <button className="px-6 py-2 font-label-md text-label-md text-white rounded-full hover:opacity-90 active:scale-95 transition-all shadow-md" style={{ backgroundColor: '#425646' }}>
                    Sauvegarder
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── Notifications ── */}
          {tab === 'notifications' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="font-headline-sm text-headline-sm mb-2">Centre de Notifications</h3>
                <p className="font-body-md text-on-surface-variant opacity-80">Gérez comment et quand vous souhaitez être informé des activités de la plateforme.</p>
              </div>
              <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm divide-y divide-outline-variant/30">
                {([
                  { key: 'bookings',    title: 'Confirmations de rendez-vous', desc: 'Recevoir un email pour chaque nouvelle réservation.' },
                  { key: 'daily',       title: 'Rappels quotidiens',           desc: 'Récapitulatif de votre agenda chaque matin à 08h00.' },
                  { key: 'stock',       title: 'Alertes de stock',             desc: 'Notification lorsque vos produits atteignent le seuil critique.' },
                  { key: 'newsletter',  title: 'Newsletters & Mises à jour',   desc: 'Conseils bien-être et nouvelles fonctionnalités admin.' },
                ] as const).map(item => (
                  <div key={item.key} className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-label-md text-label-md text-on-surface">{item.title}</p>
                      <p className="font-caption text-on-surface-variant">{item.desc}</p>
                    </div>
                    <Toggle
                      checked={notifs[item.key]}
                      onChange={() => setNotifs(n => ({ ...n, [item.key]: !n[item.key] }))}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Sécurité ── */}
          {tab === 'security' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <h3 className="font-headline-sm text-headline-sm mb-2">Sécurité & Accès</h3>
                <p className="font-body-md text-on-surface-variant opacity-80">Protégez votre compte avec des mesures de sécurité avancées.</p>
              </div>
              <div className="md:col-span-2 space-y-6">
                {/* Password */}
                <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center gap-3 text-primary">
                    <span className="material-symbols-outlined">lock</span>
                    <h4 className="font-label-md text-label-md">Changer le mot de passe</h4>
                  </div>
                  <UInput label="Mot de passe actuel" type="password" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UInput label="Nouveau mot de passe" type="password" />
                    <UInput label="Confirmer" type="password" />
                  </div>
                  <button className="px-6 py-2 font-label-md text-label-md text-primary border border-primary rounded-full hover:bg-primary-fixed transition-colors">
                    Mettre à jour le mot de passe
                  </button>
                </div>

                {/* 2FA */}
                <div className="bg-white rounded-xl p-6 shadow-sm flex items-center justify-between border-l-4 border-[#7A9E7E]">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full" style={{ backgroundColor: 'rgba(122,158,126,0.1)' }}>
                      <span className="material-symbols-outlined text-[#7A9E7E]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                    </div>
                    <div>
                      <h4 className="font-label-md text-label-md">Double Authentification (2FA)</h4>
                      <p className="font-caption text-on-surface-variant">Sécurisez votre accès avec un code mobile.</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full font-label-md text-[12px] text-[#7A9E7E]" style={{ backgroundColor: 'rgba(122,158,126,0.2)' }}>
                    ACTIVÉ
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* ── Paramètres Système ── */}
          {tab === 'system' && (
            <div className="space-y-8">
              {/* Banner */}
              <div className="bg-primary-fixed/30 p-6 rounded-xl border border-primary-fixed-dim flex items-center gap-4">
                <span className="material-symbols-outlined text-primary text-3xl">admin_panel_settings</span>
                <div>
                  <h3 className="font-headline-sm text-[20px] text-primary">Contrôles Administrateur</h3>
                  <p className="font-body-md text-on-surface-variant">Configuration globale de la boutique et de la facturation.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fiscalité */}
                <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                  <h4 className="font-label-md text-label-md border-b border-outline-variant pb-2">Fiscalité & Commissions</h4>
                  <div className="space-y-4">
                    <NumRow label="TVA applicable (%)" defaultValue="20" />
                    <NumRow label="Commission plateforme (%)" defaultValue="12" />
                    <NumRow label="Frais de service fixe (€)" defaultValue="1.50" />
                  </div>
                </div>

                {/* Logistique */}
                <div className="bg-white rounded-xl p-6 shadow-sm space-y-6">
                  <h4 className="font-label-md text-label-md border-b border-outline-variant pb-2">Expédition & Logistique</h4>
                  <div className="space-y-4">
                    <NumRow label="Livraison standard (€)" defaultValue="4.90" />
                    <NumRow label="Gratuité à partir de (€)" defaultValue="75" />
                    <NumRow label="Délai prép. max (h)" defaultValue="48" />
                  </div>
                </div>

                {/* Boutique config */}
                <div className="md:col-span-2 bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-label-md text-label-md border-b border-outline-variant pb-4 mb-4">Configuration de la Boutique</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { icon: 'language',    title: 'Devises & Langues',       sub: 'EUR, FR/EN configurés' },
                      { icon: 'storefront',  title: "Horaires d'Ouverture",    sub: 'Lun-Sam: 09h00-19h00' },
                      { icon: 'credit_card', title: 'Passerelles de Paiement', sub: 'Stripe & PayPal actifs' },
                    ].map(card => (
                      <div key={card.icon} className="p-4 border border-outline-variant rounded-lg hover:border-primary transition-colors cursor-pointer group">
                        <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary mb-2 block">{card.icon}</span>
                        <p className="font-label-md text-label-md">{card.title}</p>
                        <p className="font-caption text-on-surface-variant">{card.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
    </AdminLayout>
  )
}
