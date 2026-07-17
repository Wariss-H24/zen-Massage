import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import UserLayout from '../components/layout/UserLayout'

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



export default function Account() {
  useEffect(() => {
    document.title = 'Mon Compte | Zen Massage & Wellness Gabon'
  }, [])

  const { user } = useAuth()
  const firstName = user?.firstName || ''

  return (
    <UserLayout title="Tableau de bord"
      headerRight={
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
      }
    >

      <div className="p-6 md:p-margin-desktop space-y-section-gap max-w-container-max mx-auto w-full">

          {/* ── Hero welcome ── */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
            {/* Welcome card */}
            <div className="lg:col-span-2 p-stack-lg bg-surface-container-lowest rounded-xl border border-outline-variant/10 relative overflow-hidden"
              style={{ boxShadow: '0 20px 40px -15px rgba(44,46,48,0.05)' }}>
              <div className="relative z-10">
                <h3 className="font-headline-md text-headline-md text-sage-deep mb-2">Bonjour, {firstName}.</h3>
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

      </div>
    </UserLayout>
  )
}
