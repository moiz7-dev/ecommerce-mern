const nodemailer = require('nodemailer');

const sendEmail = async (emailConfig) => {
    const transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: emailConfig.email,
        subject: emailConfig.subject,
        text: emailConfig.message
    });
}

module.exports = sendEmail;