import { useEffect, useMemo, useState } from 'react'
import UserLayout from '../components/layout/UserLayout'

/* ── Types ── */
type Filter = 'Tout' | 'En cours' | 'Livré' | 'Annulé'

interface OrderItem {
  id: string
  date: string
  total: string
  status: Filter
  imgs: string[]
  items: string[]
}

/* ── Data ── */
const ORDERS: OrderItem[] = [
  {
    id: '#ZEN-89422',
    date: '12 Octobre 2024',
    total: '84.000 FCFA',
    status: 'En cours',
    imgs: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUCdxco_IMGL6XCA4aWt4ykzPhb9SlZyV17tZdnSkLGykBW3ewdYmwwGi9yO920J1rUI6fGEY8KsLjI4sXShHkFnjsyGXkTRWluZerP81ySL3OaBgp2vLl16ub2UwCLMov-AiRaL_tTJX8P87__GBHUX-6iCKrhhVkHkgUIl2DjDlNwqbSRomeZ2MFR0oynddM66_W6TQIPszqY9fo00mwX0lEKFdN54ZGd1dB2CQqFSrmgWU-cKa5rg',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDL5YbFkarHwpeza00wPzBRc4F5mWxQawjTLQpb21cJLC4Eboo8QMZ5IgW6gvc-g5Q1htxftP2ooKpyj0z4kd1FNpKusQIFo1NFYARxVG7gJZwvgVlkfWKyt57-BcXTi3tKuNpsjxndlLGFKOgsuyqgMim6G0MAzE5V_lbzxy7WmYNItk6dBA-sgjwKK85pEr6fT8Dejh7LtndxbktOG2YoxPxCYFzotnMagLPXKg6xVwoVEAy4JOPhCw',
    ],
    items: ['Huile de Massage Sérénité', 'Bougie Zen Arôme'],
  },
  {
    id: '#ZEN-77310',
    date: '28 Septembre 2024',
    total: '45.500 FCFA',
    status: 'Livré',
    imgs: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC1ED57PUSvV3KrSAbb9yFDSLzSIT15SeDGg0a9s_UZikXplpJ8UCxovP-oa1J4nKsL3zcPt-bIKxxd-fCuIs9Xg_KYcu601k1Ia7c5pUM1IF_ZTvDcV8d103X7MbQ8PVokxOEh9Ip323N4eQKU2X84X1WQPvHlNhxvfneVZoA2un5Yx-yzK-4xs83UZK7wx8Js6mjK-2nnhln_En5yjYUSNZRAa2iDuTtwOsKy3XDIReY5N-u5xa6W6A',
    ],
    items: ['Kit Pierres Chaudes Himalaya'],
  },
  {
    id: '#ZEN-66291',
    date: '15 Août 2024',
    total: '120.000 FCFA',
    status: 'Livré',
    imgs: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBC-Ys6VjgurbTjkCDr-x77hdaif8A10_Xsup_Us5jMwcjuwNCZrLPykVELWutckzRQxHtQzOoLJ974A2BuJsxSx9aVy09DMDYPjIh9bCE_m2b-3FiRjbWq5I5uwz3cLG0DgNf4PHxkNF7dch4aiWMV2U60G6cFJH4eNGMVJSr19eUnujIXjFt5YgFzAa6UEwoDAEyyZf3iZYCO6upMdbye-EkgV7XP5MwdCm4efhfL1zsbRnJB5jOoCw',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDkAnJ4vwpabz24HfzStUt_3qHmw8mJXtgp_60kybLBuMDbYXkegYfb51m6Wzpk7WVxpjnFc9BMnZlKmdaC520foupOX4DOfXKzVDITYgVtL1wTZCVfWLQrDt5S-gLf4yUF4XGsW36jNW-XD31uzEONxDCJycTwHz3HAXXAyhtupCBIpuhFuIaVhJRHyyZPfpOXN8edZrzP_6QX6RYDlI5idFWvV4GaC1kdCesqPeRhL1sk_fdv355upA',
    ],
    items: ['Huiles Essentielles Bio x3', 'Sauge & Palo Santo'],
  },
  {
    id: '#ZEN-55104',
    date: '3 Juillet 2024',
    total: '28.000 FCFA',
    status: 'Annulé',
    imgs: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBomtvWKlV7PCb8SuMOBO3DbQ8VMGE3fIqGmyI4hznlhGgvs9vtZoXzHdhIt4IvUYMo9Yonr88rASqlPOS179ovpI62rwYdpsWeNAEtNmBnkV4y7AJp7uYI_dwOkGzJNi6Op3CgBqVl02HLG4eRhUdkPvVzdUWj_aMYkdXfAjyOMvll3njP8y6h5X_BJn6CpiCkTL-LOLeFxgqh3FQcbremS9FDLyTFRwQm21kKxsR7Xg6dk7ugcOHNelKTqRzY4GyBGbBTF_xnReIc',
    ],
    items: ["Bougie 'Brise de l'Estuaire'"],
  },
]

