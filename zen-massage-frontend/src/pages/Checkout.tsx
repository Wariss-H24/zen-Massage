import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'

/* ── Types ── */
type PaymentMethod = 'airtel' | 'moov' | 'cash' | 'card'

interface CartItem {
  id: number
  name: string
  variant: string
  qty: number
  price: number
  img: string
}

/* ── Data ── */
const CART_ITEMS: CartItem[] = [
  {
    id: 1,
    name: "Huile d'Arnica Apaisante",
    variant: 'Format 250ml',
    qty: 1,
    price: 15000,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZH3OBz5PvDxz4pMYs6FVhODxBgSQmxi5XfkKEtSAa5qaFzOktKIrAdJuwNk_OW5BQ8Y2B8rce8omv9LuP5KHpcmUuoK6MPsXDSp_4rILUO0Fw80mzNDjwrMuQFOrtq1XrNYe7cuzUGugCgnSxL3fXtcm9gcIx8ohV4k6s0B_kD_pldoW6P2wCBhA1fXukjEEI5SGYhDBEa7eV7nfKCVIsCbcFP_mZNThzSyDDmaogJYHYk2CsF9CHww',
  },
  {
    id: 2,
    name: 'Bougie Artisanale "Forêt Équatoriale"',
    variant: 'Senteur naturelle',
    qty: 2,
    price: 12000,
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkNfLAh5d9MqcAYDberKm_aWWgXOuZbMJg_UmmVCNG41WeSZ0xISaFRqK0q5x2e836jUMWP8BmUUVGT76OKVvdRS0zDh1nOi0UP2ir4aB18SM7fQ__jh4_2jFVho0p7-uMyPQAy--uI3qEUGDIfNjs8caRbXszRSclcIOvMvOJOXNVJcAF3LgI25nQ0k2e8wOc_qa7rJ7CenrbvlhC_72drTzUBWFeLAzAC3pofUpFiaQaEWt16a64Ew',
  },
]

const PAYMENT_OPTIONS = [
  { id: 'airtel' as PaymentMethod, icon: 'smartphone',            label: 'Airtel Money',          sub: 'Paiement mobile rapide' },
  { id: 'moov'   as PaymentMethod, icon: 'account_balance_wallet', label: 'Moov Money',            sub: 'Portefeuille Flooz' },
  { id: 'cash'   as PaymentMethod, icon: 'payments',              label: 'Paiement à la livraison', sub: 'Payez en espèces' },
  { id: 'card'   as PaymentMethod, icon: 'credit_card',           label: 'Carte Bancaire',         sub: 'Visa / Mastercard' },
]

const CITIES = ['Libreville', 'Port-Gentil', 'Franceville', 'Oyem', 'Moanda']

const DELIVERY_FEES: Record<string, number> = {
  Libreville: 3000,
  'Port-Gentil': 5000,
  Franceville: 5000,
  Oyem: 5000,
  Moanda: 5000,
}

/* ── Step indicator ── */
function StepBadge({ n, label, active, done }: { n: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${active ? 'text-primary' : done ? 'text-primary' : 'text-on-surface-variant'}`}>
      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-label-md text-label-md flex-shrink-0 transition-all ${
        done ? 'bg-primary text-white' : active ? 'bg-primary text-white' : 'bg-surface-container text-on-surface-variant'
      }`}>
        {done
          ? <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
          : n}
      </span>
      <span className="font-label-md text-label-md hidden sm:block">{label}</span>
    </div>
  )
}

/* ── Field wrapper ── */
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-label-md text-caption text-on-surface-variant">{label}</label>
      {children}
    </div>
  )
}

const inputCls = "border-0 border-b border-outline-variant bg-transparent focus:ring-0 focus:border-primary focus:outline-none px-0 py-2 font-body-md text-body-md transition-colors"

