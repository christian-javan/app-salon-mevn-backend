import nodemailer from 'nodemailer'

export function createTransporter(host, port, user, pass) {
  // Looking to send emails in production? Check out our Email API/SMTP product!
  return nodemailer.createTransport({
    host,
    port,
    auth: {
      user, //4c04f6e3f44898
      pass //f26da326a51afe
    }
  });
}