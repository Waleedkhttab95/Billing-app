'use strict';
const moment = require("moment");
import { v4 as uuidv4 } from "uuid";
const nodemailer = require("nodemailer");
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');

module.exports.generateInvoice = async (event) => {
  generateInvoiceService(event).then(res=>{
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Invoice generated successfully!',
          input: res,
        },
        null,
        2
      ),
    };
  })
 

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


 const generateInvoiceService = async (event) => {
    const requestBody = JSON.parse(event.body);

    let subscriptionPlan = await getSubscriptionPlanById(
      requestBody.subscriptionPlanId
    ); //this step not efficent but if we use DB we can pupolate it directly without this query
  
    if (requestBody.subscriptionPlanId && subscriptionPlan) {
      const today = moment();
      const customerStartSubscriptionDate = moment(
        requestBody.startSubscriptionDate
      );
      const customerEndSubscriptionDate = moment(requestBody.startSubscriptionDate);
      const startBilling = moment().startOf(`${subscriptionPlan?.cycleName}`);
      const endBilling = moment().endOf(`${subscriptionPlan?.cycleName}`);
      let amount = 0;
      let isProrated = false;
  
      // Handle if it's prorated or not
  
      if (
        customerStartSubscriptionDate.isAfter(endBilling) ||
        customerEndSubscriptionDate.isBefore(startBilling)
      ) {
        // If subscription period is outside the billing cycle
        amount = 0;
      } else {
        // Calculate prorated amount
        const billingDays = endBilling.diff(startBilling, "days") + 1;
        const minDate =
          endBilling < customerEndSubscriptionDate
            ? endBilling
            : customerEndSubscriptionDate;
        const maxDate =
          customerStartSubscriptionDate > startBilling
            ? customerStartSubscriptionDate
            : startBilling;
  
        const subscriptionDays = minDate.diff(maxDate, "days") + 1;
  
        if (subscriptionDays < billingDays) {
          isProrated = true;
          amount = (subscriptionDays / billingDays) * subscriptionPlan.price;
        } else {
          amount = subscriptionPlan.price;
        }
      }
  
      let invoiceDto = {
        customerId: requestBody.id,
        amount: amount,
        status: InvoiceStatus.GENERATED,
        createdAt: today,
        prorated: isProrated,
        billingStartFrom: startBilling,
        billingEndTo: endBilling,
      };
  
      let newInvoice = await createInvoice(invoiceDto);
  
      // send email
      await sendEmail({
        name: requestBody.name,
        email: requestBody.email,
        date: today,
        id: newInvoice.id,
        subject: "New Invoice Generated",
        template: "newInvoiceTemplate",
      });
  
      return newInvoice;
    }
  };


const createInvoice = (invoiceDto) =>{
    const newId = uuidv4();

    const invoice = {
      id: newId,
      customerId: invoiceDto.customerId,
      amount: invoiceDto.amount,
      status: invoiceDto.status,
      createdAt: invoiceDto.createdAt,
      prorated: invoiceDto.prorated,
      billingStartFrom: invoiceDto.billingStartFrom,
      billingEndTo: invoiceDto.billingEndTo,
    };
  
    invoices.push(invoice);
  
    return invoice;
}

 const sendEmail = async (sendEmailType) => {


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
    transporter.verify(function (error, success) {
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
  
    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  
    return true;
  };