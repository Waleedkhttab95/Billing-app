import { IsString, IsEmail, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { SubscriptionStatus } from '../../Customer';



export class CreateCustomerDto {

    @IsString()
    name: string;
    @IsEmail()
    email:string
    @IsString()
    subscriptionPlanId: string;
    @IsEnum(SubscriptionStatus)
    subscriptionStatus: SubscriptionStatus;
}