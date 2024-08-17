import { plainToInstance } from "class-transformer";
import {
  addSubscriptionToCustomerService,
  createCustomerService,
  deleteCustomerService,
  getCustomersServcie,
  removeSubscriptionToCustomerService,
} from "../Services/customerService";
import { CreateCustomerDto } from "../Models/DTO/customerDto/createCustomerDto";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { getcustomerById } from "../Repositories/customer/customerRepo";
import { AddSubscriptionToCustomerDto } from "../Models/DTO/customerDto/addSubscriptionToCustomer";

export const createCustomer = async (req: Request, res: Response) => {
  //convert request body to Dto

  const createCustoemrDto = plainToInstance(CreateCustomerDto, req.body);

  // Validate the DTO
  const errors = await validate(createCustoemrDto);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const createdCustomer = await createCustomerService(createCustoemrDto);

  return res.status(201).send(createdCustomer);
};

export const deleteCustomer = async (req: Request, res: Response) => {
  const customers = await deleteCustomerService(req.params.id);

  return res.status(201).send(customers);
};

export const getCustoemrs = async (req: Request, res: Response) => {
  const customers = await getCustomersServcie();

  return res.status(200).send(customers);
};

export const getCustoemrById = async (req: Request, res: Response) => {
  const customer = await getcustomerById(req.params.id);

  return res.status(200).send(customer);
};

export const addSubscriptionToCustomer = async (
  req: Request,
  res: Response
) => {
  //convert request body to Dto

  const addSubscriptionToCustomerDto = plainToInstance(
    AddSubscriptionToCustomerDto,
    req.body
  );

  // Validate the DTO
  const errors = await validate(addSubscriptionToCustomerDto);
  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  const customer = await addSubscriptionToCustomerService(
    addSubscriptionToCustomerDto.id,
    addSubscriptionToCustomerDto.subscriptionPlanId
  );

  return res.status(200).send(customer);
};

export const removeSubscriptionToCustomer = async (
  req: Request,
  res: Response
) => {
  const customer = await removeSubscriptionToCustomerService(req.params.id);

  return res.status(200).send(customer);
};
