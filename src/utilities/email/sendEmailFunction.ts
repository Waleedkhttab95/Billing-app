const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');


export type SendEmailType = {
  name: string;
  email: string;
  date: string;
  id: string;
  subject:string;
  template: string;
};

export const sendEmail = async (sendEmailType: SendEmailType) => {


  let transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // verify connection configuration
  transporter.verify(function (error: any, success: any) {
    if (error) {
      console.log(error);
    } else {
      console.log("Server is ready to take our messages");
    }
  });

  //compile the template using handlebars
  const templatePath = path.join(__dirname, `${sendEmailType.template}.html`);
  const source = fs.readFileSync(templatePath, 'utf8');
  const template = handlebars.compile(source);
  const emailTemplate = template(sendEmailType);

  let message = {
    from: process.env.EMAIL_FROM,
    to: sendEmailType.email,
    subject: sendEmailType.subject,
    html: emailTemplate
  };

  transporter.sendMail(message, (err: any, info: any) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  return true;
};
