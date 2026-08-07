import { useEffect } from 'react'
import UserLayout from '../components/layout/UserLayout'

const sections = [
  {
    icon: 'calendar_today',
    title: 'Réserver une séance',
    steps: [
      'Dans le menu à gauche, cliquez sur "Nouvelle Session".',
      'Choisissez le type de soin que vous souhaitez (massage, soin du visage, etc.).',
      'Sélectionnez une date dans le calendrier — seules les dates disponibles sont cliquables.',
      'Choisissez l\'heure qui vous convient parmi les créneaux libres.',
      'Ajoutez une note si vous avez une demande particulière (facultatif).',
      'Cliquez sur "Confirmer" — votre demande est envoyée au praticien.',
      'Attendez la confirmation du praticien avant de vous déplacer.',
    ],
    tips: [
      'Réservez à l\'avance, surtout le week-end — les créneaux partent vite.',
      'Utilisez la note pour préciser vos préférences (pression légère, zone à éviter, allergie...).',
    ],
    warnings: [
      'Ne vous déplacez pas avant d\'avoir reçu une confirmation — votre demande est d\'abord "En attente".',
      'Ne réservez pas plusieurs créneaux pour le même jour si vous n\'êtes pas sûr — annulez les créneaux inutiles.',
    ],
  },
  {
    icon: 'edit_calendar',
    title: 'Modifier ou annuler un rendez-vous',
    steps: [
      'Allez dans "Mes Rendez-vous" depuis le menu à gauche.',
      'Vous verrez la liste de tous vos rendez-vous avec leur statut.',
      'Un rendez-vous "En attente" peut être modifié ou annulé librement.',
      'Cliquez sur "Modifier" pour choisir une nouvelle date ou un nouvel horaire.',
      'Cliquez sur "Annuler" si vous ne pouvez plus venir — une confirmation vous sera demandée.',
    ],
    tips: [
      'Si vous devez annuler, faites-le le plus tôt possible pour libérer le créneau.',
      'Vous pouvez modifier la date autant de fois que nécessaire tant que le statut est "En attente".',
    ],
    warnings: [
      'Un rendez-vous "Confirmé" ne peut plus être modifié directement — contactez le spa par email.',
      'Ne laissez pas un rendez-vous "En attente" sans suite si vous ne pouvez plus venir, annulez-le.',
    ],
  },
  {
    icon: 'storefront',
    title: 'Acheter un produit',
    steps: [
      'Cliquez sur "Boutique" dans le menu à gauche.',
      'Parcourez les produits disponibles et cliquez sur celui qui vous intéresse.',
      'Consultez la description, le prix et les photos du produit.',
      'Cliquez sur "Ajouter au panier".',
      'Quand vous êtes prêt, allez dans votre panier et cliquez sur "Commander".',
      'Renseignez votre adresse de livraison et validez.',
    ],
    tips: [
      'Vérifiez bien votre adresse de livraison avant de valider.',
      'Vous pouvez commander plusieurs produits en une seule fois.',
    ],
    warnings: [
      'Une commande validée ne peut être annulée que si elle est encore "En attente" — agissez vite si vous changez d\'avis.',
      'Ne passez pas plusieurs commandes identiques par erreur — vérifiez votre panier avant de valider.',
    ],
  },
  {
    icon: 'shopping_bag',
    title: 'Suivre mes commandes',
    steps: [
      'Allez dans "Commandes" depuis le menu à gauche.',
      'Vous voyez toutes vos commandes passées et leur état actuel.',
      'Les statuts possibles sont : En attente, Confirmée, Expédiée, Livrée ou Annulée.',
      'Cliquez sur une commande pour voir le détail des produits commandés.',
      'Vous pouvez annuler une commande tant qu\'elle est encore "En attente".',
    ],
    tips: [
      'Consultez régulièrement vos commandes pour suivre leur avancement.',
      'Si votre commande est "Expédiée" depuis longtemps sans mise à jour, contactez le spa.',
    ],
    warnings: [
      'Une commande "Confirmée" ou "Expédiée" ne peut plus être annulée — contactez directement le spa.',
    ],
  },
  {
    icon: 'person',
    title: 'Modifier mon profil',
    steps: [
      'Allez dans "Profil" depuis le menu à gauche.',
      'Vous pouvez changer votre prénom, nom, email et numéro de téléphone.',
      'Pour changer votre photo, cliquez sur votre avatar et choisissez une nouvelle image.',
      'Pour changer votre mot de passe, remplissez les champs dédiés et sauvegardez.',
    ],
    tips: [
      'Gardez votre email à jour — c\'est là que vous recevrez les confirmations de rendez-vous.',
      'Choisissez un mot de passe fort avec des lettres, chiffres et symboles.',
    ],
    warnings: [
      'Ne partagez jamais votre mot de passe avec quelqu\'un d\'autre.',
      'Si vous changez votre email, assurez-vous d\'avoir accès à la nouvelle adresse avant de sauvegarder.',
    ],
  },
  {
    icon: 'star',
    title: 'Laisser un avis',
    steps: [
      'Après une séance marquée comme "Terminée", vous pouvez laisser un avis.',
      'Donnez une note de 1 à 5 étoiles selon votre expérience.',
      'Ajoutez un titre et un commentaire pour partager votre ressenti.',
      'Votre avis sera visible par tous les visiteurs du site.',
      'Le praticien peut vous répondre directement sous votre avis.',
    ],
    tips: [
      'Soyez précis dans votre commentaire — cela aide les autres clients à choisir.',
      'Mentionnez le type de soin que vous avez reçu pour que votre avis soit utile.',
    ],
    warnings: [
      'Ne laissez pas de faux avis ou d\'avis pour une séance que vous n\'avez pas faite.',
      'Restez respectueux dans vos commentaires — les avis inappropriés peuvent être masqués.',
    ],
  },
]

