"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
var subscriptionPlanController_1 = require("../Controllers/subscriptionPlanController");
function default_1(app) {
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
    app.post("/subscription/create", subscriptionPlanController_1.createSubscriptionPlanController);
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
    app.put("/subscription/update", subscriptionPlanController_1.updateSubscriptionPlanController);
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
    app.put("/subscription/inactive/:planId", subscriptionPlanController_1.inactiveSubscriptionPlanController);
}
