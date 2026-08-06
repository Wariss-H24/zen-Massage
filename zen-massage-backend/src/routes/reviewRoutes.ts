import { Router } from 'express'
import * as review from '../controllers/reviewController'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'
import { validateBody } from '../middlewares/validation'

const router = Router()

// Publiques
router.get('/',                              review.listReviews)
router.get('/:id',                           review.getReview)
router.get('/product/:productId',            review.listProductReviews)
router.get('/product/:productId/stats',      review.getProductStats)

// Connectés (utilisateurs)
router.post('/',
  requireAuth,
  validateBody(['note', 'titre', 'contenu', 'produit_id']),
  review.createReview
)
router.put('/:id',
  requireAuth,
  review.updateReview
)
router.delete('/:id',
  requireAuth,
  review.deleteReview
)
router.post('/:id/vote-utile',
  requireAuth,
  review.voteUtile
)

// Admin : répondre / modifier réponse avis
router.patch('/:id/reponse-admin',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  review.repondreAvis
)

// Admin : masquer / démasquer un avis
router.patch('/:id/masque',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  review.toggleMasque
)

// Admin : peut utiliser DELETE ci-dessus (grâce au roleCheck dans le service)

export default router
