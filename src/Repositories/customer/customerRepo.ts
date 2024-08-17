import { Customers, SubscriptionStatus } from "../../Models/Customer";
import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerDto } from "../../Models/DTO/customerDto/createCustomerDto";
import { ResponseSubscriptionType } from "../subscription/subscriptionRepo";
import { addDays } from "../../utilities/commonFunctions";

export type CreateCustomerType = {
    id: string
    name: string;
    email:string;
    subscriptionPlanId: string;
    subscriptionStatus: SubscriptionStatus; 
    startSubscriptionDate: Date | null
    endSubscriptionDate: Date | null
}

let customers: Customers[] = []; 


export const createCustomer = async (createCustomer : CreateCustomerDto ) =>{

    const newId = uuidv4();  

    const customer:CreateCustomerType = {
        id: newId , 
        name: createCustomer.name,
        email: createCustomer.email ,
        subscriptionPlanId: createCustomer.subscriptionPlanId , 
        subscriptionStatus: createCustomer.subscriptionStatus , 
        startSubscriptionDate: null ,
        endSubscriptionDate: null
    }

    customers.push(customer);

    return customers;
}


export const deleteCustomer = async (id : string) =>{

  
    customers = customers.filter(customer => customer.id != id);

    return customers;
}


export const getAllCustomers = async () =>{

    return customers;
}

export const getcustomerById = async (id : string) =>{

  
    const customer = customers.find(customer => customer.id === id);

    if(customer)
    return customer;

    return null
}




export const getcustomersByPlanId = async (id : string) =>{

  
    const customersArr = customers.filter(customer => customer.subscriptionPlanId === id && customer.subscriptionStatus === 'active');

    if(customersArr)
    return customersArr;

    return null
}

export const getcustomersByMultiPlanId = async (ids: string[]) =>{

    // Ensure ids is an array and contains valid IDs
    if (!Array.isArray(ids) || ids.length === 0) {
        return null;
      }

    const customersArr = customers.filter(customer =>
        customer.subscriptionPlanId && ids.includes(customer.subscriptionPlanId) && customer.subscriptionStatus === 'active'
  );

  return customersArr.length > 0 ? customersArr : null;
}

export const addSubscriptionToCustomer = async (id : string 
    , subscriptionPlan: ResponseSubscriptionType  ) =>{

    
    const customer = customers.find(customer => customer.id === id);
    

    if(customer){
        customer.subscriptionPlanId = subscriptionPlan.id ;
        customer.subscriptionStatus = SubscriptionStatus.ACTIVE ;
        customer.startSubscriptionDate = new Date() ;
        customer.endSubscriptionDate = addDays(subscriptionPlan.durationByDays);
        return customer;
    }
    return null
  
}

export const removeSubscriptionFromCustomer = async (id : string ) =>{

  
    const customer = customers.find(customer => customer.id === id);

    if(customer){
    customer.subscriptionPlanId = null ;
    customer.subscriptionStatus = SubscriptionStatus.CANCELLED;
    }
    return null;
}


export const getCustomersWithEndDate = async(date : Date) =>{

    const filterdCustomers = customers.filter(customer => customer.subscriptionPlanId && customer.endSubscriptionDate === date);

    return filterdCustomers;
}