export default function Support() {
  useEffect(() => {
    document.title = 'Aide | Ben Massage & Wellness'
  }, [])

  return (
    <UserLayout title="Centre d'aide" subtitle="Comment utiliser votre espace client">
      <div className="p-6 md:p-margin-desktop max-w-3xl mx-auto space-y-6 pb-16">

        {/* Intro */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 flex gap-4 items-start">
          <span className="material-symbols-outlined text-primary text-3xl shrink-0">waving_hand</span>
          <div>
            <p className="font-label-md text-label-md text-sage-deep mb-1">Bienvenue sur votre espace client</p>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Ce guide vous explique tout ce que vous pouvez faire sur Ben Massage & Wellness, avec des conseils pour bien utiliser l'application et les erreurs courantes à éviter.
            </p>
          </div>
        </div>

        {/* Légende */}
        <div className="flex flex-wrap gap-4 px-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
            <span className="font-caption text-caption text-on-surface-variant">Étapes à suivre</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-green-600 text-[18px]">lightbulb</span>
            <span className="font-caption text-caption text-on-surface-variant">Conseils utiles</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-error text-[18px]">warning</span>
            <span className="font-caption text-caption text-on-surface-variant">À ne pas faire</span>
          </div>
        </div>

        {sections.map((s) => (
          <div key={s.title} className="bg-surface-container-lowest rounded-xl border border-outline-variant/20 overflow-hidden">

            {/* Header section */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-outline-variant/10 bg-sand-light/30">
              <span className="material-symbols-outlined text-sage-deep">{s.icon}</span>
              <h3 className="font-headline-sm text-headline-sm text-sage-deep">{s.title}</h3>
            </div>

            <div className="px-5 py-4 space-y-5">

              {/* Étapes */}
              <ol className="space-y-3">
                {s.steps.map((step, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-[11px] font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="font-body-md text-body-md text-on-surface-variant">{step}</p>
                  </li>
                ))}
              </ol>

              {/* Conseils */}
              <div className="bg-green-50 border border-green-100 rounded-lg px-4 py-3 space-y-2">
                {s.tips.map((tip, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-green-600 text-[18px] shrink-0 mt-0.5">lightbulb</span>
                    <p className="font-body-md text-body-md text-green-800">{tip}</p>
                  </div>
                ))}
              </div>

              {/* Avertissements */}
              <div className="bg-error/5 border border-error/15 rounded-lg px-4 py-3 space-y-2">
                {s.warnings.map((warn, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="material-symbols-outlined text-error text-[18px] shrink-0 mt-0.5">warning</span>
                    <p className="font-body-md text-body-md text-error/80">{warn}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>
        ))}

        {/* Contact */}
        <div className="bg-sage-deep text-white rounded-xl p-6 text-center">
          <span className="material-symbols-outlined text-4xl mb-3 block">support_agent</span>
          <p className="font-headline-sm text-headline-sm mb-1">Vous avez une question ?</p>
          <p className="font-body-md opacity-80">Contactez-nous à <span className="font-semibold">contact@benmassage.ga</span></p>
        </div>

      </div>
    </UserLayout>
  )
}
