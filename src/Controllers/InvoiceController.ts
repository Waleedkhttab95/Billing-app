import {
  createInvoiceService,
  getCustomerInvoices,
} from "../Services/invoiceService";
import { Request, Response } from "express";

export const CreateInvoicesAndProcessController = async (
  req: Request,
  res: Response
) => {
  try {
    const generatedInvoices = await createInvoiceService();
    res.status(201).send(generatedInvoices);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const getCustomerInvoicesController = async (req: Request, res: Response) => {
  try {
    const invoices = await getCustomerInvoices(req.params.customerId);
    res.status(200).send(invoices);
  } catch (err) {
    res.status(400).send(err);
  }
};
