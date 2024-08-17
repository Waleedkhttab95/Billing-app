import delay from "delay";
import { getcustomerById } from "../Repositories/customer/customerRepo";
import { getInvoiceById } from "../Repositories/invoice/invoiceRepo";
import {
  createPayment,
  CreatePaymentType,
} from "../Repositories/payment/paymentRepo";
import { sendEmail } from "../utilities/email/sendEmailFunction";
import { ResourceNotFoundError } from "../Errors/ResourceNotFoundError";
import { CreatePaymentDto } from "../Models/DTO/paymentDto/createPaymentDto";
import { InvoiceStatus } from "../Models/Invoice";

export const createPaymentService = async (
  createPaymentDto : CreatePaymentDto
) => {
  const customer = await getcustomerById(createPaymentDto.customerId);
  const invoice = await getInvoiceById(createPaymentDto.invoiceId);

  if (!customer || !invoice) throw new ResourceNotFoundError("Customer or invocie not found !");

  if (customer.id != invoice.customerId)
    throw new ResourceNotFoundError("customer and the invoice doesnot matching !");

  const newPayment = await createPayment({
    invoiceId: invoice.id,
    customerId: customer.id,
    amount: invoice.amount,
    paymentMethod: createPaymentDto.paymentMethod,
  });
  // Payment process
  try {
    const paymentResult = await paymentProccess(newPayment);

    // Update invoice status
    invoice.status = InvoiceStatus.PAID;
    invoice.paymentDate = new Date();

    // send email
    await sendEmail({
      name: customer.name,
      email: customer.email,
      date: new Date().toDateString(),
      id: newPayment.id,
      subject: "Payment success",
      template: "successPaymentTemplate",
    });
  } catch (err) {
    // send email
    await sendEmail({
      name: customer.name,
      email: customer.email,
      date: new Date().toDateString(),
      id: newPayment.id,
      subject: "Payment faild",
      template: "faildPaymentTemplate",
    });

    throw new Error("Payment failed on all attempts ! ");
  }
};

export const paymentProccess = async (payment: CreatePaymentType) => {
  let attemptsCount = 0; // here we can change the attemps of filad payments

  while (attemptsCount < 3) {
    // Here we can write the payment gateway proccess
    // integration process () =>
    let paymentStatusResult; // Here we can get the status from payment process

    if (paymentStatusResult === "successfuly") {
      (payment.status = "PAID"), (payment.isPaid = true);
      attemptsCount = 3; // to make sure we will exit from while

      return payment;
    } else {
      attemptsCount++;
      await delay(2000); // we can change the delay time
    }
  }

  throw new Error("Payment Faild !");
};
