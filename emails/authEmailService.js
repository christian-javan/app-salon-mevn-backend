import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailVerification({ name, email, token }){

  const transporter = createTransporter(
    process.env.MAIL_HOST,
    process.env.MAIL_PORT,
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD
  )

  //Enviar el email

  const info = await transporter.sendMail({
    from: 'App Salon',
    to: email,
    subject: 'App Salon: confirma tu cuenta',
    text: 'App Salon - Confirma tu cuenta',
    html: `<p>Hola ${name}, confirma tu cuenta en App Salon</p>
    <p>Tu cuenta está casi lista, solo debes conirmarla en el siguiente enlace</p>
    <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
    <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>`
  })

  console.log('Mensaje enviado', info.messageId)

}

export async function sendEmailPasswordReset({ name, email, token }){

  const transporter = createTransporter(
    process.env.MAIL_HOST,
    process.env.MAIL_PORT,
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD
  )

  //Enviar el email

  const info = await transporter.sendMail({
    from: 'App Salon',
    to: email,
    subject: 'App Salon: resetea tu password',
    text: 'App Salon - resetea tu password',
    html: `<p>Hola ${name}, haz clic en el siguiente enlace para resetear tu password</p>
    <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Resetear password</a>
    <p>Si tu no pediste resetear tu password, puedes ignorar este mensaje</p>`
  })

}