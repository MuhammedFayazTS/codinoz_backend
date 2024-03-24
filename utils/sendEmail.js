const nodeMailer = require("nodemailer");

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      port:587,
      host:'smtp.gmail.com',
      secure:false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // send email
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: subject,
      html: `
            <div>
                <p>Please click the following link to verify your email address:</p>
                <a href="${text}">Click here to verify</a>
            </div>
        `,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent successfully");
    console.log(error);
  }
};

module.exports = sendMail;
