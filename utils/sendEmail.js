const nodeMailer = require("nodemailer");

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodeMailer.createTransport({
      // host: process.env.HOST,
      // service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      // secure:Boolean(process.env.SECURE),
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
                <a href=${text}>Click here to verify</a>
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
