
export enum SubscriptionStatus {
    ACTIVE = 'active',
    CANCELLED = 'cancelled'
  }

export interface Customers {
    id: string;
    name: string;
    email: string;
    subscriptionPlanId: string | null;
    subscriptionStatus: SubscriptionStatus;
    startSubscriptionDate: Date | null
    endSubscriptionDate: Date | null
}