const FILTERS: Filter[] = ['Tout', 'En cours', 'Livré', 'Annulé']

const STATUS_STYLE: Record<string, string> = {
  'En cours': 'bg-primary-fixed text-primary',
  'Livré':    'bg-surface-container-highest text-on-surface-variant',
  'Annulé':   'bg-error-container text-error',
}

/* ── Composant carte commande ── */
function OrderCard({ order }: { order: OrderItem }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-surface-container-low rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-transparent hover:bg-white hover:shadow-[0_20px_25px_-5px_rgba(44,46,48,0.05)] hover:-translate-y-0.5 transition-all duration-300">

      {/* Left — images + info */}
      <div className="flex gap-6 items-center">
        <div className="flex -space-x-4 flex-shrink-0">
          {order.imgs.map((img, i) => (
            <div
              key={i}
              className="w-20 h-20 rounded-lg border-2 border-white overflow-hidden shadow-sm bg-sand-light"
              style={{ zIndex: order.imgs.length - i }}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>

        <div>
          <span className={`font-label-md text-label-md px-3 py-1 rounded-full mb-2 inline-block ${STATUS_STYLE[order.status]}`}>
            {order.status}
          </span>
          <h4 className="font-headline-sm text-body-lg text-on-surface">{order.id}</h4>
          <p className="font-caption text-caption text-on-surface-variant">Commandé le {order.date}</p>

          {/* Items list (expandable) */}
          {expanded && (
            <ul className="mt-2 space-y-1">
              {order.items.map(item => (
                <li key={item} className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">check_small</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setExpanded(v => !v)}
            className="mt-1 font-caption text-caption text-primary hover:underline flex items-center gap-0.5"
          >
            {expanded ? 'Masquer' : `${order.items.length} article${order.items.length > 1 ? 's' : ''}`}
            <span className="material-symbols-outlined text-[14px]">{expanded ? 'expand_less' : 'expand_more'}</span>
          </button>
        </div>
      </div>

      {/* Right — total + action */}
      <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto flex-shrink-0">
        <div className="text-right">
          <p className="font-caption text-caption text-on-surface-variant mb-1">Total</p>
          <p className="font-headline-sm text-body-lg text-sage-deep font-bold">{order.total}</p>
        </div>
        <button className="px-6 py-3 border border-outline text-on-surface-variant font-label-md text-label-md rounded-xl hover:bg-surface transition-colors flex items-center gap-2 whitespace-nowrap">
          <span className="material-symbols-outlined text-body-md">visibility</span>
          Détails
        </button>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function Orders() {
  const [filter, setFilter] = useState<Filter>('Tout')
  const [search, setSearch] = useState('')

  useEffect(() => {
    document.title = 'Mes Commandes | Zen Massage & Wellness Gabon'
  }, [])

  const filtered = useMemo(() =>
    ORDERS.filter(o => {
      const matchFilter = filter === 'Tout' || o.status === filter
      const matchSearch = o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.items.some(i => i.toLowerCase().includes(search.toLowerCase()))
      return matchFilter && matchSearch
    }),
    [filter, search]
  )

  return (
    <UserLayout title="Mes Commandes" subtitle="Suivez vos achats de produits de soin et rituels bien-être.">
      <div className="p-6 md:p-margin-desktop max-w-container-max mx-auto w-full">

        {/* Search + filtres */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher une commande..."
              className="pl-10 pr-4 py-2 border-b border-outline-variant bg-transparent focus:outline-none focus:border-primary transition-all font-body-md text-body-md w-64"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all duration-200 ${
                  filter === f
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Liste commandes */}
        <div className="space-y-stack-md">
          {filtered.length > 0 ? (
            filtered.map(o => <OrderCard key={o.id} order={o} />)
          ) : (
            <div className="text-center py-24">
              <span className="material-symbols-outlined text-5xl text-outline-variant mb-4 block">shopping_bag</span>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                {search ? `Aucune commande pour "${search}"` : 'Aucune commande dans cette catégorie.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </UserLayout>
  )
}
