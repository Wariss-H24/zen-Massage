import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'

/* ── Types ── */
type Tab = 'appointments' | 'orders' | 'profile'

/* ── Data ── */
const APPOINTMENTS = [
  {
    id: 1,
    service: 'Massage Deep Tissue',
    duration: '90 Minutes',
    practitioner: 'Sarah M.',
    date: 'Jeudi, 12 Octobre',
    time: '14:00 - 15:30',
    location: 'Libreville Océan',
    status: 'Confirmé',
    statusColor: 'bg-primary-fixed/50 text-primary border-primary/10',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7fF2QWmKYL_7wwG7PTSzNj9l3ZrgiVstq3BDTrhnuhk3-h8x1bxQjG6rIJmke6UZ2jrN_QDWlCjmpFMoq_2fEQk9Xh2k_jLeSaoLVkTy3mdK1AbH4LvgJTMSTgqvafaB_m6a5e7iGO_F7O5ZD8qUjsOppM4athINOr3XdRQY-WzrjRt3i0wxSG8EU0zExr4w1225LlA4DTiraURwpLCOq0ZiY3oaMQWG4uj-V2tKrzJQp_zcbn0G-it2TervdqIBNNil1iMdP12b1',
  },
  {
    id: 2,
    service: 'Soin Pierres Chaudes',
    duration: '60 Minutes',
    practitioner: 'Jean-Luc K.',
    date: 'Mardi, 24 Octobre',
    time: '10:00 - 11:00',
    location: 'Sanctuaire Nord',
    status: 'En attente',
    statusColor: 'bg-surface-variant text-on-surface-variant border-outline-variant/30',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD-6XFT8hunBjIwPKDhAmiWvctnPKEdH8YhFYE7DMrXybX_4HuDMCfQqsKx5akIXm7HLiKbuig81Dbb5NuqkVDNJWigmcg7ueq9PlOVVDMtaMTSzDCFnhA-_Ize71on4inGAg149joDR8Y1DgdqULQnhiXHZnCz_4CqkZtjwCNz7xdAskZEz3STHzXHHnBNrtkyLmdqAhLPe6Tw1asnXj5MlDIhKtuohNCh1H8olesOUVpGSLtjhLXO7QjmNIoLdyz543Xhftdp9N01',
    opacity: true,
  },
]

const ORDERS = [
  {
    id: '#ZEN-89422',
    date: '05 Sept 2024',
    total: '45.000 FCFA',
    status: 'Livré',
    imgs: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCuu-8LDWZ5xdKz_mLHHBkAXaj5IsxVqNDzH5T5tmUbspxWN7eZfNG1up_svzzSvGHlb_qxwPZmkt-RnS7PV_PwxDslokzXunjxLak-jTls5-Y820fFiNqs4cK1gd5xiaDqNXwXzY68SNd8nDF9ZTaaEs79P4FX6nftY3J6_sDLv-JT4WwmElDOny_M5jhRdEcs6uXDKNdKrLc3FxqFWeEmyahX983bPNL01vnGqcNoQrHqRp9960e6ov1c0wHWUTDzwF9xD-dw_Kco',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB_3KTi-JEUPTo1Pnys7v1ScMsyh1z3f7Zuh2LVJtOv3JA082B_3hzGaZpefGgGtGNLAB7rNuwYbj8c2zmUo06R0g53GZzRT0IdcbNUbsK4Syr41gzPVgpzl5WsMOD_Y_heL3nsquadcwRQ-UMnBouWoVtBTmC6ySR9ls1I749XRmJPmw82fd4MSGNrtvE8hkSGIWZnAlwLM3Qae7HlYqpaPGt2FqmaSN54cV2g4g8zyXJRA4UypMD8tTiRr-UMhUDseLJe98pGchd7',
    ],
    extra: 1,
  },
  {
    id: '#ZEN-87103',
    date: '12 Août 2024',
    total: '12.500 FCFA',
    status: 'Livré',
    imgs: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDbXlz2mqAGoBF_eMVm--UJAF0tA3VlmwP3GeYL5f4Pmq1g1edYH1byOk4DGPVsCF9dgP5Wt17xXFc2EPvdbrdm880_raBY3FOUScCDNiZ9XC-jCEB7P_9K00LnhI4CYBtiT55g0QqrgiEO-_vxCgfG4Ya8fWxQzOmxieGHViA5ptcDd8RSaYYfH1On3NTimMR_Bs_xCMbxZZ3q53cb-rU6Pcj5l_arhEWktjHwDQbY1sRKIFn5z7nruNgdrvtuIAt06OZ4dpTdIZPI',
    ],
    extra: 0,
  },
]

