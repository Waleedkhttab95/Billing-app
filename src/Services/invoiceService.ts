import axios, { AxiosResponse } from "axios";
import { ResourceNotFoundError } from "../Errors/ResourceNotFoundError";
import { Customers } from "../Models/Customer";
import { CreateInvoiceDto } from "../Models/DTO/invoiceSto/createInvoiceDto";
import { InvoiceStatus } from "../Models/Invoice";
import {
  getcustomersByMultiPlanId,
  getCustomersWithEndDate,
} from "../Repositories/customer/customerRepo";
import {
  createInvoice,
  CreateInvoiceType,
  getcustomerInvoices,
} from "../Repositories/invoice/invoiceRepo";
import {
  getSubscriptionPlanById,
  getSubscriptionPlandByNextBillingDate,
} from "../Repositories/subscription/subscriptionRepo";
import { sendEmail } from "../utilities/email/sendEmailFunction";
import { updateNexBillDate } from "./subscriptionService";
const moment = require("moment");

export const createInvoiceService = async () => {
  // Get All plans need to generate new bill today
  const plansNeedToBilling = await getSubscriptionPlansNeedToBillToday();

  // Get all customers who have these plans
  const customers = await getcustomersByMultiPlanId(plansNeedToBilling);
  if (!customers)
    throw new ResourceNotFoundError("No Customers With these Plans");

  let arrOfInvoices: CreateInvoiceType[] = [];

  // now let's create a new invoice for each customer

  customers.forEach(async (customer) => {
    let newInvoiceCreated = await generateInvoiceService(customer);
    if (newInvoiceCreated) arrOfInvoices.push(newInvoiceCreated);
  });

  // Finally we need to update nextBilling for each plan
  await updateNexBillDate(plansNeedToBilling);

  return arrOfInvoices;
};

export const generateInvoiceService = async (customer: Customers) => {
  let subscriptionPlan = await getSubscriptionPlanById(
    customer.subscriptionPlanId!
  ); //this step not efficent but if we use DB we can pupolate it directly without this query

  if (customer.subscriptionPlanId && subscriptionPlan) {
    const today = moment();
    const customerStartSubscriptionDate = moment(
      customer.startSubscriptionDate
    );
    const customerEndSubscriptionDate = moment(customer.startSubscriptionDate);
    const startBilling = moment().startOf(`${subscriptionPlan?.cycleName}`);
    const endBilling = moment().endOf(`${subscriptionPlan?.cycleName}`);
    let amount = 0;
    let isProrated = false;

    // Handle if it's prorated or not

    if (
      customerStartSubscriptionDate!.isAfter(endBilling) ||
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

    let invoiceDto: CreateInvoiceDto = {
      customerId: customer.id,
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
      name: customer.name,
      email: customer.email,
      date: today,
      id: newInvoice.id,
      subject: "New Invoice Generated",
      template: "newInvoiceTemplate",
    });

    return newInvoice;
  }
};

export const createUpdatedSubscriptionInvoice = (
  customerStartDate: Date,
  oldPlanPrice: number,
  newPlanPrice: number,
  today: Date,
  billingCycle: string
) => {
  const oldPlan = oldPlanPrice;
  const newPlan = newPlanPrice;
  const subscriptionDays =
    moment().endOf(`${billingCycle}`).diff(moment(), "days") + 1;

  const oldPlanDays = moment(today).diff(moment(customerStartDate), "days") + 1;
  const newPlanDays = subscriptionDays - oldPlanDays;

  const oldPlanAmount = (oldPlanDays / subscriptionDays) * oldPlan;
  const newPlanAmount = (newPlanDays / subscriptionDays) * newPlan;

  return oldPlanAmount + newPlanAmount;
};

export const getSubscriptionPlansNeedToBillToday = async () => {
  const today = new Date();

  // we will get Array of plans ,
  const subscribtionPlans = await getSubscriptionPlandByNextBillingDate(today);

  return subscribtionPlans;
};

export const getCustomerInvoices = async (customerId: string) => {
  return await getcustomerInvoices(customerId);
};

export const createInvoiceFromServerless = async () => {
  // Get All plans need to generate new bill today
  const plansNeedToBilling = await getSubscriptionPlansNeedToBillToday();

  // Get all customers who have these plans
  const customers = await getcustomersByMultiPlanId(plansNeedToBilling);
  if (!customers)
    throw new ResourceNotFoundError("No Customers With these Plans");

  let arrOfInvoices: CreateInvoiceType[] = [];

  // now let's create a new invoice for each customer

  customers.forEach(async (customer) => {
    try {
      // Make the POST request
      const response: AxiosResponse<AxiosResponse> =
        await axios.post<AxiosResponse>(process.env.SERVERLESS_URL!, customer);

      console.log("Response:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // If error is an AxiosError, you can get more details
        console.error("Axios Error:", error.message);
      } else {
        console.error("Error:", error);
      }
    }

    let newInvoiceCreated = await generateInvoiceService(customer);
    if (newInvoiceCreated) arrOfInvoices.push(newInvoiceCreated);
  });
  await updateNexBillDate(plansNeedToBilling);

  return arrOfInvoices;
};
