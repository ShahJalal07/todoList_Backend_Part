const nodemailer = require("nodemailer");

const SendEmailUtility = async (EmailTo,EmailSubject, EmailText) => {

    // Create a transporter Using SMTP 
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "shahjalalbhuiyan05@gmail.com",
      pass: "xyov czcx siff sikp",
    },
  });

  // The Email Messege
  let mailOptions = {
    from: '"To-Do-Tasker" <shahjalalbhuiyan05@gmail.com>',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText,
  };

  // Send Email
  return await transporter.sendMail(mailOptions);

};

module.exports = SendEmailUtility;
