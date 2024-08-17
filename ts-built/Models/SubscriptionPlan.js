"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingCycle = exports.SubscriptionPlanStatus = void 0;
var SubscriptionPlanStatus;
(function (SubscriptionPlanStatus) {
    SubscriptionPlanStatus["ACTIVE"] = "active";
    SubscriptionPlanStatus["INACTIVE"] = "inactive";
})(SubscriptionPlanStatus || (exports.SubscriptionPlanStatus = SubscriptionPlanStatus = {}));
var BillingCycle;
(function (BillingCycle) {
    BillingCycle["MONTHLY"] = "month";
    BillingCycle["WEEKLY"] = "week";
    BillingCycle["YEARLY"] = "year";
    BillingCycle["DAYLY"] = " day";
    BillingCycle["QUARTRLY"] = "quarter";
})(BillingCycle || (exports.BillingCycle = BillingCycle = {}));
