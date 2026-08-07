import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function sendResetPasswordEmail(email: string, token: string) {
  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173'
  const link = `${frontendUrl}/reset-password?token=${token}`

  await transporter.sendMail({
    from: `"Ben Massage & Wellness" <${process.env.SMTP_USER}>`,
    to: email,
    subject: 'Réinitialisation de votre mot de passe',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#faf9f7;border-radius:12px;">
        <h2 style="color:#4A594D;margin-bottom:8px;">Ben Massage & Wellness</h2>
        <p style="color:#434843;">Vous avez demandé à réinitialiser votre mot de passe.</p>
        <p style="color:#434843;">Cliquez sur le bouton ci-dessous. Ce lien est valable <strong>1 heure</strong>.</p>
        <a href="${link}" style="display:inline-block;margin:24px 0;padding:14px 28px;background:#425646;color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">
          Réinitialiser mon mot de passe
        </a>
        <p style="color:#737872;font-size:13px;">Si vous n'avez pas fait cette demande, ignorez cet email.</p>
        <hr style="border:none;border-top:1px solid #e3e2e0;margin:24px 0;" />
        <p style="color:#737872;font-size:12px;">Ben Massage & Wellness · Libreville, Gabon</p>
      </div>
    `,
  })
}
