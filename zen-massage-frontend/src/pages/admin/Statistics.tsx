import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'

/* ── Data ── */
const STATS = [
  {
    label: 'Revenu Total (Mois)',
    value: '12.450 €',
    trend: '+14.2% vs mois dernier',
    up: true,
  },
  {
    label: "Taux d'Occupation",
    value: '82%',
    trend: "+5% d'efficacité",
    up: true,
  },
  {
    label: 'Nouveaux Clients',
    value: '124',
    trend: 'Stable',
    up: null,
  },
]

const BARS = [
  { month: 'JAN', revenue: 45, occupation: 30 },
  { month: 'FEV', revenue: 60, occupation: 45 },
  { month: 'MAR', revenue: 55, occupation: 40 },
  { month: 'AVR', revenue: 85, occupation: 65 },
  { month: 'MAI', revenue: 70, occupation: 50 },
  { month: 'JUN', revenue: 95, occupation: 80 },
]

const TOP_SERVICES = [
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTYaaA2sgtlpR7ZtX_Jc9BL-Ffj809HJzXUeGziwzR63ehTviOkXa48lpoX331oTFxOkTTV0zhc60ZvIKY7EaxjeU2vuPpx8ASBysBI6urOhrr7Z_O91_MO_kB2wPkBdoIO9eChaad2eneJ4I--e0nemBB6R4sJXklCohN7oLyL3tynzluZfPjCG1JwHbYKVaU-Cj_CHRQyWEMQic1Mkj2jPJjnte2Sgu038TIx_DFzIG46ZpxNhTOpGu60g-m7MmECbeDjKpBr7mQ',
    name: 'Massage Suédois',
    sessions: '420 sessions / mois',
    revenue: '€24k',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAx-tCusQzlDelxM5LW-FkbxAuzd4H__C4r5i5UPngYtFkX6PraR9MH3CdIDIISphEbIEuPVJPekpJigw-yXRwdtga6mpBAqYTUqfD3H8qpohRoJsGBeH3T07EfLfItV0bb6nJOiJo78t5l0pAxQx6Lv_kzztzKeBNTfXBzNm-AsZ0Twhx1oZJFw7RfI9D3c_fUdqLwULW_Llw2kH0C3XkBUTn2w0olPPkLnLWzaJA6eiKSg1w_RvSZFxj2f0x3D8kKFeaJA4dunmLJ',
    name: 'Éclat du Visage',
    sessions: '215 sessions / mois',
    revenue: '€18k',
  },
  {
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLlz_GydIahyWAL4qbMYRqHnYsN0d6c-_wLgRmPP9fDKbT4kqOegn5ebWX6NYpH2Dr0Im4aZo2I6WwmV8Gj8hRcon0fbZMJRy-nwcWAHayR_XW1TdBp6eUtpJDqv0rXgYEMDfZtkhfpfHTN1FwYKx_J5gSp-gCtjuV6uOBorehCAcsO_z8R9DewOubnmPnb1eAW6CY21k-mlljhXVVpN01Z4AkxAwGyNlI7rb3r_FO_TLpFrN_QSZFoKlAkqk7keHUTgEAebwPkvKB',
    name: 'Aromathérapie',
    sessions: '180 sessions / mois',
    revenue: '€12k',
  },
]

const TRANSACTIONS = [
  { initials: 'MB', bg: 'bg-secondary-fixed', text: 'text-on-secondary-fixed', name: 'Marie Bernard',    service: 'Massage Pierre Chaudes', date: '12 Juin, 14:00', amount: '95 €',  status: 'Confirmé' },
  { initials: 'JR', bg: 'bg-primary-fixed',   text: 'text-primary',            name: 'Jean-Luc Richard', service: 'Soin Énergie Vital',      date: '12 Juin, 11:30', amount: '120 €', status: 'Confirmé' },
  { initials: 'AL', bg: 'bg-secondary-container', text: 'text-on-secondary-container', name: 'Alice Laurent', service: 'Abonnement Zen Gold', date: '11 Juin, 17:45', amount: '550 €', status: 'Confirmé' },
]

