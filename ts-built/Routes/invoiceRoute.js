"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var InvoiceController_1 = require("../Controllers/InvoiceController");
function default_1(app) {
    /**
   * @swagger
   * /invoice/generating:
   *   post:
   *     summary: Make invoice proccess
   *     responses:
   *       200:
   *         description: created invoice successfully
   *       400:
   *         description: Invalid
   */
    app.post("/invoice/generating", InvoiceController_1.CreateInvoicesAndProccessController);
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
    app.get("/invoice/get/customer/:customerId", InvoiceController_1.getCustomerInvoicesController);
}
