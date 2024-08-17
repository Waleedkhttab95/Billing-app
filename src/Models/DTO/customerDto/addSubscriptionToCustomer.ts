import { IsString } from "class-validator";


export class AddSubscriptionToCustomerDto {
    @IsString()
    id: string;
    @IsString()
    subscriptionPlanId: string;

}