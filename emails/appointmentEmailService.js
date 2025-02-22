import { createTransporter } from "../config/nodemailer.js";

export async function sendEmailNewAppointment({date, time}) {
  const transporter = createTransporter(
    process.env.MAIL_HOST,
    process.env.MAIL_PORT,
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD
  )

    //Enviar el email

  const info = await transporter.sendMail({
    from: 'App Salon',
    to: 'admin@appsalon.com',
    subject: 'App Salon: Nueva cita',
    text: 'App Salon - Nueva Cita',
    html: `<p>Hola ADMIN, Hay una nueva cita</p>
    <p>La cita será el dia ${date} a las ${time} horas</p>`
  })

  console.log('Mensaje enviado', info.messageId)
  
}

export async function sendEmailUpdateAppointment({date, time}) {
  const transporter = createTransporter(
    process.env.MAIL_HOST,
    process.env.MAIL_PORT,
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD
  )

    //Enviar el email

  const info = await transporter.sendMail({
    from: 'App Salon',
    to: 'admin@appsalon.com',
    subject: 'App Salon: Cita actualizada',
    text: 'App Salon - Cita actualizada',
    html: `<p>Hola ADMIN, un usuario ha modificado una cita</p>
    <p>La nueva cita será el dia ${date} a las ${time} horas</p>`
  })

  console.log('Mensaje enviado', info.messageId)
  
}

export async function sendEmailCancelAppointment({date, time}) {
  const transporter = createTransporter(
    process.env.MAIL_HOST,
    process.env.MAIL_PORT,
    process.env.MAIL_USER,
    process.env.MAIL_PASSWORD
  )

    //Enviar el email

  const info = await transporter.sendMail({
    from: 'App Salon',
    to: 'admin@appsalon.com',
    subject: 'App Salon: Cita cancelada',
    text: 'App Salon - Cita cancelada',
    html: `<p>Hola ADMIN, un usuario ha cancelado una cita</p>
    <p>La cita del dia ${date} a las ${time} horas fue cancelada</p>`
  })

  console.log('Mensaje enviado', info.messageId)
  
}