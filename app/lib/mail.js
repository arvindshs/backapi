
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yarul8406@gmail.com",
    pass: "lhhr xplr ccfn omkx",
  },
});

const sendEmail = async (to, subject, otp) => {
  const mailOptions = {
    from: "yarul8406@gmail.com",
    to: to,
    subject: subject,
    text: `your otp : ${otp}.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    if (info.response.includes("OK")) {
      return true;
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
