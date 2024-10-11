// const nodemailer = require("nodemailer");

// const SendEmailUtility = async (EmailTo, EmailSubject, EmailText) => {
//   console.log(EmailTo, EmailSubject, EmailText);

//   const transporter = nodemailer.createTransport({
//     service: "gmail.com",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "shahjalal050505@gmail.com",
//       pass: "esevppyllcibhxtd",
//     },
//   });

//   await transporter.sendMail({
//     from: 'shahjalal@gmail.com', // sender address
//     to: EmailTo, // list of receivers
//     subject: EmailSubject, // Subject line
//     text: EmailText, // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });


// };

// module.exports = SendEmailUtility;

// const nodemailer = require("nodemailer");

// const SendEmailUtility = async (EmailTo,EmailSubject, EmailText) => {

//     // Create a transporter Using SMTP 
//   const transporter = nodemailer.createTransport({
//     service: "Gmail",
//     auth: {
//       user: "shahjalal050505@gmail.com",
//       pass: "esev ppyl lcib hxtd",
//     },
//   });

//   // The Email Messege
//   let mailOptions = {
//     from: '"To-Do-Tasker" <shahjalal050505@gmail.com>',
//     to: EmailTo,
//     subject: EmailSubject,
//     text: EmailText,
//   };

//   // Send Email
//   return await transporter.sendMail(mailOptions);

// };

// module.exports = SendEmailUtility;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("esev ppyl lcib hxtd");

const SendEmailUtility = async (EmailTo, EmailSubject, EmailText) => {
  sgMail
    .send({
      to: EmailTo,
      from: 'shahjalal050505@gmail.com', // Use the email address or domain you verified above
      subject: EmailSubject,
      text: EmailText,
    })
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};
module.exports = SendEmailUtility; 
