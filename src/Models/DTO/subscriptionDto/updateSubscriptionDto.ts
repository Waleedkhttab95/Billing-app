import { IsEnum, IsNumber, IsString } from "class-validator";
import { BillingCycle } from "../../SubscriptionPlan";


export class UpdateSubscriptionDto {

    @IsString()
    name: string;
    @IsNumber()
    price: number;
    @IsEnum(BillingCycle)
    cycleName: BillingCycle;
    @IsNumber() 
    durationByDays: number ; 
}