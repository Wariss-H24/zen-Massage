import type { Request, Response, NextFunction } from 'express'
import * as appointmentService from '../services/appointmentService'

export async function getTypeSeances(_req: Request, res: Response, next: NextFunction) {
  try {
    const typeSeances = await appointmentService.getTypeSeances()
    res.json({ success: true, data: typeSeances })
  } catch (err) {
    next(err)
  }
}

export async function getPublicAppointments(_req: Request, res: Response, next: NextFunction) {
  try {
    const appointments = await appointmentService.getAllAppointmentsPublic()
    res.json({ success: true, data: appointments })
  } catch (err) {
    next(err)
  }
}

export async function createAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    const appointment = await appointmentService.createAppointment({
      ...req.body,
      utilisateur_id: res.locals.user.id,
    })

    res.status(201).json({
      success: true,
      message: 'Rendez-vous cree avec succes',
      data: appointment,
    })
  } catch (err) {
    next(err)
  }
}

export async function getMyAppointments(_req: Request, res: Response, next: NextFunction) {
  try {
    const appointments = await appointmentService.getUserAppointments(res.locals.user.id)
    res.json({ success: true, data: appointments })
  } catch (err) {
    next(err)
  }
}

export async function getAllAppointments(_req: Request, res: Response, next: NextFunction) {
  try {
    const appointments = await appointmentService.getAllAppointments()
    res.json({ success: true, data: appointments })
  } catch (err) {
    next(err)
  }
}

export async function updateAppointmentStatus(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const { statut, raison_refus } = req.body
    const appointment = await appointmentService.updateAppointmentStatus(id, statut, raison_refus)
    res.json({ success: true, message: 'Statut mis a jour', data: appointment })
  } catch (err) {
    next(err)
  }
}

export async function deleteAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    await appointmentService.deleteAppointment(id, res.locals.user.id)
    res.json({ success: true, message: 'Rendez-vous supprime' })
  } catch (err) {
    next(err)
  }
}

export async function updateAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    // Convertir date_heure en Date si elle est présente
    const data = req.body.date_heure ? { ...req.body, date_heure: new Date(req.body.date_heure) } : req.body
    const appointment = await appointmentService.updateAppointment(id, res.locals.user.id, data)
    res.json({ success: true, message: 'Rendez-vous mis a jour', data: appointment })
  } catch (err) {
    next(err)
  }
}

export async function cancelAppointment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params
    const appointment = await appointmentService.cancelAppointment(id, res.locals.user.id)
    res.json({ success: true, message: 'Rendez-vous annule', data: appointment })
  } catch (err) {
    next(err)
  }
}
