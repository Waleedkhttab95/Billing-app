import { plainToInstance } from "class-transformer";
import { CreateSubscriptionDto } from "../Models/DTO/subscriptionDto/createSubscriptionDto";
import { validate } from "class-validator";
import {
  createSubscriptionPlanService,
  inactiveSubscriptionService,
  updateSubscriptionService,
} from "../Services/subscriptionService";
import { Request, Response } from "express";
import { UpdateSubscriptionDto } from "../Models/DTO/subscriptionDto/updateSubscriptionDto";

export const createSubscriptionPlanController = async (
  req: Request,
  res: Response
) => {

    try{
  //convert request body to Dto

  const createSubscriptionPlanDto = plainToInstance(
    CreateSubscriptionDto,
    req.body
  );

  // Validate the DTO
  const errors = await validate(createSubscriptionPlanDto);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const subscriptionPlan = await createSubscriptionPlanService(
    createSubscriptionPlanDto
  );

  return res.status(201).send(subscriptionPlan);
    } catch(err){
        return res.status(400).send(err);
    }

};

export const updateSubscriptionPlanController = async (
  req: Request,
  res: Response
) => {
  //convert request body to Dto

  const updateSubscriptionPlanDto = plainToInstance(
    UpdateSubscriptionDto,
    req.body
  );

  // Validate the DTO
  const errors = await validate(updateSubscriptionPlanDto);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try{
    const subscriptionPlan = await updateSubscriptionService(
        updateSubscriptionPlanDto,
        req.params.planId
      );
    
      return res.status(200).send(subscriptionPlan);
  }catch(err){
      return res.status(400).send(err)
  }
 
};

export const inactiveSubscriptionPlanController = async (
  req: Request,
  res: Response
) => {
  try {
    const subscriptionPlan = await inactiveSubscriptionService(
      req.params.planId
    );
    return res.status(201).send(subscriptionPlan);
  } catch (err) {
    return res.status(400).send(err);
  }
};
