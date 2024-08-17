
export enum InvoiceStatus {
    GENERATED = 'generated',
    PAID = 'paid' , 
    FAILED = 'failed'
  }

export interface Invoice {
    id: string;
    customerId: string;
    amount: number;
    paymentDate?: Date;
    status: InvoiceStatus;
    createdAt: Date ;
    prorated: boolean
    billingStartFrom : Date ;
    billingEndTo: Date;
}
