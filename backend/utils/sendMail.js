const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendUnlockEmail = async (userEmail, title) => {
  await transporter.sendMail({
    from: `"TimeCapsule" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "A Letter From Your Past Self 💛",
    html: `
      <h2>The words you saved for the future are waiting for you ✨</h2>
      <p>The envelope <strong>${title}</strong> has reached its unlock date.</p>
      <p>Return to TimeCapsule and open your memory.</p>
      <a href="http://localhost:5173/dashboard">Open TimeCapsule</a>
    `,
  });
};

module.exports = sendUnlockEmail;