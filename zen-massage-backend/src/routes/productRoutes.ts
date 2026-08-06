import { Router, type Request, type Response, type NextFunction } from 'express'
import multer from 'multer'
import * as product from '../controllers/productController'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'
import { validateBody } from '../middlewares/validation'
import { uploadProductImageBuffer } from '../services/cloudinaryService'

const router = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 3 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith('image/')) return cb(new Error('Fichier invalide (image uniquement)'))
    cb(null, true)
  },
})

/* ============================================================
   CATÉGORIES (publiques en lecture, admin en écriture)
   ============================================================ */

router.get('/categories',                      product.listCategories)
router.get('/categories/:id',                  product.getCategorie)

router.post('/categories',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  validateBody(['nom']),
  product.createCategorie
)
router.put('/categories/:id',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  product.updateCategorie
)
router.delete('/categories/:id',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  product.deleteCategorie
)

/* ============================================================
   PRODUITS
   ============================================================ */

router.post('/images/upload',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  upload.array('images', 3),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const files = (req.files as Express.Multer.File[]) || []
      if (files.length === 0) {
        res.status(400).json({ success: false, message: 'Aucune image reçue' })
        return
      }
      const urls = await Promise.all(files.map(uploadProductImageBuffer))
      res.json({ success: true, message: 'Images uploadées', data: { urls } })
    } catch (err) {
      next(err)
    }
  }
)

// Publiques : voir les produits publiés
router.get('/',                               product.listProduits)
router.post('/batch-stocks',                  product.batchStocks)  // Récupérer stocks pour une liste d'IDs (panier)
router.get('/admin',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  product.listProduitsAdmin
)
router.get('/:id',                            product.getProduit)

// Admin : gestion complète
router.post('/',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  validateBody(['nom', 'description', 'prix', 'stock', 'categorie_id']),
  product.createProduit
)
router.put('/:id',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  product.updateProduit
)
router.delete('/:id',
  requireAuth,
  requireRole('ADMIN', 'SUPER_ADMIN'),
  product.deleteProduit
)

/* ============================================================
   LIKES
   ============================================================ */

router.get('/:id/likes/count',                product.getLikesCount)
router.get('/:id/likes/status',
  requireAuth,
  product.getLikeStatus
)
router.post('/:id/like',
  requireAuth,
  product.toggleLike
)

export default router