/* ── Animated bar ── */
function Bar({ height, color, delay }: { height: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = '0%'
    const t = setTimeout(() => { el.style.height = `${height}%` }, delay + 300)
    return () => clearTimeout(t)
  }, [height, delay])

  return (
    <div
      ref={ref}
      className={`w-full ${color} rounded-t-sm transition-all duration-1000 ease-out`}
      style={{ height: '0%' }}
    />
  )
}

export default function Statistics() {
  useEffect(() => {
    document.title = 'Analytics | Admin Zen Massage'
  }, [])

  return (
    <AdminLayout title="Zen Massage &amp; Wellness">
      <main className="pt-8 pb-stack-lg px-gutter min-h-screen">

        {/* Header */}
        <section className="mb-stack-lg">
          <h2 className="font-headline-md text-headline-md mb-2">Performance &amp; Insights</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">Suivi détaillé de l'activité du sanctuaire Zen Wellness.</p>
        </section>

        {/* ── KPI Cards ── */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-gutter mb-section-gap">
          {STATS.map(s => (
            <div
              key={s.label}
              className="p-stack-lg rounded-xl bg-white shadow-[0_20px_40px_-15px_rgba(44,46,48,0.05)] border border-outline-variant/20"
            >
              <p className="font-label-md text-label-md text-on-surface-variant mb-1">{s.label}</p>
              <h3 className="font-headline-sm text-headline-sm text-primary font-bold">{s.value}</h3>
              <p className={`text-xs font-label-md mt-2 flex items-center gap-1 ${
                s.up === true ? 'text-status-confirmed' : s.up === false ? 'text-error' : 'text-on-surface-variant/60'
              }`}>
                <span className="material-symbols-outlined text-xs">
                  {s.up === true ? 'trending_up' : s.up === false ? 'trending_down' : 'horizontal_rule'}
                </span>
                {s.trend}
              </p>
            </div>
          ))}

          {/* Note moyenne — accent card */}
          <div className="p-stack-lg rounded-xl bg-primary text-white shadow-xl">
            <p className="font-label-md text-label-md text-primary-fixed mb-1">Note Moyenne</p>
            <div className="flex items-baseline gap-1">
              <h3 className="font-headline-sm text-headline-sm font-bold">4.9</h3>
              <span
                className="material-symbols-outlined text-primary-fixed text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
            </div>
            <p className="text-xs font-label-md text-primary-fixed mt-2">Basé sur 840 avis</p>
          </div>
        </section>

        {/* ── Charts ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">

          {/* Bar chart */}
          <div className="lg:col-span-2 bg-white rounded-xl p-stack-lg border border-outline-variant/20">
            <div className="flex justify-between items-center mb-stack-lg">
              <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
                Revenu Mensuel &amp; Occupation
              </h4>
              <div className="flex gap-3">
                <span className="flex items-center text-xs font-label-md text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-primary-container mr-1 inline-block" /> Revenu
                </span>
                <span className="flex items-center text-xs font-label-md text-on-surface-variant">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed-dim mr-1 inline-block" /> Occupation
                </span>
              </div>
            </div>

            <div className="relative h-64 w-full flex items-end justify-between gap-4 border-b border-outline-variant/20 pt-4">
              {BARS.map((b, i) => (
                <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
                  <Bar height={b.revenue}   color="bg-primary-container hover:bg-primary transition-colors cursor-pointer" delay={i * 80} />
                  <Bar height={b.occupation} color="bg-secondary-fixed-dim" delay={i * 80 + 40} />
                  <span className="text-[10px] font-label-md text-on-surface-variant mt-2">{b.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Retention */}
          <div className="bg-sand-light rounded-xl p-stack-lg border border-outline-variant/10 flex flex-col">
            <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest text-on-surface-variant mb-stack-lg">
              Typologie Clients
            </h4>
            <div className="flex-1 flex flex-col justify-center gap-stack-lg">
              {[
                { label: 'Clients Récurrents', pct: 68, color: 'bg-primary' },
                { label: 'Nouveaux Clients',   pct: 32, color: 'bg-secondary-fixed-dim' },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between font-label-md text-label-md mb-2">
                    <span>{item.label}</span>
                    <span>{item.pct}%</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container rounded-full overflow-hidden">
                    <div className={`h-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-white/40 rounded-lg border border-white/50">
                <p className="text-xs font-body-md text-on-surface-variant italic leading-relaxed">
                  "Le programme de fidélité 'Zen Gold' a boosté la rétention de 12% ce trimestre."
                </p>
              </div>
            </div>
          </div>

          {/* Top services */}
          <div className="lg:col-span-1 bg-white rounded-xl p-stack-lg border border-outline-variant/20">
            <h4 className="font-label-md text-label-md font-bold uppercase tracking-widest text-on-surface-variant mb-stack-md">
              Services Populaires
            </h4>
            <ul className="space-y-4">
              {TOP_SERVICES.map(s => (
                <li key={s.name} className="flex items-center gap-4">
                  <img src={s.img} alt={s.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-label-md text-label-md font-semibold truncate">{s.name}</p>
                    <p className="text-xs text-on-surface-variant">{s.sessions}</p>
                  </div>
                  <span className="text-xs font-bold text-primary flex-shrink-0">{s.revenue}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Strategic insight */}
          <div className="lg:col-span-2 relative overflow-hidden bg-sage-deep text-white rounded-xl p-stack-lg min-h-[300px] flex flex-col justify-between">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-[10px] font-label-md uppercase tracking-wider mb-4">
                Focus Stratégique
              </span>
              <h4 className="font-display-lg text-[28px] leading-tight mb-4">
                Opportunité : Expansion des Soins de Fin de Semaine
              </h4>
              <p className="font-body-md text-body-md text-primary-fixed max-w-md opacity-80">
                Vos données montrent une demande non satisfaite le dimanche après-midi. Ouvrir 2 créneaux
                supplémentaires pourrait générer jusqu'à 2 400 € de revenu additionnel par mois.
              </p>
            </div>
            <div className="mt-8">
              <Link
                to="/admin/settings"
                className="px-6 py-2 border border-white rounded-full font-label-md text-label-md hover:bg-white hover:text-sage-deep transition-all active:scale-95 inline-block"
              >
                Modifier le Planning
              </Link>
            </div>
          </div>
        </div>

        {/* ── Transactions ── */}
        <section className="mt-section-gap">
          <div className="flex justify-between items-end mb-stack-lg">
            <div>
              <h4 className="font-headline-sm text-headline-sm">Transactions Récentes</h4>
              <p className="text-sm font-body-md text-on-surface-variant">Visualisation des 5 derniers encaissements.</p>
            </div>
            <a className="text-sm font-label-md text-primary underline underline-offset-4 decoration-primary/30" href="#">
              Voir tout l'historique
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead className="text-on-surface-variant/60 font-label-md text-xs uppercase tracking-widest">
                <tr>
                  {['Client', 'Service', 'Date', 'Montant', 'Status', ''].map((h, i) => (
                    <th key={i} className={`px-4 py-2 ${i === 5 ? 'text-right' : ''}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="font-body-md">
                {TRANSACTIONS.map(t => (
                  <tr key={t.name} className="bg-white hover:bg-surface-container-low transition-colors">
                    <td className="px-4 py-4 rounded-l-xl">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full ${t.bg} flex items-center justify-center text-xs font-bold ${t.text} flex-shrink-0`}>
                          {t.initials}
                        </div>
                        <span className="font-semibold">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">{t.service}</td>
                    <td className="px-4 py-4 text-on-surface-variant">{t.date}</td>
                    <td className="px-4 py-4 font-bold">{t.amount}</td>
                    <td className="px-4 py-4">
                      <span className="px-2 py-1 rounded-full bg-primary-fixed text-primary text-[10px] font-bold uppercase">
                        {t.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 rounded-r-xl text-right">
                      <button className="material-symbols-outlined text-on-surface-variant opacity-40 hover:opacity-100 transition-opacity">
                        more_vert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="py-stack-lg border-t border-outline-variant mt-section-gap opacity-30 text-center">
          <p className="font-label-md text-label-md">© 2024 Zen Massage &amp; Wellness Admin Suite</p>
        </footer>
      </main>
    </AdminLayout>
  )
}
