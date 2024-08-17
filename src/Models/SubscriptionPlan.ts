
export enum SubscriptionPlanStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive'
}

export enum BillingCycle {
    MONTHLY = 'month' ,
    WEEKLY = 'week' , 
    YEARLY = 'year' ,
    DAYLY = ' day' ,
    QUARTRLY = 'quarter'
}

export interface SubscriptionPlan {
    id: string;
    name: string;
    status: SubscriptionPlanStatus;
    price: number;
    cycleName: BillingCycle; // e.g Weekly , Monthly , Yearly , Daily ...
    durationByDays: number ; 
    nextBilling: Date
}
