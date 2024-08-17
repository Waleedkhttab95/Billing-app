"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var paymentController_1 = require("../Controllers/paymentController");
function default_1(app) {
    /**
   * @swagger
   * /payment/create:
   *   post:
   *     summary: Make Payment proccess
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               invoiceId:
   *                 type: string
   *                 example: 1
   *               customerId:
   *                 type: string
   *                 example: 1
   *               amount:
   *                 type: number
   *                 example: 250
   *               paymentMethod:
   *                 type: string
   *                 example: CREDIT_CARD
   *     responses:
   *       200:
   *         description: Payment successfully
   *       400:
   *         description: Invalid input
   */
    app.post("/payment/create", paymentController_1.createPaymentController);
}
