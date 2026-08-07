import { useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'

const sections = [
  {
    icon: 'dashboard',
    color: 'text-sage-deep',
    title: 'Tableau de bord — Vue d\'ensemble',
    desc: 'C\'est la première page que vous voyez en vous connectant. Elle vous donne un résumé de toute votre activité en un coup d\'œil.',
    items: [
      { label: 'Demandes de séance en attente', desc: 'Vous voyez ici toutes les réservations que vos clients ont faites et qui attendent votre réponse. Vous pouvez accepter, refuser, déplacer à une autre date, ou ajouter une note privée sur chaque demande.' },
      { label: 'Votre planning de la semaine', desc: 'Définissez vos jours et heures d\'ouverture ainsi que votre pause déjeuner. Les clients ne pourront pas réserver en dehors de ces horaires.' },
      { label: 'Vos produits en stock', desc: 'Un aperçu rapide de vos 4 derniers produits avec leur niveau de stock. Un badge rouge signale une rupture, orange un stock faible.' },
      { label: 'Avis de vos clients', desc: 'Les 5 derniers avis laissés par vos clients. Vous pouvez y répondre ou masquer un avis inapproprié.' },
      { label: 'Dernières ventes', desc: 'Un tableau des 5 dernières commandes passées sur la boutique.' },
    ],
  },
  {
    icon: 'calendar_today',
    color: 'text-primary',
    title: 'Gérer les réservations',
    desc: 'Accédez à l\'historique complet de tous les rendez-vous de tous vos clients.',
    items: [
      { label: 'Voir tous les rendez-vous', desc: 'Filtrez par statut (en attente, confirmé, terminé, annulé) ou par date pour retrouver facilement un rendez-vous.' },
      { label: 'Changer le statut d\'un rendez-vous', desc: 'Passez un rendez-vous de "En attente" à "Confirmé" pour valider la séance, "Terminé" une fois la séance effectuée, ou "Annulé" si elle ne peut pas avoir lieu. En cas d\'annulation, vous pouvez indiquer la raison au client.' },
      { label: 'Déplacer un rendez-vous', desc: 'Si vous devez changer la date ou l\'heure d\'une séance, sélectionnez un nouveau créneau directement depuis cette page.' },
      { label: 'Notes privées', desc: 'Ajoutez des notes internes sur un client ou une séance. Ces notes ne sont jamais visibles par le client, elles sont uniquement pour vous.' },
    ],
  },
  {
    icon: 'category',
    color: 'text-amber-700',
    title: 'Gérer les catégories de produits',
    desc: 'Organisez vos produits en catégories pour que vos clients s\'y retrouvent facilement dans la boutique.',
    items: [
      { label: 'Créer une catégorie', desc: 'Donnez un nom et une description à votre nouvelle catégorie (ex : Huiles essentielles, Soins du visage, Bougies...).' },
      { label: 'Modifier ou supprimer', desc: 'Renommez une catégorie existante ou supprimez-la. Attention : si des produits sont liés à cette catégorie, ils seront affectés.' },
    ],
  },
  {
    icon: 'inventory_2',
    color: 'text-purple-700',
    title: 'Gérer les produits de la boutique',
    desc: 'Ajoutez, modifiez ou retirez les produits que vous vendez en ligne.',
    items: [
      { label: 'Voir tous les produits', desc: 'Liste complète de vos produits avec leur prix, leur stock et leur statut. Filtrez par catégorie ou par niveau de stock.' },
      { label: 'Ajouter un nouveau produit', desc: 'Renseignez le nom, la description, le prix en FCFA, la quantité en stock, la catégorie et ajoutez des photos. Les photos sont stockées automatiquement en ligne.' },
      { label: 'Modifier un produit', desc: 'Mettez à jour n\'importe quelle information d\'un produit existant : prix, stock, description, photos.' },
      { label: 'Supprimer un produit', desc: 'Retirez définitivement un produit de la boutique. Cette action est irréversible.' },
    ],
  },
  {
    icon: 'history_edu',
    color: 'text-teal-700',
    title: 'Gérer les commandes',
    desc: 'Suivez et traitez toutes les commandes passées par vos clients sur la boutique.',
    items: [
      { label: 'Voir toutes les commandes', desc: 'Historique complet avec le numéro de commande, le nom du client, le montant total et le statut.' },
      { label: 'Faire avancer une commande', desc: 'Une commande passe par ces étapes : En attente → Confirmée (vous avez vérifié) → Expédiée (colis envoyé) → Livrée (client a reçu). Vous changez le statut manuellement à chaque étape.' },
      { label: 'Voir le détail d\'une commande', desc: 'Consultez exactement quels produits ont été commandés, en quelle quantité, le total et l\'adresse de livraison du client.' },
    ],
  },
  {
    icon: 'analytics',
    color: 'text-blue-700',
    title: 'Statistiques et rapports',
    desc: 'Analysez les performances de votre activité sur une période donnée.',
    items: [
      { label: 'Chiffres clés', desc: 'Chiffre d\'affaires total, nombre de commandes, nombre de séances réservées et nombre de clients actifs.' },
      { label: 'Filtrer par période', desc: 'Affichez les statistiques pour "Tout le temps", "Ce mois-ci" ou "Cette année".' },
      { label: 'Exporter en Excel', desc: 'Téléchargez la liste de vos commandes ou de vos rendez-vous dans un fichier Excel (format CSV) pour les consulter ou les archiver.' },
      { label: 'Imprimer un rapport', desc: 'Générez un rapport PDF de la page statistiques pour l\'imprimer ou le sauvegarder.' },
      { label: 'Produits les plus vendus', desc: 'Classement de vos produits par nombre de ventes sur la période choisie.' },
      { label: 'Types de séances populaires', desc: 'Voyez quels types de massages ou soins sont les plus demandés par vos clients.' },
    ],
  },
  {
    icon: 'settings',
    color: 'text-on-surface-variant',
    title: 'Paramètres du spa',
    desc: 'Configurez les informations générales de votre établissement et vos types de soins.',
    items: [
      { label: 'Informations du spa', desc: 'Nom de l\'établissement, adresse, numéro de téléphone et email de contact affichés sur le site.' },
      { label: 'Types de séances proposées', desc: 'Gérez la liste de vos soins : ajoutez un nouveau type de massage ou soin, définissez sa durée et son prix.' },
      { label: 'Bloquer des créneaux', desc: 'Bloquez des plages horaires précises pour des jours spécifiques (jour férié, congé, événement privé). Les clients ne pourront pas réserver sur ces créneaux.' },
    ],
  },
  {
    icon: 'admin_panel_settings',
    color: 'text-error',
    title: 'Gestion des comptes (Super Admin uniquement)',
    desc: 'Cette section est réservée au propriétaire principal du compte. Elle permet de gérer tous les utilisateurs de la plateforme.',
    items: [
      { label: 'Voir tous les comptes', desc: 'Liste de tous les clients et administrateurs inscrits sur la plateforme avec leurs informations.' },
      { label: 'Changer le rôle d\'un utilisateur', desc: 'Vous pouvez promouvoir un client en administrateur, ou rétrograder un administrateur. Il existe 3 niveaux : Client (accès à son espace personnel), Administrateur (accès au panel de gestion), Super Admin (accès total).' },
      { label: 'Désactiver ou supprimer un compte', desc: 'Bloquez l\'accès d\'un utilisateur ou supprimez définitivement son compte de la plateforme.' },
    ],
  },
]

export default function AdminSupport() {
  useEffect(() => {
    document.title = 'Guide d\'utilisation | Ben Massage & Wellness'
  }, [])

  return (
    <AdminLayout title="Guide d'utilisation">
      <div className="px-6 pb-20 pt-8 max-w-4xl mx-auto space-y-6">

        <div className="bg-sage-deep/5 border border-sage-deep/20 rounded-xl p-5 flex gap-4 items-start">
          <span className="material-symbols-outlined text-sage-deep text-3xl shrink-0">menu_book</span>
          <div>
            <p className="font-label-md text-label-md text-sage-deep mb-1">Bienvenue dans votre espace de gestion</p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Ce guide vous explique tout ce que vous pouvez faire depuis votre panel d'administration, sans jargon technique.
            </p>
          </div>
        </div>

        {sections.map((s) => (
          <div key={s.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/10 bg-sand-light/30">
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-sage-deep">{s.title}</h3>
                <p className="font-caption text-caption text-on-surface-variant mt-0.5">{s.desc}</p>
              </div>
            </div>
            <div className="px-5 py-4 space-y-4">
              {s.items.map((item) => (
                <div key={item.label} className="flex gap-3 items-start">
                  <span className="material-symbols-outlined text-primary/50 text-[20px] shrink-0 mt-0.5">check_circle</span>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">{item.label}</p>
                    <p className="font-body-md text-body-md text-on-surface-variant">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="bg-sage-deep text-white rounded-xl p-6 text-center">
          <span className="material-symbols-outlined text-4xl mb-3 block">support_agent</span>
          <p className="font-headline-sm text-headline-sm mb-1">Besoin d'aide ?</p>
          <p className="font-body-md opacity-80">Contactez le support à <span className="font-semibold">contact@benmassage.ga</span></p>
        </div>

      </div>
    </AdminLayout>
  )
}
