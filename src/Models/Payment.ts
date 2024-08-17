export interface Payment {
    id: string;
    invoiceId: string;
    customerId: string;
    amount: number;
    paymentMethod: string;
    status: string ;
    isPaid: boolean ;
}