/* ── Sidebar nav items ── */
const NAV = [
  { id: 'appointments' as Tab, label: 'Rendez-vous', icon: 'calendar_today' },
  { id: 'orders'       as Tab, label: 'Commandes',   icon: 'shopping_bag' },
  { id: 'profile'      as Tab, label: 'Profil',      icon: 'person' },
]

export default function Account() {
  const [tab, setTab] = useState<Tab>('appointments')

  useEffect(() => {
    document.title = 'Mon Compte | Zen Massage & Wellness Gabon'
  }, [])

  return (
    <div className="flex min-h-screen bg-background">

      {/* ── Sidebar ── */}
      <aside className="hidden md:flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-surface-container-low overflow-y-auto p-stack-md">
        <div className="mb-stack-lg px-2">
          <h1 className="font-headline-sm text-headline-sm text-sage-deep mb-1">Mon Compte Zen</h1>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Bienvenue au sanctuaire</p>
        </div>

        <nav className="flex-1 space-y-2">
          {NAV.map(n => (
            <button
              key={n.id}
              onClick={() => setTab(n.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
                tab === n.id
                  ? 'text-primary font-bold border-r-4 border-primary bg-surface-container-high'
                  : 'text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              <span className="material-symbols-outlined">{n.icon}</span>
              <span className="font-label-md text-label-md">{n.label}</span>
            </button>
          ))}
        </nav>

        {/* User info */}
        <div className="mt-auto pt-6 border-t border-outline-variant/30 flex items-center gap-4 px-2">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-sand-light flex-shrink-0">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR9YP2ilAO3sGRJTf7D0dVSbJXx3F_DaIzLcixdJSaYXX0NxaakKlAgcVCfUUaNH8rM8e10nUaIpus_fZImSdkxVHtmAlkfSevUvWtXtJ4tJOZys40pzX6Y9knrryM7FryYoEmTRFHRV-oQPo7UBkUEYDuR9jqNKAkquFMeInvS-_8oi_NjYflrAeKkET38drF1XMHROyVuMhHtbeQ9MI2Wi78xl1PmaFlPqSAWvPihwT75FbtqQJiCJMOCxs38DFdMwy-8k1L9YN4"
              alt="Avatar" className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-md text-label-md text-sage-deep truncate">Marc Dupont</span>
            <span className="font-caption text-caption text-on-surface-variant">Membre Sérénité</span>
          </div>
        </div>

        <Link
          to="/appointments"
          className="mt-6 w-full py-3 px-4 border border-sage-deep text-sage-deep rounded-xl font-label-md text-label-md text-center hover:bg-sage-deep hover:text-white transition-all duration-300"
        >
          Nouvelle Session
        </Link>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 md:ml-64 min-h-screen flex flex-col">

        {/* Top bar */}
        <header className="h-16 flex items-center justify-between px-6 md:px-margin-desktop sticky top-0 z-40 border-b border-outline-variant/10"
          style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(250,249,247,0.9)' }}>
          <h2 className="font-headline-sm text-headline-sm text-sage-deep">Tableau de bord</h2>
          <div className="flex items-center gap-6">
            <button className="text-on-surface-variant hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <div className="h-8 w-px bg-outline-variant/30" />
            <div className="text-right hidden sm:block">
              <p className="font-caption text-caption text-on-surface-variant">Statut du compte</p>
              <p className="font-label-md text-label-md text-status-confirmed">Actif • Premium</p>
            </div>
          </div>
        </header>

        <div className="p-6 md:p-margin-desktop space-y-section-gap max-w-container-max mx-auto w-full pb-24 md:pb-0">

          {/* ── Hero welcome ── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Welcome card */}
            <div className="lg:col-span-2 p-stack-lg bg-surface-container-lowest rounded-xl border border-outline-variant/10 relative overflow-hidden"
              style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md text-sage-deep mb-2">Bonjour, Marc.</h3>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mb-6">
                  Votre sanctuaire vous attend. Vous avez 2 sessions prévues ce mois-ci et 150 points de fidélité Zen cumulés.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="px-6 py-4 bg-sand-light rounded-xl">
                    <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-widest mb-1">Prochaine séance</span>
                    <span className="block font-headline-sm text-headline-sm text-sage-deep">12 Octobre, 14:00</span>
                  </div>
                  <div className="px-6 py-4 bg-primary-fixed/30 rounded-xl">
                    <span className="block font-caption text-caption text-on-surface-variant uppercase tracking-widest mb-1">Points Zen</span>
                    <span className="block font-headline-sm text-headline-sm text-primary">1 250 pts</span>
                  </div>
                </div>
              </div>
              {/* Decorative bg */}
              <div className="absolute right-0 top-0 h-full w-1/3 opacity-10 pointer-events-none">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDf8oOe1c5I_o-0GeBJBD8FvHgWv6rmkhNSLbBa4R3I7R1PmZRDVNAqdqT9r6AgdKjdPbmGPVtuZ3DvL0SpEJF7ke8do3D2tQg7y5kX0rfSialdY2u2GoFO7tVCSJXMnmwv192A-6giw9dNfo3oTyGCM9VL8o7Btzd3x0zrt7wlM4ODDQVhFrJhR7xJT3haYmV63gyblKZNN2sQghC9cl4wBTSxm-HU3xUR7DrgxINuofCzZIgfb3B7lH6E97K-GXPFk_15r0Yl3FdQ"
                  alt="" className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>

            {/* Promo card */}
            <div className="bg-sage-deep text-surface p-stack-lg rounded-xl flex flex-col justify-between"
              style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
              <div>
                <span className="material-symbols-outlined text-4xl mb-4 block">spa</span>
                <h4 className="font-headline-sm text-headline-sm mb-2">Offre Exclusive</h4>
                <p className="font-body-md text-body-md opacity-80">
                  -20% sur les soins aux huiles de forêt équatoriale ce weekend.
                </p>
              </div>
              <button className="w-full py-3 bg-surface text-sage-deep rounded-lg font-label-md text-label-md hover:bg-sand-light transition-colors mt-6">
                Profiter maintenant
              </button>
            </div>
          </section>

          {/* ── Appointments ── */}
          {(tab === 'appointments') && (
            <section>
              <div className="flex justify-between items-end mb-stack-md">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-sage-deep">Mes prochains rendez-vous</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Gérez vos moments de détente</p>
                </div>
                <button className="font-label-md text-label-md text-primary border-b border-primary hover:opacity-70 transition-opacity">
                  Voir tout l'historique
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {APPOINTMENTS.map(appt => (
                  <div
                    key={appt.id}
                    className={`bg-surface-container-lowest p-stack-md rounded-xl border border-outline-variant/20 hover:border-primary/30 transition-all duration-300 ${appt.opacity ? 'opacity-80' : ''}`}
                    style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <img src={appt.img} alt={appt.service} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="font-label-md text-label-md text-sage-deep">{appt.service}</h4>
                          <p className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">schedule</span>
                            {appt.duration}
                          </p>
                          <p className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">person_pin</span>
                            Praticien: {appt.practitioner}
                          </p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 text-caption font-bold rounded-full border ${appt.statusColor}`}>
                        {appt.status}
                      </span>
                    </div>

                    <div className="bg-surface-container-low rounded-lg p-3 mb-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-sage-deep">calendar_month</span>
                        <div>
                          <p className="font-label-md text-label-md text-sage-deep">{appt.date}</p>
                          <p className="font-caption text-caption text-on-surface-variant">{appt.time}</p>
                        </div>
                      </div>
                      <p className="font-label-md text-label-md text-sage-deep">{appt.location}</p>
                    </div>

                    <div className="flex gap-3">
                      <button className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant rounded-lg transition-colors border border-outline-variant/30">
                        Modifier
                      </button>
                      <button className="flex-1 py-2 font-label-md text-label-md text-error hover:bg-error-container/20 rounded-lg transition-colors border border-error/20">
                        Annuler
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ── Orders ── */}
          {(tab === 'orders') && (
            <section>
              <div className="flex justify-between items-end mb-stack-md">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-sage-deep">Historique des commandes</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Vos produits de bien-être à domicile</p>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden"
                style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
                <table className="w-full text-left border-collapse">
                  <thead className="bg-surface-container-low">
                    <tr>
                      {['N° Commande', 'Date', 'Produits', 'Statut', 'Total'].map((h, i) => (
                        <th key={h} className={`px-6 py-4 font-label-md text-label-md text-sage-deep ${i === 4 ? 'text-right' : ''}`}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {ORDERS.map(order => (
                      <tr key={order.id} className="hover:bg-surface-container-low/50 transition-colors cursor-pointer">
                        <td className="px-6 py-4 font-label-md text-label-md text-on-surface">{order.id}</td>
                        <td className="px-6 py-4 font-body-md text-body-md text-on-surface-variant">{order.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex -space-x-2">
                            {order.imgs.map((img, i) => (
                              <div key={i} className="w-8 h-8 rounded-full border-2 border-surface overflow-hidden">
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </div>
                            ))}
                            {order.extra > 0 && (
                              <div className="w-8 h-8 rounded-full border-2 border-surface bg-sand-light flex items-center justify-center text-[10px] font-bold text-sage-deep">
                                +{order.extra}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-status-confirmed/20 text-status-confirmed font-caption font-bold rounded-full">
                            <span className="w-2 h-2 rounded-full bg-status-confirmed" />
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-label-md text-label-md text-right text-sage-deep">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* ── Profile ── */}
          {tab === 'profile' && (
            <section className="max-w-2xl">
              <h3 className="font-headline-sm text-headline-sm text-sage-deep mb-stack-md">Mon profil</h3>
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 p-stack-lg space-y-stack-lg"
                style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-sand-light flex-shrink-0">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR9YP2ilAO3sGRJTf7D0dVSbJXx3F_DaIzLcixdJSaYXX0NxaakKlAgcVCfUUaNH8rM8e10nUaIpus_fZImSdkxVHtmAlkfSevUvWtXtJ4tJOZys40pzX6Y9knrryM7FryYoEmTRFHRV-oQPo7UBkUEYDuR9jqNKAkquFMeInvS-_8oi_NjYflrAeKkET38drF1XMHROyVuMhHtbeQ9MI2Wi78xl1PmaFlPqSAWvPihwT75FbtqQJiCJMOCxs38DFdMwy-8k1L9YN4"
                      alt="Avatar" className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-headline-sm text-headline-sm text-sage-deep">Marc Dupont</p>
                    <p className="font-caption text-caption text-on-surface-variant">Membre Sérénité · Depuis 2023</p>
                  </div>
                </div>
                {[
                  { label: 'Prénom', value: 'Marc' },
                  { label: 'Nom', value: 'Dupont' },
                  { label: 'Email', value: 'marc.dupont@exemple.com' },
                  { label: 'Téléphone', value: '+241 07 00 00 00' },
                ].map(f => (
                  <div key={f.label} className="border-b border-outline-variant/30 pb-4">
                    <label className="font-label-md text-label-md text-on-surface-variant block mb-1">{f.label}</label>
                    <p className="font-body-md text-body-md text-on-surface">{f.value}</p>
                  </div>
                ))}
                <button className="py-3 px-8 border-2 border-primary text-primary font-label-md text-label-md rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                  Modifier le profil
                </button>
              </div>
            </section>
          )}

        </div>

        <Footer />
      </main>

      {/* ── Mobile bottom nav ── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-outline-variant/10 flex justify-around items-center py-3"
        style={{ backdropFilter: 'blur(12px)', backgroundColor: 'rgba(250,249,247,0.9)' }}>
        <MobileNavBtn icon="calendar_today" label="Rdv"     active={tab === 'appointments'} onClick={() => setTab('appointments')} />
        <MobileNavBtn icon="shopping_bag"   label="Boutique" active={tab === 'orders'}       onClick={() => setTab('orders')} />
        {/* FAB center */}
        <div className="relative -top-6">
          <Link to="/appointments" className="w-14 h-14 bg-sage-deep text-surface rounded-full shadow-lg flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl">add</span>
          </Link>
        </div>
        <MobileNavBtn icon="notifications" label="Alertes" active={false} onClick={() => {}} />
        <MobileNavBtn icon="person"        label="Profil"  active={tab === 'profile'}  onClick={() => setTab('profile')} />
      </nav>
    </div>
  )
}

function MobileNavBtn({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors ${active ? 'text-primary' : 'text-on-surface-variant opacity-60'}`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      <span className="text-[10px] font-label-md">{label}</span>
    </button>
  )
}
