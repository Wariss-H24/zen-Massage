import rateLimit from 'express-rate-limit'

/**
 * Limite les tentatives sur les routes d'authentification sensibles
 * (login, register, forgot-password, reset-password).
 * Max 10 requêtes par IP sur une fenêtre de 15 minutes.
 */
export const authRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  standardHeaders: true,  // renvoie les headers RateLimit-* (RFC 6585)
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de tentatives. Veuillez réessayer dans 15 minutes.',
  },
  // Ignore les erreurs de store pour ne pas casser l'appli si Redis est absent
  skip: () => false,
})

/**
 * Limite plus souple pour les routes publiques en lecture.
 * Max 60 requêtes par IP par minute.
 */
export const publicRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Trop de requêtes. Veuillez réessayer dans un instant.',
  },
})
