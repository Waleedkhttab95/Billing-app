import { IsEnum, IsNumber, IsString } from "class-validator";
import { BillingCycle, SubscriptionPlanStatus } from "../../SubscriptionPlan";


export class CreateSubscriptionDto {

    @IsString()
    name: string;
    @IsEnum(SubscriptionPlanStatus)
    status: SubscriptionPlanStatus;
    @IsNumber()
    price: number;
    @IsEnum(BillingCycle)
    cycleName: BillingCycle; 
    @IsNumber()
    durationByDays: number ; 
}