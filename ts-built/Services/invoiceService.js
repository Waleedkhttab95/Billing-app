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
exports.getCustomerInvoices = exports.getSubscriptionPlansNeedToBillToday = exports.createUpdatedSubscriptionInvoice = exports.generateInvoiceService = exports.createInvoiceService = void 0;
var ResourceNotFoundError_1 = require("../Errors/ResourceNotFoundError");
var Invoice_1 = require("../Models/Invoice");
var customerRepo_1 = require("../Repositories/customer/customerRepo");
var invoiceRepo_1 = require("../Repositories/invoice/invoiceRepo");
var subscriptionRepo_1 = require("../Repositories/subscription/subscriptionRepo");
var sendEmailFunction_1 = require("../utilities/email/sendEmailFunction");
var subscriptionService_1 = require("./subscriptionService");
var moment = require("moment");
var createInvoiceService = function () { return __awaiter(void 0, void 0, void 0, function () {
    var plansNeedToBilling, customers, arrOfInvoices;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.getSubscriptionPlansNeedToBillToday)()];
            case 1:
                plansNeedToBilling = _a.sent();
                return [4 /*yield*/, (0, customerRepo_1.getcustomersByMultiPlanId)(plansNeedToBilling)];
            case 2:
                customers = _a.sent();
                if (!customers)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError('No Customers With these Plans');
                arrOfInvoices = [];
                // now let's create a new invoice for each customer
                customers.forEach(function (customer) { return __awaiter(void 0, void 0, void 0, function () {
                    var newInvoiceCreated;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, exports.generateInvoiceService)(customer)];
                            case 1:
                                newInvoiceCreated = _a.sent();
                                if (newInvoiceCreated)
                                    arrOfInvoices.push(newInvoiceCreated);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // Finally we need to update nextBilling for each plan
                return [4 /*yield*/, (0, subscriptionService_1.updateNexBillDate)(plansNeedToBilling)];
            case 3:
                // Finally we need to update nextBilling for each plan
                _a.sent();
                return [2 /*return*/, arrOfInvoices];
        }
    });
}); };
exports.createInvoiceService = createInvoiceService;
var generateInvoiceService = function (customer) { return __awaiter(void 0, void 0, void 0, function () {
    var subscriptionPlan, today, customerStartSubscriptionDate, customerEndSubscriptionDate, startBilling, endBilling, amount, isProrated, billingDays, minDate, maxDate, subscriptionDays, invoiceDto, newInvoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionPlanById)(customer.subscriptionPlanId)];
            case 1:
                subscriptionPlan = _a.sent();
                if (!(customer.subscriptionPlanId && subscriptionPlan)) return [3 /*break*/, 4];
                today = moment();
                customerStartSubscriptionDate = moment(customer.startSubscriptionDate);
                customerEndSubscriptionDate = moment(customer.startSubscriptionDate);
                startBilling = moment().startOf("".concat(subscriptionPlan === null || subscriptionPlan === void 0 ? void 0 : subscriptionPlan.cycleName));
                endBilling = moment().endOf("".concat(subscriptionPlan === null || subscriptionPlan === void 0 ? void 0 : subscriptionPlan.cycleName));
                amount = 0;
                isProrated = false;
                // Handle if it's prorated or not
                if (customerStartSubscriptionDate.isAfter(endBilling) ||
                    customerEndSubscriptionDate.isBefore(startBilling)) {
                    // If subscription period is outside the billing cycle
                    amount = 0;
                }
                else {
                    billingDays = endBilling.diff(startBilling, "days") + 1;
                    minDate = endBilling < customerEndSubscriptionDate
                        ? endBilling
                        : customerEndSubscriptionDate;
                    maxDate = customerStartSubscriptionDate > startBilling
                        ? customerStartSubscriptionDate
                        : startBilling;
                    subscriptionDays = minDate.diff(maxDate, "days") + 1;
                    if (subscriptionDays < billingDays) {
                        isProrated = true;
                        amount = (subscriptionDays / billingDays) * subscriptionPlan.price;
                    }
                    else {
                        amount = subscriptionPlan.price;
                    }
                }
                invoiceDto = {
                    customerId: customer.id,
                    amount: amount,
                    status: Invoice_1.InvoiceStatus.GENERATED,
                    createdAt: today,
                    prorated: isProrated,
                    billingStartFrom: startBilling,
                    billingEndTo: endBilling,
                };
                return [4 /*yield*/, (0, invoiceRepo_1.createInvoice)(invoiceDto)];
            case 2:
                newInvoice = _a.sent();
                // send email
                return [4 /*yield*/, (0, sendEmailFunction_1.sendEmail)({
                        name: customer.name,
                        email: customer.email,
                        date: today,
                        id: newInvoice.id,
                        subject: "New Invoice Generated",
                        template: "newInvoiceTemplate",
                    })];
            case 3:
                // send email
                _a.sent();
                return [2 /*return*/, newInvoice];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.generateInvoiceService = generateInvoiceService;
var createUpdatedSubscriptionInvoice = function (customerStartDate, oldPlanPrice, newPlanPrice, today, billingCycle) {
    var oldPlan = oldPlanPrice;
    var newPlan = newPlanPrice;
    var subscriptionDays = moment().endOf("".concat(billingCycle)).diff(moment(), "days") + 1;
    var oldPlanDays = moment(today).diff(moment(customerStartDate), "days") + 1;
    var newPlanDays = subscriptionDays - oldPlanDays;
    var oldPlanAmount = (oldPlanDays / subscriptionDays) * oldPlan;
    var newPlanAmount = (newPlanDays / subscriptionDays) * newPlan;
    return oldPlanAmount + newPlanAmount;
};
exports.createUpdatedSubscriptionInvoice = createUpdatedSubscriptionInvoice;
var getSubscriptionPlansNeedToBillToday = function () { return __awaiter(void 0, void 0, void 0, function () {
    var today, subscribtionPlans;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                today = new Date();
                return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionPlandByNextBillingDate)(today)];
            case 1:
                subscribtionPlans = _a.sent();
                return [2 /*return*/, subscribtionPlans];
        }
    });
}); };
exports.getSubscriptionPlansNeedToBillToday = getSubscriptionPlansNeedToBillToday;
var getCustomerInvoices = function (customerId) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, invoiceRepo_1.getcustomerInvoices)(customerId)];
            case 1: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.getCustomerInvoices = getCustomerInvoices;
