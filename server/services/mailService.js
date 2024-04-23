const nodemailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Activation of account on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>Activate your account on link below</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    })
  }

  async sendChangePasswordMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Change your password on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>Change your password on link below</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    })
  }
}

module.exports = new MailService()
