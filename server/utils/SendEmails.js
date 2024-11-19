import nodeMailer from "nodemailer";

export const sendEmail = async ({ email, subject, message }) => {
  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const options = {
    from: process.env.SMTP_FROM_EMAIL,
    to: email,
    subject: subject,
    html: message,
  };

  try {
    const info = await transporter.sendMail(options);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    if (error.response) {
      console.error("SMTP response:", error.response);
    }
    return false;
  }
};
