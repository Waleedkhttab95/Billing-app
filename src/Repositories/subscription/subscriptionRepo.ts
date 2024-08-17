import { CreateSubscriptionDto } from "../../Models/DTO/subscriptionDto/createSubscriptionDto";
import { UpdateSubscriptionDto } from "../../Models/DTO/subscriptionDto/updateSubscriptionDto";
import { BillingCycle, SubscriptionPlan, SubscriptionPlanStatus } from "../../Models/SubscriptionPlan";
import { v4 as uuidv4 } from 'uuid';
import { addDays } from "../../utilities/commonFunctions";


export type CreateSubscriptionType = {
    id: string
    name: string;
    status: SubscriptionPlanStatus;
    price: number;
    cycleName: BillingCycle; 
    durationByDays: number ; 
    nextBilling: Date
}


export type ResponseSubscriptionType = {
    id: string
    name: string;
    status: SubscriptionPlanStatus;
    price: number;
    cycleName: string; 
    durationByDays: number ; 
}



let subscriptionPlans: SubscriptionPlan[] = []; 


export const create = async (createSubscription: CreateSubscriptionDto) =>{

    const newId = uuidv4();  

    const subscriptionPlan:CreateSubscriptionType = {
        id: newId , 
        name: createSubscription.name,
        status: createSubscription.status,
        price: createSubscription.price,
        cycleName: createSubscription.cycleName,
        durationByDays: createSubscription.durationByDays,
        nextBilling: addDays(createSubscription.durationByDays)
    }

    subscriptionPlans.push(subscriptionPlan);

    return subscriptionPlan;

}

export const getAll = async () =>{
    return subscriptionPlans;
}

export const getSubscriptionPlanById = async (id : string) =>{

  
    const plan = subscriptionPlans.find(plan => plan.id === id);

    if(plan)
    return plan;

    return null
}

export const inactiveSubscription = async (id: string) =>{
    const plan = subscriptionPlans.find(plan => plan.id === id);

    if(plan){
        plan.status = SubscriptionPlanStatus.INACTIVE
        return plan;
    }
    

    return null
}

export const updateSubscription = async (id: string , updateSubscriptionDto: UpdateSubscriptionDto) =>{
    const plan = subscriptionPlans.find(plan => plan.id === id);

    if(plan){

        plan.name = updateSubscriptionDto.name , 
        plan.price = updateSubscriptionDto.price,
        plan.durationByDays = updateSubscriptionDto.durationByDays , 
        plan.cycleName = updateSubscriptionDto.cycleName

        return plan;
    }
    

    return null
}

export const getSubscriptionPlandByNextBillingDate = async (today: Date) =>{
    const filterdPlans = subscriptionPlans.filter(plan => plan.nextBilling === today);

    return filterdPlans.map(subscriptionPlan => subscriptionPlan.id)
}


export const getSubscriptionsByMultiId = async (ids: string[]) =>{

    // Ensure ids is an array and contains valid IDs
    if (!Array.isArray(ids) || ids.length === 0) {
        return null;
      }

    const plans = subscriptionPlans.filter(plan =>
       ids.includes(plan.id)
  );

  return plans.length > 0 ? plans : null;
}