const nodeMailer = require('nodemailer')


const adminEmail = process.env.ADMIN_EMAIL
const adminPassword = process.env.ADMIN_PASSWORD

// Host gmail google
const mailHost = 'smtp.gmail.com'

// Standard port of SMTP Protocol
const mailPort = 587

const sendMail = (to, subject, htmlContent) => {
    const transporter = nodeMailer.createTransport({
        host: mailHost,
        port: mailPort,
        secure: false, 
        auth: {
            user: adminEmail,
            pass: adminPassword
        }
    })

    const options = {
        from: adminEmail,
        to: to,
        subject: subject,
        html: htmlContent,
    }

    // return a promise
    return transporter.sendMail(options)
}

module.exports = {
    sendMail: sendMail
}