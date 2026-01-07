import nodemailer  from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.NODE_MAIL_HOST,
  port: 587,
  // secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.NODE_MAIL_USERNAME,
    pass: process.env.NODE_MAIL_PASSWORD, 
  },
});


export default transporter;

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//   // send mail with defined transport object
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }

// main().catch(console.error);