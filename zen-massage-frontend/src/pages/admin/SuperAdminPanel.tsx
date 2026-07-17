import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AdminLayout from '../../components/layout/AdminLayout'
import { userService, type UserItem, type UserStats } from '../../services/user.service'

/* ── Modal Ajout Utilisateur ── */
function AddUserModal({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (data: { firstName: string; lastName: string; email: string; password: string; phone?: string; role: UserItem['role'] }) => Promise<void>
}) {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [role, setRole] = useState<UserItem['role']>('USER')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password) {
      setError('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setSaving(true)
    setError('')
    try {
      await onSave({ firstName, lastName, email, password, phone: phone || undefined, role })
    } catch (err: any) {
      setError(err?.message || 'Erreur lors de la création')
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal-muted/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-sage-deep">Ajouter un utilisateur</h3>
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-error/10 text-error rounded-lg font-body-md text-sm">{error}</div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">Prénom *</label>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Jean"
              />
            </div>
            <div>
              <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">Nom *</label>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-1 focus:ring-primary focus:outline-none"
                placeholder="Dupont"
              />
            </div>
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">Email *</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="jean.dupont@email.com"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">Mot de passe *</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Minimum 6 caractères"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant mb-1 block">Téléphone</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="+241 XX XX XX XX"
            />
          </div>

          <div>
            <label className="font-label-md text-label-md text-on-surface-variant mb-2 block">Rôle</label>
            <div className="flex gap-2">
              {(['USER', 'ADMIN', 'SUPER_ADMIN'] as UserItem['role'][]).map(r => {
                const colors = {
                  USER:        'border-outline-variant text-on-surface-variant hover:border-primary/30 hover:bg-primary/5',
                  ADMIN:       'border-secondary text-secondary hover:bg-secondary/10',
                  SUPER_ADMIN: 'border-primary text-primary hover:bg-primary/10',
                }
                const activeColors = {
                  USER:        'border-primary bg-primary/10 text-primary',
                  ADMIN:       'border-secondary bg-secondary/15 text-secondary',
                  SUPER_ADMIN: 'border-primary bg-primary-fixed text-primary',
                }
                const labels = {
                  USER:        'Utilisateur',
                  ADMIN:       'Admin',
                  SUPER_ADMIN: 'Super Admin',
                }
                const dots = {
                  USER:        'bg-outline',
                  ADMIN:       'bg-secondary',
                  SUPER_ADMIN: 'bg-primary',
                }
                const isActive = role === r
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all font-label-md text-label-md cursor-pointer flex-1 justify-center ${
                      isActive ? activeColors[r] : colors[r]
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${isActive ? dots[r] : 'bg-outline-variant'}`} />
                    {labels[r]}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/30">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-full font-label-md text-label-md bg-primary text-white hover:bg-sage-deep shadow-md active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              {saving ? 'Création...' : 'Créer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

/* ── Helpers ── */
const ROLE_LABELS: Record<UserItem['role'], { label: string; cls: string }> = {
  SUPER_ADMIN: { label: 'Super Admin', cls: 'bg-primary-fixed text-on-primary-fixed' },
  ADMIN:       { label: 'Admin',       cls: 'bg-secondary-fixed text-on-secondary-container' },
  USER:        { label: 'Utilisateur', cls: 'bg-surface-variant text-on-surface-variant' },
}

const INITIALS_BG = [
  'bg-secondary-fixed',
  'bg-primary-fixed-dim',
  'bg-tertiary-fixed-dim',
  'bg-sand-light',
  'bg-primary-fixed',
  'bg-surface-variant',
]
const INITIALS_TEXT = [
  'text-on-secondary-fixed',
  'text-on-primary-fixed',
  'text-on-tertiary-fixed',
  'text-secondary',
  'text-primary',
  'text-on-surface-variant',
]

function initials(name: string) {
  const parts = name.split(' ')
  return parts.length >= 2
    ? (parts[0][0] + parts[1][0]).toUpperCase()
    : name.slice(0, 2).toUpperCase()
}

function initialsStyle(i: number) {
  return {
    bg: INITIALS_BG[i % INITIALS_BG.length],
    textColor: INITIALS_TEXT[i % INITIALS_TEXT.length],
  }
}

/* ── Modal rôle ── */
function RoleModal({
  user,
  onClose,
  onSave,
}: {
  user: UserItem
  onClose: () => void
  onSave: (userId: string, role: UserItem['role']) => void
}) {
  const [selected, setSelected] = useState<UserItem['role']>(user.role)

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-charcoal-muted/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center">
          <h3 className="font-headline-sm text-headline-sm text-sage-deep">Modifier le rôle</h3>
          <button onClick={onClose} className="text-outline hover:text-on-surface transition-colors cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl">
            <div className={`w-12 h-12 rounded-full ${initialsStyle(0).bg} flex items-center justify-center font-bold ${initialsStyle(0).textColor}`}>
              {initials(`${user.firstName} ${user.lastName}`)}
            </div>
            <div>
              <p className="font-label-md text-label-md text-on-surface">{user.firstName} {user.lastName}</p>
              <p className="font-caption text-caption text-outline">{user.email}</p>
            </div>
          </div>

          <div className="space-y-3">
            <p className="font-label-md text-label-md text-on-surface-variant">Sélectionner un rôle</p>
            {(['SUPER_ADMIN', 'ADMIN', 'USER'] as UserItem['role'][]).map(r => (
              <label
                key={r}
                className="flex items-center p-4 rounded-xl border border-outline-variant/40 cursor-pointer hover:bg-primary/5 transition-colors"
              >
                <input
                  type="radio"
                  name="role"
                  checked={selected === r}
                  onChange={() => setSelected(r)}
                  className="w-4 h-4 text-primary focus:ring-primary border-outline-variant"
                />
                <div className="ml-4">
                  <p className="font-label-md text-label-md text-on-surface">{ROLE_LABELS[r].label}</p>
                  <p className="text-[11px] text-outline">
                    {r === 'SUPER_ADMIN' && 'Accès complet au système, facturation et journaux.'}
                    {r === 'ADMIN'       && 'Gérer les praticiens et les rendez-vous.'}
                    {r === 'USER'        && 'Accès standard aux réservations et à l\'historique.'}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="px-6 py-5 bg-surface-container-low border-t border-outline-variant/30 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant transition-colors cursor-pointer"
          >
            Annuler
          </button>
          <button
            onClick={() => { onSave(user.id, selected); onClose() }}
            className="px-5 py-2 rounded-full font-label-md text-label-md bg-primary text-white hover:bg-sage-deep shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Appliquer
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Page ── */
export default function SuperAdminPanel() {
  const [users, setUsers] = useState<UserItem[]>([])
  const [stats, setStats] = useState<UserStats | null>(null)
  const [editUser, setEditUser] = useState<UserItem | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Super Admin | Ben Massage & Wellness'
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [usersRes, statsRes] = await Promise.all([
        userService.list(),
        userService.stats(),
      ])
      setUsers(usersRes.data)
      setStats(statsRes.data)
    } catch (err) {
      console.error('Erreur chargement Super Admin Panel:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const saveRole = async (userId: string, role: UserItem['role']) => {
    try {
      const res = await userService.updateRole(userId, role)
      setUsers(prev => prev.map(u => u.id === userId ? res.data : u))
    } catch (err) {
      console.error('Erreur mise à jour rôle:', err)
    }
  }

  const addUser = async (data: { firstName: string; lastName: string; email: string; password: string; phone?: string; role: UserItem['role'] }) => {
    const res = await userService.create(data)
    setUsers(prev => [res.data, ...prev])
    setShowAddModal(false)
    // Re-fetch stats
    const statsRes = await userService.stats()
    setStats(statsRes.data)
  }

  const toggleActive = async (userId: string) => {
    try {
      const res = await userService.toggleActive(userId)
      setUsers(prev => prev.map(u => u.id === userId ? res.data : u))
      // Re-fetch stats since active user count changed
      const statsRes = await userService.stats()
      setStats(statsRes.data)
    } catch (err) {
      console.error('Erreur toggle actif:', err)
    }
  }

  const statsCards: Array<{
    icon: string
    iconBg: string
    iconColor: string
    label: string
    value: string
    trend: string
    up: boolean | null
  }> = stats
    ? [
        { icon: 'group',            iconBg: 'bg-primary/10',           iconColor: 'text-primary',           label: 'Total Utilisateurs',    value: stats.totalUsers.toLocaleString(),    trend: `${stats.superAdmins + stats.admins} admins`,  up: true },
        { icon: 'medical_services', iconBg: 'bg-secondary/10',         iconColor: 'text-secondary',         label: 'Administrateurs',       value: stats.admins.toString(),              trend: `${stats.superAdmins} super admin`,    up: null },
        { icon: 'people',           iconBg: 'bg-status-confirmed/10',  iconColor: 'text-status-confirmed',  label: 'Utilisateurs standard', value: stats.regularUsers.toLocaleString(),  trend: 'Comptes actifs',                      up: true },
        { icon: 'payments',         iconBg: 'bg-primary-container/10', iconColor: 'text-primary-container', label: 'Total Comptes',         value: (stats.totalUsers + stats.admins + stats.superAdmins).toLocaleString(), trend: 'Base de données', up: null },
      ]
    : []

  return (
    <AdminLayout title="Vue Système">
      <div className="px-gutter pb-section-gap pt-stack-lg">
        <div className="max-w-container-max mx-auto space-y-stack-lg">

          {/* ── KPI Cards ── */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {loading && !stats ? (
              <div className="col-span-full py-12 text-center text-on-surface-variant font-body-md">
                Chargement des statistiques...
              </div>
            ) : (
              statsCards.map(s => (
                <div
                  key={s.label}
                  className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/30 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 rounded-lg ${s.iconBg} flex items-center justify-center ${s.iconColor}`}>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                    </div>
                    <span className={`font-label-md text-label-md flex items-center gap-1 ${s.up === true ? 'text-status-confirmed' : 'text-outline'}`}>
                      {s.up === true && <span className="material-symbols-outlined text-sm">trending_up</span>}
                      {s.trend}
                    </span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface-variant mb-1">{s.label}</p>
                    <h3 className="font-headline-md text-headline-md text-sage-deep">{s.value}</h3>
                  </div>
                </div>
              ))
            )}
          </section>

          {/* ── Table Utilisateurs ── */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-gutter">
            <section className="xl:col-span-2">
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden">
                <div className="px-6 py-5 border-b border-outline-variant/30 flex justify-between items-center bg-white/50">
                  <h4 className="font-headline-sm text-headline-sm text-sage-deep">Gestion des Utilisateurs</h4>
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-primary text-white rounded-full font-label-md text-label-md hover:bg-sage-deep transition-colors cursor-pointer"
                  >
                    + Ajouter
                  </button>
                </div>

                <div className="overflow-x-auto">
                  {loading ? (
                    <div className="py-12 text-center text-on-surface-variant font-body-md">Chargement...</div>
                  ) : (
                    <table className="w-full text-left">
                      <thead className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md border-b border-outline-variant/30">
                        <tr>
                          <th className="px-6 py-4">Identité</th>
                          <th className="px-6 py-4">Rôle</th>
                          <th className="px-6 py-4">Statut</th>
                          <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-outline-variant/20">
                        {users.map((u, i) => {
                          const style = initialsStyle(i)
                          return (
                            <tr key={u.id} className="hover:bg-surface-container/30 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full ${style.bg} flex items-center justify-center font-bold text-xs ${style.textColor}`}>
                                    {initials(`${u.firstName} ${u.lastName}`)}
                                  </div>
                                  <div>
                                    <p className="font-label-md text-label-md text-on-surface">{u.firstName} {u.lastName}</p>
                                    <p className="font-caption text-caption text-outline">{u.email}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${ROLE_LABELS[u.role].cls}`}>
                                  {ROLE_LABELS[u.role].label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`flex items-center gap-1.5 font-label-md text-sm ${u.active ? 'text-status-confirmed' : 'text-outline'}`}>
                                  <span className={`w-2 h-2 rounded-full ${u.active ? 'bg-status-confirmed' : 'bg-outline'}`} />
                                  {u.active ? 'Actif' : 'Inactif'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button
                                  onClick={() => setEditUser(u)}
                                  className="p-1.5 text-outline hover:text-primary transition-colors rounded-full hover:bg-primary/5 cursor-pointer"
                                  title="Modifier le rôle"
                                >
                                  <span className="material-symbols-outlined">edit_square</span>
                                </button>
                                <button
                                  onClick={() => toggleActive(u.id)}
                                  className={`p-1.5 ml-2 transition-colors rounded-full cursor-pointer ${
                                    u.active
                                      ? 'text-outline hover:text-error hover:bg-error/5'
                                      : 'text-status-confirmed hover:text-primary hover:bg-status-confirmed/5'
                                  }`}
                                  title={u.active ? 'Désactiver' : 'Activer'}
                                >
                                  <span className="material-symbols-outlined">{u.active ? 'person_off' : 'person_check'}</span>
                                </button>
                              </td>
                            </tr>
                          )
                        })}
                        {users.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-on-surface-variant">
                              Aucun utilisateur trouvé
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </section>

            {/* ── Sidebar info ── */}
            <aside>
              <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/30 overflow-hidden flex flex-col h-full">
                <div className="px-6 py-5 border-b border-outline-variant/30 bg-white/50">
                  <h4 className="font-headline-sm text-headline-sm text-sage-deep">Administration</h4>
                </div>

                <div className="flex-1 p-6 space-y-6">
                  <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                    <span className="material-symbols-outlined text-primary text-3xl block mb-2">admin_panel_settings</span>
                    <h5 className="font-label-md text-label-md text-primary mb-1">Panel Super Admin</h5>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Gérez les utilisateurs, leurs rôles et leurs accès depuis cette interface.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-surface-variant/30 border border-outline-variant/20">
                    <h5 className="font-label-md text-label-md text-on-surface mb-2">Rappel</h5>
                    <ul className="space-y-2 text-sm text-on-surface-variant">
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-sm flex-shrink-0">info</span>
                        Les modifications de rôle sont appliquées immédiatement.
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-sm flex-shrink-0">info</span>
                        Désactiver un utilisateur empêche sa connexion.
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="p-4 border-t border-outline-variant/30 bg-surface-container-low text-center">
                  <Link to="/admin/settings" className="text-primary font-label-md text-label-md hover:underline">
                    Paramètres système
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {editUser && (
        <RoleModal
          user={editUser}
          onClose={() => setEditUser(null)}
          onSave={saveRole}
        />
      )}

      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSave={addUser}
        />
      )}
    </AdminLayout>
  )
}
