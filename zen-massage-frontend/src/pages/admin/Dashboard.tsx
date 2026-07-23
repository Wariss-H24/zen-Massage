import { useEffect, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import { appointmentService, type RendezVousWithUser } from '../../services/appointment.service'

// Fonction pour formater la date en français (ex: "Aujourd'hui, 16h30")
const formatAppointmentTime = (dateStr: string): string => {
  const date = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  const dateOnly = new Date(date)
  dateOnly.setHours(0, 0, 0, 0)
  
  let dateLabel: string
  if (dateOnly.getTime() === today.getTime()) {
    dateLabel = "Aujourd'hui"
  } else if (dateOnly.getTime() === tomorrow.getTime()) {
    dateLabel = "Demain"
  } else {
    const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
    dateLabel = days[date.getDay()]
  }
  
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${dateLabel}, ${hours}h${minutes}`
}

// Fonction pour générer les initiales du client
const getClientInitials = (firstName: string, lastName: string): string => {
  return `${firstName[0]}${lastName[0]}`.toUpperCase()
}

const PRODUCTS = [
  { name: 'Huile Sérénité',      price: '48 000 FCFA', units: 24,  status: 'En stock',     statusColor: 'bg-status-confirmed/90' },
  { name: 'Kit Sel Himalaya',    price: '32 500 FCFA', units: 3,   status: 'Stock faible', statusColor: 'bg-error/90' },
  { name: 'Bougie Ben Arôme',    price: '18 000 FCFA', units: 112, status: 'En stock',     statusColor: 'bg-status-confirmed/90' },
  { name: 'Parure Lin Texturé',  price: '65 000 FCFA', units: 18,  status: 'En stock',     statusColor: 'bg-status-confirmed/90' },
]

const PRODUCT_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDaPeEHe9JfNgQEZ4zDC1dUKd-yHJ0syJS-os0KXVrNcYnfo-0ZjgCVE_RUBLJYjJHEJh4mwnoURE26aIa4o2PyC1fY_-aM2MqbBSq0biaFizVhkwSrH-ENIgVNCvMKfOE0T5RK8uNMNVmQhcGdfK8VxOZ-rxKDe2SaLyo435hLIszJgRWofUPsh7yG8XcgI3ZcsM7UUCjT2p0U6Xj9dIJ6cskHFWv37jipVQjKs0C1ClQyA3q54gZjYTEGDI_MpWclFRZLvx-gUD0D',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBS0YQ0nmY-IPQGgHo3VTDIKC1iY7Y1R5gcoKuI6-F401Pb7jl1uxDDptocrZvRmZhf9JdxiTWmmWyFn0A0wCXmUMCW4oWTk20ay0vEqTAaSZI0aN9k3uvKg9GvVlLxRNnOm8iLEh5dZFykZfQObSEgNuJ5FObeYPpfGEs2Vunc6VOUa5kSWuA3T5olJ4bcMImm6On6Fbo8XrtpSQ_lDqhGZMTiumbzLjsOrX435a6awSMtV8hrYvLo8Yi2AkhklM-sHf7oMuxYpgIT',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA-ye3xa524TPHZnlvs1s-ul5nO5c3aavleFxcdJyuOZr1aE1F39fsjVPk1lLzJk0oph4JPiackWK9GOKdazmchmEAaz2ZWYQSxpf4i39rksg5q1Uxcfu76pcZe2OxNXiLpEWEb0XJ6ZJnJO5py98xtSNtKAfEvT2bKRZiI5GyzRsOqbzHQqlZpuh75MHe47GgouLkkGOE8S8ptIthmwFsufv--jMKdO9mEE8PPc23ApQCVQMWsu713znu8w0D9h2nk4BC0w6gWRxNT',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCsvJb8FFFaCvbGWaVWcFbSmtV971LKHk7u45OFuCBS3DcFnLvK8oMYvtvJf2IHr1P0l9nSTnJGS4cMdlEhY7qpI7Zdbk5_m526JCwoUPrJobpVVx2lBlB7us4vrkoSVVhB5En3Bzl_F-c4ygJc_KFo8pW7mePtJp0vmhCP_cdVPMApaO_gCWeCt0bYXMuttg2bJnpICpTEWZ6W-f9BFMZ5P-bC6ofQNmlFqcmkhuHH-ObgdXEdaO1ERgrHeqeKzHtf5p0Z1D3JsgD6',
]

const SALES = [
  { id: '#ZN-9821', customer: 'Robert Chen',   total: '112 500 FCFA', status: 'Expédié',   statusStyle: 'bg-status-confirmed/10 text-status-confirmed' },
  { id: '#ZN-9744', customer: 'Elena Rossi',   total: '48 000 FCFA',  status: 'En cours',  statusStyle: 'bg-status-pending/20 text-secondary' },
  { id: '#ZN-9740', customer: 'Thomas Wright', total: '215 000 FCFA', status: 'Livré',     statusStyle: 'bg-status-completed/10 text-status-completed' },
  { id: '#ZN-9732', customer: 'Sophia Lane',   total: '32 500 FCFA',  status: 'Retourné',  statusStyle: 'bg-status-cancelled/10 text-status-cancelled' },
]

const DAYS_INIT = [
  { label: 'Lun', start: '09:00', end: '18:00', active: true },
  { label: 'Mar', start: '09:00', end: '18:00', active: true },
  { label: 'Mer', start: '',      end: '',       active: false },
  { label: 'Jeu', start: '09:00', end: '18:00', active: true },
  { label: 'Ven', start: '09:00', end: '17:00', active: true },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [days, setDays] = useState(DAYS_INIT)
  const [appointments, setAppointments] = useState<RendezVousWithUser[]>([])
  const [loading, setLoading] = useState(true)
  const [statusModalOpen, setStatusModalOpen] = useState(false)
  const [selectedAppt, setSelectedAppt] = useState<RendezVousWithUser | null>(null)
  const [newStatus, setNewStatus] = useState<RendezVousWithUser['statut']>('PENDING')
  const [raisonRefus, setRaisonRefus] = useState('')
  const [processingStatus, setProcessingStatus] = useState(false)
  const firstName = user?.firstName || ''
  const lastName = user?.lastName || ''

  useEffect(() => { document.title = 'Espace Praticien | Ben Massage' }, [])

  // Charger les rendez-vous
  useEffect(() => {
    async function loadAppointments() {
      try {
        setLoading(true)
        console.log('Chargement des rendez-vous...')
        const response = await appointmentService.getAllAppointments()
        console.log('Rendez-vous chargés:', response.data)
        setAppointments(response.data)
      } catch (err) {
        console.error('Erreur lors du chargement des rendez-vous:', err)
        alert('Erreur lors du chargement des rendez-vous: ' + (err as Error).message)
      } finally {
        setLoading(false)
      }
    }
    loadAppointments()
  }, [])

  // Filtrer les rendez-vous en attente
  const pendingAppointments = useMemo(() => {
    return appointments.filter(appt => appt.statut === 'PENDING')
  }, [appointments])

  const toggleDay = (i: number) =>
    setDays(d => d.map((day, idx) => idx === i ? { ...day, active: !day.active } : day))

  // Gérer la mise à jour du statut
  const handleUpdateStatus = async () => {
    if (!selectedAppt) return
    try {
      setProcessingStatus(true)
      const updatedAppt = await appointmentService.updateAppointmentStatus(selectedAppt.id, {
        statut: newStatus,
        raison_refus: newStatus === 'CANCELLED' ? raisonRefus : undefined
      })
      setAppointments(prev => prev.map(a => a.id === selectedAppt.id ? updatedAppt.data : a))
      setStatusModalOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erreur lors de la mise à jour')
    } finally {
      setProcessingStatus(false)
    }
  }

  return (
    <AdminLayout title="Espace Praticien">
      <div className="px-6 pb-20 pt-8 max-w-[1280px] mx-auto space-y-8">

        {/* Page header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between py-4 border-b border-outline-variant">
          <div>
            <h2 className="font-headline-md text-headline-md text-sage-deep">Espace Praticien</h2>
            <p className="font-body-md text-on-surface-variant">Bienvenue, {firstName} {lastName}. Voici l'aperçu de votre activité du jour.</p>
          </div>
          <Link to="/appointments" className="mt-4 md:mt-0 px-6 py-2.5 border border-primary text-primary font-label-md text-label-md rounded-full hover:bg-primary hover:text-white transition-all duration-300">
            Réserver une séance
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-6">

          {/* Rendez-vous en attente */}
          <section className="col-span-12 lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Rendez-vous en attente</h3>
              <span className="bg-status-pending px-3 py-1 rounded-full text-[10px] font-bold text-on-secondary-fixed uppercase tracking-wider">
                {pendingAppointments.length} demande{pendingAppointments.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-3">
              {loading ? (
                <div className="text-center py-8">
                  <p className="text-on-surface-variant">Chargement des rendez-vous...</p>
                </div>
              ) : pendingAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-4xl text-outline block mb-4">event</span>
                  <p className="font-body-md text-body-md text-on-surface-variant">Aucun rendez-vous en attente</p>
                </div>
              ) : (
                pendingAppointments.map(apt => (
                  <div key={apt.id} className="bg-white/70 backdrop-blur-sm border border-white/30 p-4 rounded-xl flex items-center justify-between hover:scale-[1.01] transition-transform shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 bg-sand-light text-secondary">
                        {getClientInitials(apt.utilisateur.firstName, apt.utilisateur.lastName)}
                      </div>
                      <div>
                        <h4 className="font-label-md text-label-md text-primary">{apt.utilisateur.firstName} {apt.utilisateur.lastName}</h4>
                        <p className="font-caption text-on-surface-variant">{apt.type_seance.nom} • {apt.duree} min</p>
                        <p className="font-caption text-on-surface-variant">{formatAppointmentTime(apt.date_heure)}</p>
                        {apt.notes && (
                          <p className="font-caption text-on-surface-variant mt-1 italic">"{apt.notes}"</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <button 
                        className="p-2 text-status-confirmed hover:bg-status-confirmed/10 rounded-full transition-colors" 
                        title="Accepter"
                        onClick={() => {
                          setSelectedAppt(apt)
                          setNewStatus('CONFIRMED')
                          setRaisonRefus('')
                          setStatusModalOpen(true)
                        }}
                      >
                        <span className="material-symbols-outlined">check_circle</span>
                      </button>
                      <button 
                        className="p-2 text-on-surface-variant hover:bg-surface-variant rounded-full transition-colors" 
                        title="Reprogrammer"
                        onClick={() => {
                          // TODO: Ajouter la logique de reprogrammation
                          alert('Fonctionnalité de reprogrammation à venir !')
                        }}
                      >
                        <span className="material-symbols-outlined">calendar_clock</span>
                      </button>
                      <button 
                        className="p-2 text-error hover:bg-error/10 rounded-full transition-colors" 
                        title="Refuser"
                        onClick={() => {
                          setSelectedAppt(apt)
                          setNewStatus('CANCELLED')
                          setRaisonRefus('')
                          setStatusModalOpen(true)
                        }}
                      >
                        <span className="material-symbols-outlined">cancel</span>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Planning hebdomadaire */}
          <section className="col-span-12 lg:col-span-4 bg-sand-light/30 p-6 rounded-xl border border-outline-variant/30">
            <h3 className="font-headline-sm text-headline-sm text-charcoal-muted mb-4">Planning hebdomadaire</h3>
            <div className="space-y-3">
              {days.map((day, i) => (
                <div key={day.label} className={`flex items-center justify-between ${!day.active ? 'opacity-50' : ''}`}>
                  <span className="font-label-md text-label-md w-10">{day.label}</span>
                  <div className="flex-1 mx-3 flex gap-2">
                    {day.active ? (
                      <>
                        <input defaultValue={day.start} className="w-full bg-white border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-primary" />
                        <span className="text-on-surface-variant self-center">-</span>
                        <input defaultValue={day.end} className="w-full bg-white border-none rounded-lg text-xs py-1 px-2 focus:ring-1 focus:ring-primary" />
                      </>
                    ) : (
                      <span className="text-xs text-error italic">Fermé</span>
                    )}
                  </div>
                  <input type="checkbox" checked={day.active} onChange={() => toggleDay(i)} className="rounded text-primary focus:ring-primary" />
                </div>
              ))}
              <div className="pt-4">
                <h4 className="font-label-md text-label-md mb-2">Pause par défaut</h4>
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-sm">coffee</span>
                  <input defaultValue="13:00 - 14:00" className="w-full bg-white border-none rounded-lg text-xs py-1.5 px-3 focus:ring-1 focus:ring-primary" />
                </div>
              </div>
              <button className="w-full mt-2 py-2 text-white font-label-md text-label-md rounded-lg hover:opacity-90 transition-opacity bg-primary">
                Mettre à jour
              </button>
            </div>
          </section>

          {/* Inventaire produits */}
          <section className="col-span-12 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Inventaire produits</h3>
              <Link to="/admin/products/add" className="flex items-center gap-2 bg-surface-container-highest px-4 py-2 rounded-full font-label-md text-label-md hover:bg-secondary-container transition-colors">
                <span className="material-symbols-outlined text-[20px]">add</span>
                Ajouter un produit
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PRODUCTS.map((p, i) => (
                <div key={p.name} className="bg-white rounded-xl overflow-hidden border border-outline-variant/30 flex flex-col group">
                  <div className="h-48 relative overflow-hidden">
                    <img src={PRODUCT_IMGS[i]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className={`absolute top-3 right-3 ${p.statusColor} backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-tighter`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-label-md text-label-md text-primary">{p.name}</h4>
                    <div className="flex justify-between items-center">
                      <p className="font-headline-sm text-[18px] text-sage-deep">{p.price}</p>
                      <span className="font-caption text-on-surface-variant">{p.units} unités</span>
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button className="flex-1 py-1.5 border border-outline-variant rounded-lg font-caption hover:bg-surface-variant transition-colors">Modifier</button>
                      <button className="p-1.5 text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">visibility</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Avis récents */}
          <section className="col-span-12 lg:col-span-6 space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Avis récents</h3>
            <div className="space-y-4">
              {[
                { stars: 5, text: '"L\'Huile Sérénité est un vrai changement. Le parfum est incroyablement apaisant. Parfait pour mon rituel du soir."', name: 'Sarah M.', time: 'Il y a 2h', reply: null },
                { stars: 4, text: '"Excellente séance de massage aujourd\'hui. Elena a un toucher très intuitif. La salle était un peu fraîche cependant."', name: 'David L.', time: 'Hier', reply: '"Merci pour votre retour, David ! Je veillerai à ajuster la température pour votre prochaine visite."' },
              ].map((r, i) => (
                <div key={i} className="bg-white/50 p-4 rounded-xl border-l-4 border-status-confirmed shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex gap-1 text-[#D4AF37]">
                      {[...Array(r.stars)].map((_, j) => (
                        <span key={j} className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      ))}
                      {r.stars < 5 && <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>}
                    </div>
                    <span className="font-caption text-on-surface-variant">{r.time}</span>
                  </div>
                  <p className="font-body-md italic text-primary mb-2">{r.text}</p>
                  <span className="font-label-md opacity-60">— {r.name}</span>
                  {r.reply ? (
                    <div className="mt-3 pl-4 border-l border-outline-variant pt-2">
                      <div className="text-xs text-on-surface-variant bg-surface-variant/50 p-2 rounded-lg">
                        <p className="font-semibold mb-1">Votre réponse :</p>{r.reply}
                      </div>
                    </div>
                  ) : (
                    <div className="pl-4 border-l border-outline-variant pt-2 mt-3">
                      <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline">
                        <span className="material-symbols-outlined text-sm">reply</span>Répondre au client
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Ventes récentes */}
          <section className="col-span-12 lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-charcoal-muted">Ventes récentes</h3>
              <Link to="/admin/orders" className="text-primary font-label-md text-label-md hover:underline">Voir tout</Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left font-body-md">
                <thead>
                  <tr className="border-b border-outline-variant">
                    {['N° Commande', 'Client', 'Total', 'Statut'].map(h => (
                      <th key={h} className="pb-3 font-label-md text-label-md text-on-surface-variant">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {SALES.map(s => (
                    <tr key={s.id} className="hover:bg-surface-container-low transition-colors">
                      <td className="py-4 text-xs font-mono">{s.id}</td>
                      <td className="py-4 font-semibold">{s.customer}</td>
                      <td className="py-4">{s.total}</td>
                      <td className="py-4">
                        <span className={`${s.statusStyle} text-[10px] px-2 py-0.5 rounded-full font-bold`}>{s.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <footer className="py-8 border-t border-outline-variant text-center opacity-30">
          <p className="font-label-md text-label-md">© 2024 Ben Massage & Wellness</p>
        </footer>
      </div>

      {/* Modal de mise à jour de statut */}
      {statusModalOpen && selectedAppt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">edit_calendar</span>
                <h3 className="font-headline-md text-sage-deep">Mettre à jour le rendez-vous</h3>
              </div>
              <button 
                className="p-1 hover:bg-sand-light rounded-full transition-colors"
                onClick={() => setStatusModalOpen(false)}
              >
                <span className="material-symbols-outlined text-on-surface-variant">close</span>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="font-label-md text-label-md text-sage-deep block mb-2">Nouveau statut</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as any)}
                  className="w-full p-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest"
                >
                  <option value="PENDING">En attente</option>
                  <option value="CONFIRMED">Confirmé</option>
                  <option value="COMPLETED">Terminé</option>
                  <option value="CANCELLED">Annulé</option>
                </select>
              </div>

              {newStatus === 'CANCELLED' && (
                <div>
                  <label className="font-label-md text-label-md text-sage-deep block mb-2">Raison de l'annulation</label>
                  <textarea
                    value={raisonRefus}
                    onChange={(e) => setRaisonRefus(e.target.value)}
                    className="w-full p-3 rounded-lg border border-outline-variant/30 bg-surface-container-lowest min-h-[100px]"
                    placeholder="Entrez la raison..."
                  />
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-outline-variant/20">
                <button 
                  className="flex-1 py-2 font-label-md text-label-md text-on-surface-variant border border-outline-variant/30 rounded-lg hover:bg-surface-variant transition-colors"
                  onClick={() => setStatusModalOpen(false)}
                  disabled={processingStatus}
                >
                  Annuler
                </button>
                <button 
                  className="flex-1 py-2 font-label-md text-label-md bg-primary text-white rounded-lg hover:bg-sage-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleUpdateStatus}
                  disabled={processingStatus}
                  style={{ backgroundColor: '#425646' }}
                >
                  {processingStatus ? 'Mise à jour...' : 'Enregistrer'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
