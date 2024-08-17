import { CreateInvoiceDto } from "../../Models/DTO/invoiceSto/createInvoiceDto";
import { Invoice, InvoiceStatus } from "../../Models/Invoice";
import { v4 as uuidv4 } from "uuid";

export type CreateInvoiceType = {
  id: string;
  customerId: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: Date;
  prorated: boolean;
  billingStartFrom: Date;
  billingEndTo: Date;
};

let invoices: Invoice[] = [];

export const createInvoice = (createInvoiceDto: CreateInvoiceDto) => {
  const newId = uuidv4();

  const invoice: CreateInvoiceType = {
    id: newId,
    customerId: createInvoiceDto.customerId,
    amount: createInvoiceDto.amount,
    status: createInvoiceDto.status,
    createdAt: createInvoiceDto.createdAt,
    prorated: createInvoiceDto.prorated,
    billingStartFrom: createInvoiceDto.billingStartFrom,
    billingEndTo: createInvoiceDto.billingEndTo,
  };

  invoices.push(invoice);

  return invoice;
};

export const getInvoiceById = (id: string) =>{

  const invoice = invoices.find(invoice => invoice.id === id);

  if(invoice)
  return invoice;

  return null
}


export const getcustomerInvoices = async (customerId : string) =>{

  
  const customerInvocies = invoices.filter(invlice => invlice.customerId === customerId);

  if(customerInvocies)
  return customerInvocies;

  return null
}