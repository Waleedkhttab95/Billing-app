import { IsNumber, IsString } from "class-validator";

export class CreatePaymentDto {

    @IsString()
    invoiceId: string;
    @IsString()
    customerId: string;
    @IsNumber()
    amount: number;
    @IsString()
    paymentMethod: string;
   

}