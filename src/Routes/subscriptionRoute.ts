import { createSubscriptionPlanController, inactiveSubscriptionPlanController, updateSubscriptionPlanController } from "../Controllers/subscriptionPlanController";

  export default function(app:any) {

      /**
 * @swagger
 * /subscription/create:
 *   post:
 *     summary: Create a new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: plan1
 *               status:
 *                 type: string
 *                 example: active
 *               price:
 *                 type: number
 *                 example: 250
 *               cycleName:
 *                 type: string
 *                 example: month
 *               durationByDays:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Subscription plan created successfully
 *       400:
 *         description: Invalid input
 */
    app.post("/subscription/create", createSubscriptionPlanController);
  
          /**
 * @swagger
 * /subscription/update:
 *   put:
 *     summary: Create a new subscription
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: plan1
 *               price:
 *                 type: number
 *                 example: 250
 *               cycleName:
 *                 type: string
 *                 example: month
 *               durationByDays:
 *                 type: number
 *                 example: 30
 *     responses:
 *       200:
 *         description: Subscription plan updated successfully
 *       400:
 *         description: Invalid input
 */
    app.put("/subscription/update", updateSubscriptionPlanController);
  
/**
 * @swagger
 * /subscription/inactive/{planId}:
 *   put:
 *     summary: Inactive Subscription
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: subscription plan inactive successfully
 *       404:
 *         description: plan not found
 */
    app.put("/subscription/inactive/:planId", inactiveSubscriptionPlanController);
  }