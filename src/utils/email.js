// install and use the nodemailer
// configure the email server
// whom and what to send. make the email body
// use the previousn config to sent the email.

import nodemailer from "nodemailer";

const emailProcessing = async (emailInfo) => {
  try {
    //config here
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    //send email here
    const info = await transporter.sendMail(emailInfo);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

// email templating

export const adminSignUpEmailVerification = ({ email, fName }, url) => {
  let info = {
    from: `"Register Form 👻" ${email}`, // sender address
    to: process.env.SMTP_USER, // list of receivers
    subject: "New account confirmation- action required!", // Subject line
    text: `Hi ${fName}, please follow the ${url} to verify the account`, // plain text body
    html: `
        <p> Hi ${fName} </p>
        <br/>
        <br/>
        Please follow the link below to verify your account:
        <br/>
        <br/>
        <br/>
        <a href="${url}" style="color : red; font-weight: bolder"> Verify now </a>
        <br/>
        <br/>
        
        `, // html body
  };
  emailProcessing(info);
};
