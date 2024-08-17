import { ResourceNotFoundError } from "../Errors/ResourceNotFoundError";
import { CreateSubscriptionDto } from "../Models/DTO/subscriptionDto/createSubscriptionDto";
import { UpdateSubscriptionDto } from "../Models/DTO/subscriptionDto/updateSubscriptionDto";
import { getcustomersByPlanId } from "../Repositories/customer/customerRepo";
import {
  create,
  getSubscriptionPlanById,
  getSubscriptionsByMultiId,
  inactiveSubscription,
  updateSubscription,
} from "../Repositories/subscription/subscriptionRepo";
import { addDays, addDaysByDate } from "../utilities/commonFunctions";

export const createSubscriptionPlanService = async (
  createSubscriptionPlan: CreateSubscriptionDto
) => {
  const plans = await create(createSubscriptionPlan);

  return plans;
};

export const updateSubscriptionService = async (
  updateSubscriptionDto: UpdateSubscriptionDto,
  id: string
) => {
  // Update the DataBase Array
  const oldPlan = await getSubscriptionPlanById(id);

  if (!oldPlan) throw new ResourceNotFoundError("Subscription plan not found");

  const plan = await updateSubscription(id, updateSubscriptionDto);

  /**
   * Check if Plan Days updated or not also need to check if this plan change to deactive .
   *  If updated days should find all customers with this plan and add more days and update .
   *
   */
  //

  if (oldPlan.durationByDays < updateSubscriptionDto.durationByDays) {
    const newDays =
      updateSubscriptionDto.durationByDays - oldPlan.durationByDays;

    const customers = await getcustomersByPlanId(oldPlan.id);

    customers?.forEach(
      (customer) =>
        (customer.endSubscriptionDate = addDaysByDate(
          newDays,
          customer.endSubscriptionDate!
        ))
    );
  }

  return plan;
};

export const inactiveSubscriptionService = async (id: string) => {
  /**
   * We need check if there's any customer have and active with this plan ,
   * if there's any customer , we can't inactive this plan
   */

  const customersWithActivePlan = await getcustomersByPlanId(id);

  if (customersWithActivePlan && customersWithActivePlan.length > 1) {
    throw new Error(
      "There's custoemrs subscribed with this plan , you can't inactive it"
    );
  } else {
    const plan = await inactiveSubscription(id);
    return plan;
  }
};

export const updateNexBillDate = async (ids: string[]) =>{
  const plans = await getSubscriptionsByMultiId(ids);
  if(!plans) throw new ResourceNotFoundError('subscription plans') ;

  plans.forEach(plan =>{
    plan.nextBilling = addDays(plan.durationByDays)
  })
}