/* ── Page ── */
export default function Checkout() {
  const [payment, setPayment] = useState<PaymentMethod>('airtel')
  const [city, setCity] = useState('Libreville')
  const [confirmed, setConfirmed] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', address: '', phone: '' })

  useEffect(() => {
    document.title = 'Finaliser la commande | Zen Massage & Wellness'
  }, [])

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const subtotal = CART_ITEMS.reduce((acc, i) => acc + i.price * i.qty, 0)
  const delivery = DELIVERY_FEES[city] ?? 3000
  const total = subtotal + delivery

  const fmt = (n: number) => n.toLocaleString('fr-FR') + ' FCFA'

  const canSubmit = form.name.trim() && form.email.trim() && form.address.trim() && form.phone.trim()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (canSubmit) setConfirmed(true)
  }

  /* ── Success screen ── */
  if (confirmed) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-primary-fixed rounded-full flex items-center justify-center mx-auto mb-6">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-sage-deep mb-3">
              Commande confirmée !
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-2">
              Merci pour votre commande, {form.name.split(' ')[0]}.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant mb-2">
              Un email de confirmation a été envoyé à <strong>{form.email}</strong>.
            </p>
            <p className="font-caption text-caption text-on-surface-variant mb-8">
              Livraison estimée à <strong>{city}</strong> sous 2–4 jours ouvrés.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/orders"
                className="px-8 py-3 bg-primary text-white rounded-full font-label-md text-label-md hover:bg-sage-deep transition-colors"
              >
                Suivre ma commande
              </Link>
              <Link
                to="/products"
                className="px-8 py-3 border border-sage-deep text-sage-deep rounded-full font-label-md text-label-md hover:bg-sand-light transition-colors"
              >
                Continuer mes achats
              </Link>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <main className="pt-8 pb-section-gap px-4 md:px-margin-desktop max-w-container-max mx-auto">

        {/* ── Header ── */}
        <div className="mb-stack-lg">
          <h1 className="font-headline-md text-headline-md text-sage-deep mb-2">Finaliser votre commande</h1>

          {/* Stepper */}
          <div className="flex items-center gap-4 mt-6">
            <StepBadge n={1} label="Identification" active done />
            <div className="h-px flex-1 bg-primary" />
            <StepBadge n={2} label="Livraison" active done />
            <div className="h-px flex-1 bg-primary" />
            <StepBadge n={3} label="Paiement" active={false} done={false} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

            {/* ── Left — Steps ── */}
            <div className="lg:col-span-7 flex flex-col gap-stack-lg">

              {/* Step 1 — Identification */}
              <section className="bg-white p-stack-lg rounded-xl shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-4 mb-stack-md">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md text-label-md flex-shrink-0">1</span>
                  <h2 className="font-headline-sm text-headline-sm">Identification</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-stack-md">
                  <Field label="Nom complet">
                    <input
                      type="text" required value={form.name}
                      onChange={e => set('name', e.target.value)}
                      placeholder="Jean-Pierre M'Badinga"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email" required value={form.email}
                      onChange={e => set('email', e.target.value)}
                      placeholder="jean-pierre@example.ga"
                      className={inputCls}
                    />
                  </Field>
                </div>
              </section>

              {/* Step 2 — Livraison */}
              <section className="bg-white p-stack-lg rounded-xl shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-4 mb-stack-md">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md text-label-md flex-shrink-0">2</span>
                  <h2 className="font-headline-sm text-headline-sm">Informations de livraison</h2>
                </div>
                <div className="grid grid-cols-1 gap-stack-md">
                  <Field label="Ville (Gabon)">
                    <select
                      value={city}
                      onChange={e => setCity(e.target.value)}
                      className={inputCls}
                    >
                      {CITIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Adresse de livraison / Quartier">
                    <input
                      type="text" required value={form.address}
                      onChange={e => set('address', e.target.value)}
                      placeholder="Ex: Akanda, Rue de l'aéroport"
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Numéro de téléphone">
                    <input
                      type="tel" required value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      placeholder="+241 07 00 00 00"
                      className={inputCls}
                    />
                  </Field>
                </div>
              </section>

              {/* Step 3 — Paiement */}
              <section className="bg-white p-stack-lg rounded-xl shadow-sm border border-outline-variant/30">
                <div className="flex items-center gap-4 mb-stack-md">
                  <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-label-md text-label-md flex-shrink-0">3</span>
                  <h2 className="font-headline-sm text-headline-sm">Mode de paiement</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-stack-md">
                  {PAYMENT_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setPayment(opt.id)}
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all text-left ${
                        payment === opt.id
                          ? 'border-primary bg-surface-container-low'
                          : 'border-outline-variant hover:border-primary'
                      }`}
                    >
                      <span className={`material-symbols-outlined ${payment === opt.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {opt.icon}
                      </span>
                      <div>
                        <span className="font-label-md text-label-md block">{opt.label}</span>
                        <span className="font-caption text-caption text-on-surface-variant">{opt.sub}</span>
                      </div>
                      {payment === opt.id && (
                        <span className="material-symbols-outlined text-primary ml-auto text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                          check_circle
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </section>
            </div>

            {/* ── Right — Résumé sticky ── */}
            <aside className="lg:col-span-5 sticky top-28">
              <div className="bg-white p-stack-lg rounded-xl shadow-sm border border-outline-variant/30 flex flex-col gap-stack-md">
                <h2 className="font-headline-sm text-headline-sm border-b border-surface-variant pb-stack-sm">
                  Résumé du panier
                </h2>

                {/* Articles */}
                <div className="flex flex-col gap-4 max-h-64 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#d2e8d3 transparent' }}>
                  {CART_ITEMS.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <div
                        className="w-20 h-20 rounded-lg flex-shrink-0 bg-cover bg-center bg-sand-light"
                        style={{ backgroundImage: `url('${item.img}')` }}
                      />
                      <div className="flex flex-col justify-between py-1 flex-grow">
                        <div>
                          <h4 className="font-label-md text-label-md text-on-surface">{item.name}</h4>
                          <p className="font-caption text-caption text-on-surface-variant">{item.variant}</p>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-caption text-caption text-on-surface-variant">Qté: {item.qty}</span>
                          <span className="font-body-md text-body-md font-semibold">{fmt(item.price * item.qty)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Totaux */}
                <div className="flex flex-col gap-2 pt-4 border-t border-surface-variant">
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Sous-total</span>
                    <span>{fmt(subtotal)}</span>
                  </div>
                  <div className="flex justify-between font-body-md text-body-md text-on-surface-variant">
                    <span>Frais de livraison ({city})</span>
                    <span>{fmt(delivery)}</span>
                  </div>
                  <div className="flex justify-between font-headline-sm text-headline-sm text-sage-deep font-bold pt-2 border-t border-outline-variant/30">
                    <span>Total</span>
                    <span>{fmt(total)}</span>
                  </div>
                </div>

                {/* CTA */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full bg-primary text-white py-4 rounded-full font-label-md text-label-md hover:bg-sage-deep transition-all duration-300 shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Passer la commande
                </button>

                <p className="font-caption text-caption text-center text-on-surface-variant px-4">
                  En cliquant sur "Passer la commande", vous acceptez nos conditions générales de vente.
                </p>

                <div className="flex items-center justify-center gap-3">
                  <span className="material-symbols-outlined text-status-confirmed" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                  <span className="font-caption text-caption text-on-surface-variant">Paiement 100% sécurisé</span>
                </div>
              </div>
            </aside>

          </div>
        </form>
      </main>
    </MainLayout>
  )
}
