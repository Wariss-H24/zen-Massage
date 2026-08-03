import { Router, type Request, type Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import * as product from '../controllers/productController'
import { requireAuth } from '../middlewares/auth'
import { requireRole } from '../middlewares/roleCheck'
import { validateBody } from '../middlewares/validation'
import { prisma } from '../prisma'



const router = Router()

const productsUploadDir = path.join(process.cwd(), 'public', 'uploads', 'products')
if (!fs.existsSync(productsUploadDir)) fs.mkdirSync(productsUploadDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, productsUploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || '')
    const safeExt = ext && ext.length <= 10 ? ext : ''
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`
    cb(null, name)
  },
})

const upload = multer({
  storage,
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
  (req: Request, res: Response) => {
    const files = (req.files as Express.Multer.File[]) || []
    const host = req.get('host') || ''
    const protocol = req.protocol
    const urls = files.map((f) => `${protocol}://${host}/uploads/products/${f.filename}`)
    res.json({ success: true, message: 'Images uploadées', data: { urls } })
  }
)

// Publiques : voir les produits publiés
router.get('/',                               product.listProduits)
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
router.get("/debug/prisma", async (req: Request, res: Response) => {
  const produit = await prisma.produit.findFirst();
  res.json(produit);
});
export default router
