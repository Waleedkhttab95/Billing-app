import { IsBoolean, IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { InvoiceStatus } from "../../Invoice";

export class CreateInvoiceDto {

    @IsString()
    customerId: string;
    @IsNumber()
    amount: number;
    @IsEnum(InvoiceStatus)
    status: InvoiceStatus;
    @IsDateString()
    createdAt: Date ;
    @IsBoolean()
    prorated: boolean
    @IsDateString()
    billingStartFrom : Date ;
    @IsDateString()
    billingEndTo: Date;

}