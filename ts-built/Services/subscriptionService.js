"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNexBillDate = exports.inactiveSubscriptionService = exports.updateSubscriptionService = exports.createSubscriptionPlanService = void 0;
var ResourceNotFoundError_1 = require("../Errors/ResourceNotFoundError");
var customerRepo_1 = require("../Repositories/customer/customerRepo");
var subscriptionRepo_1 = require("../Repositories/subscription/subscriptionRepo");
var commonFunctions_1 = require("../utilities/commonFunctions");
var createSubscriptionPlanService = function (createSubscriptionPlan) { return __awaiter(void 0, void 0, void 0, function () {
    var plans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, subscriptionRepo_1.create)(createSubscriptionPlan)];
            case 1:
                plans = _a.sent();
                return [2 /*return*/, plans];
        }
    });
}); };
exports.createSubscriptionPlanService = createSubscriptionPlanService;
var updateSubscriptionService = function (updateSubscriptionDto, id) { return __awaiter(void 0, void 0, void 0, function () {
    var oldPlan, plan, newDays_1, customers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionPlanById)(id)];
            case 1:
                oldPlan = _a.sent();
                if (!oldPlan)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError("Subscription plan not found");
                return [4 /*yield*/, (0, subscriptionRepo_1.updateSubscription)(id, updateSubscriptionDto)];
            case 2:
                plan = _a.sent();
                if (!(oldPlan.durationByDays < updateSubscriptionDto.durationByDays)) return [3 /*break*/, 4];
                newDays_1 = updateSubscriptionDto.durationByDays - oldPlan.durationByDays;
                return [4 /*yield*/, (0, customerRepo_1.getcustomersByPlanId)(oldPlan.id)];
            case 3:
                customers = _a.sent();
                customers === null || customers === void 0 ? void 0 : customers.forEach(function (customer) {
                    return (customer.endSubscriptionDate = (0, commonFunctions_1.addDaysByDate)(newDays_1, customer.endSubscriptionDate));
                });
                _a.label = 4;
            case 4: return [2 /*return*/, plan];
        }
    });
}); };
exports.updateSubscriptionService = updateSubscriptionService;
var inactiveSubscriptionService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var customersWithActivePlan, plan;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.getcustomersByPlanId)(id)];
            case 1:
                customersWithActivePlan = _a.sent();
                if (!(customersWithActivePlan && customersWithActivePlan.length > 1)) return [3 /*break*/, 2];
                throw new Error("There's custoemrs subscribed with this plan , you can't inactive it");
            case 2: return [4 /*yield*/, (0, subscriptionRepo_1.inactiveSubscription)(id)];
            case 3:
                plan = _a.sent();
                return [2 /*return*/, plan];
        }
    });
}); };
exports.inactiveSubscriptionService = inactiveSubscriptionService;
var updateNexBillDate = function (ids) { return __awaiter(void 0, void 0, void 0, function () {
    var plans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionsByMultiId)(ids)];
            case 1:
                plans = _a.sent();
                if (!plans)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError('subscription plans');
                plans.forEach(function (plan) {
                    plan.nextBilling = (0, commonFunctions_1.addDays)(plan.durationByDays);
                });
                return [2 /*return*/];
        }
    });
}); };
exports.updateNexBillDate = updateNexBillDate;
