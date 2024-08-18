import { ResourceNotFoundError } from "../Errors/ResourceNotFoundError";
import { CreateCustomerDto } from "../Models/DTO/customerDto/createCustomerDto";
import {
  addSubscriptionToCustomer,
  createCustomer,
  deleteCustomer,
  getAllCustomers,
  getcustomerById,
  removeSubscriptionFromCustomer,
} from "../Repositories/customer/customerRepo";
import { getSubscriptionPlanById } from "../Repositories/subscription/subscriptionRepo";
import { addDaysByDate } from "../utilities/commonFunctions";
import { createUpdatedSubscriptionInvoice } from "./invoiceService";

export const createCustomerService = async (
  createCustomerBody: CreateCustomerDto
) => {
  // Add Customer To Memory array
  const newCustomer = await createCustomer(createCustomerBody);

  return newCustomer;
};

export const deleteCustomerService = async (id: string) => {
  try {
    const customers = await deleteCustomer(id);
    return customers;
  } catch (err) {
    throw new ResourceNotFoundError("Customer Not Found !");
  }
};

export const getCustomersServcie = async () => {
  const customers = await getAllCustomers();

  return customers;
};

export const getCustomerByIdServcie = async (id: string) => {
  try {
    const customer = await getcustomerById(id);

    return customer;
  } catch (err) {
    throw new ResourceNotFoundError("Customer Not Found !");
  }
};

export const addSubscriptionToCustomerService = async (
  id: string,
  subscriptionPlanId: string
) => {
  const subscription = await getSubscriptionPlanById(subscriptionPlanId);
    if(!subscription) throw new ResourceNotFoundError('Subscription not Found');
    const customer = await addSubscriptionToCustomer(id, subscription);
    if (!customer) throw new ResourceNotFoundError('customer not Found');;

    return customer
  

 
};

export const removeSubscriptionToCustomerService = async (id: string) => {
  const customer = await removeSubscriptionFromCustomer(id);
  if (!customer) throw new ResourceNotFoundError('customer not Found');;

  return customer;
};

export const updateCustomerSubscriptionPlan = async (
  customerId: string,
  newPlanId: string
) => {
  const customer = await getcustomerById(customerId);
  const newCustomerPlan = await getSubscriptionPlanById(newPlanId);
  if (!customer || !customer.subscriptionPlanId || !newCustomerPlan)
    throw new ResourceNotFoundError("Customer Not Found");

  const customerPlan = await getSubscriptionPlanById(
    customer.subscriptionPlanId
  );
  if (!customerPlan)
    throw new ResourceNotFoundError("subscription plan Not Found");
  const today = new Date();

  // Create new invoice for update plan process
  const newInvoice = await createUpdatedSubscriptionInvoice(
    customer.startSubscriptionDate!,
    customerPlan?.price,
    newCustomerPlan.price,
    today,
    newCustomerPlan.cycleName
  );

  // update customer entity
  customer.subscriptionPlanId = newPlanId;
  customer.endSubscriptionDate = addDaysByDate(
    newCustomerPlan.durationByDays,
    customer.endSubscriptionDate!
  );

  return {
    customer,
    newInvoice,
  };
};
