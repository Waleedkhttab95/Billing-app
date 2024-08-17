import { plainToInstance } from "class-transformer";
import { CreatePaymentDto } from "../Models/DTO/paymentDto/createPaymentDto";
import { validate } from "class-validator";
import { Request, Response } from "express";
import { createPaymentService } from "../Services/paymentService";

export const createPaymentController = async (req: Request, res: Response) => {
  try {
    //convert request body to Dto

    const createPaymentDto = plainToInstance(CreatePaymentDto, req.body);

    // Validate the DTO
    const errors = await validate(createPaymentDto);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const payment = await createPaymentService(createPaymentDto);

    return res.status(201).send(payment);
  } catch (err) {
    return res.status(400).send(err);
  }
};
