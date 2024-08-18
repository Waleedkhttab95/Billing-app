import { CreateInvoicesAndProcessController, getCustomerInvoicesController } from "../Controllers/InvoiceController";
import { createInvoiceService } from "../Services/invoiceService";

  export default function(app:any) {

  /**
 * @swagger
 * /invoice/generating:
 *   post:
 *     summary: Make invoice process
 *     responses:
 *       200:
 *         description: created invoice successfully
 *       400:
 *         description: Invalid 
 */
    app.post("/invoice/generating", CreateInvoicesAndProcessController);

    /**
 * @swagger
 * /invoice/get/customer/{customerId}:
 *   get:
 *     summary: Get a customer Invoices by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 *         content:
 *           application/json:
 *       404:
 *         description: Customer not found
 */ 
    app.get("/invoice/get/customer/:customerId", getCustomerInvoicesController)
  }