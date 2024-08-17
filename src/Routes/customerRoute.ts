import {
  createCustomer,
  deleteCustomer,
  getCustoemrs,
  getCustoemrById,
  addSubscriptionToCustomer,
  removeSubscriptionToCustomer,
} from "../Controllers/customerController";


export default function(app:any) {
  /**
 * @swagger
 * /customer/create:
 *   post:
 *     summary: Create a new customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               subscriptionPlanId:
 *                 type: string
 *                 example: plan123
 *               subscriptionStatus:
 *                 type: string
 *                 enum:
 *                   - active
 *                   - cancelled
 *                 example: active
 *               remainingSubscriptionDays:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: "2024-08-17"
 *     responses:
 *       200:
 *         description: Customer created successfully
 *       400:
 *         description: Invalid input
 */
  app.post("/customer/create", createCustomer);


/**
 * @swagger
 * /customer/delete/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 */


  app.delete("/customer/delete/:id", deleteCustomer);

  /**
 * @swagger
 * /customer/get:
 *   get:
 *     summary: Get all customers
 *     responses:
 *       200:
 *         description: List of customers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   subscriptionPlanId:
 *                     type: string
 *                   subscriptionStatus:
 *                     type: string
 *                     enum:
 *                       - active
 *                       - cancelled
 *                   remainingSubscriptionDays:
 *                     type: string
 *                     format: date
 *                     nullable: true
 */
  app.get("/customer/get", getCustoemrs);

  /**
 * @swagger
 * /customer/getbyid/{id}:
 *   get:
 *     summary: Get a customer by ID
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
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 subscriptionPlanId:
 *                   type: string
 *                 subscriptionStatus:
 *                   type: string
 *                   enum:
 *                     - active
 *                     - cancelled
 *                 remainingSubscriptionDays:
 *                   type: string
 *                   format: date
 *                   nullable: true
 *       404:
 *         description: Customer not found
 */
  app.get("/customer/getbyid/:id", getCustoemrById);

  /**
 * @swagger
 * /customer/subscriptionadd:
 *   post:
 *     summary: Add a subscription to a customer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: customer123
 *               subscriptionPlanId:
 *                 type: string
 *                 example: plan456
 *     responses:
 *       200:
 *         description: Subscription added successfully
 *       400:
 *         description: Invalid input
 */
  app.post("/customer/subscriptionadd", addSubscriptionToCustomer);


  /**
 * @swagger
 * /customer/removeSubscriptionToCustomer/{id}:
 *   delete:
 *     summary: Remove a subscription from a customer
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Subscription removed successfully
 *       404:
 *         description: Customer or subscription not found
 */
  app.delete(
    "/customer/removeSubscriptionToCustomer/:id",
    removeSubscriptionToCustomer
  );
}