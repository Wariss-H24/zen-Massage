import type { Request, Response, NextFunction } from 'express'
import * as orderService from '../services/orderService'
import type { OrderStatus } from '../generated/prisma'

/* ── Créer une commande (utilisateur connecté) ── */
export async function createCommande(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = res.locals.user.id
    const commande = await orderService.createCommande({ ...req.body, utilisateur_id: userId })
    res.status(201).json({ success: true, message: 'Commande créée', data: commande })
  } catch (err) { next(err) }
}

/* ── Mes commandes ── */
export async function getMyCommandes(_req: Request, res: Response, next: NextFunction) {
  try {
    const commandes = await orderService.getCommandesUtilisateur(res.locals.user.id)
    res.json({ success: true, data: commandes })
  } catch (err) { next(err) }
}

/* ── Détail d'une commande ── */
export async function getCommande(req: Request, res: Response, next: NextFunction) {
  try {
    const commande = await orderService.getCommandeById(
      req.params.id as string,
      res.locals.user.id,
      res.locals.user.role,
    )
    res.json({ success: true, data: commande })
  } catch (err) { next(err) }
}

/* ── Annuler une commande ── */
export async function cancelCommande(req: Request, res: Response, next: NextFunction) {
  try {
    const commande = await orderService.cancelCommande(req.params.id as string, res.locals.user.id)
    res.json({ success: true, message: 'Commande annulée', data: commande })
  } catch (err) { next(err) }
}

/* ── Toutes les commandes (admin) ── */
export async function getAllCommandes(req: Request, res: Response, next: NextFunction) {
  try {
    const statut   = req.query.statut as OrderStatus | undefined
    const page     = parseInt(String(req.query.page  ?? 1), 10)
    const limite   = parseInt(String(req.query.limite ?? 20), 10)
    const result   = await orderService.getAllCommandes({ statut, page, limite })
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
}

/* ── Mettre à jour le statut (admin) ── */
export async function updateStatut(req: Request, res: Response, next: NextFunction) {
  try {
    const { statut } = req.body
    const commande = await orderService.updateStatutCommande(req.params.id as string, statut)
    res.json({ success: true, message: 'Statut mis à jour', data: commande })
  } catch (err) { next(err) }
}
