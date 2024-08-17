import { CreatePaymentDto } from "../../Models/DTO/paymentDto/createPaymentDto";
import { Payment } from "../../Models/Payment";
import { v4 as uuidv4 } from "uuid";

export type CreatePaymentType = {
  id: string;
  invoiceId: string;
  customerId: string;
  amount: number;
  paymentMethod: string;
  status: string;
  isPaid: boolean;
};
let payments: Payment[] = [];

export const createPayment = async (createPaymentDto: CreatePaymentDto) => {
  const newId = uuidv4();

  const payment: CreatePaymentType = {
    id: newId,
    invoiceId: createPaymentDto.invoiceId,
    customerId: createPaymentDto.customerId,
    amount: createPaymentDto.amount,
    paymentMethod: createPaymentDto.paymentMethod,
    status: "GENERATED",
    isPaid: false,
  };

  payments.push(payment);

  return payment;
};
