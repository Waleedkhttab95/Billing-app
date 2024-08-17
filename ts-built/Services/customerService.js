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
exports.updateCustomerSubscriptionPlan = exports.removeSubscriptionToCustomerService = exports.addSubscriptionToCustomerService = exports.getCustomerByIdServcie = exports.getCustomersServcie = exports.deleteCustomerService = exports.createCustomerService = void 0;
var ResourceNotFoundError_1 = require("../Errors/ResourceNotFoundError");
var customerRepo_1 = require("../Repositories/customer/customerRepo");
var subscriptionRepo_1 = require("../Repositories/subscription/subscriptionRepo");
var commonFunctions_1 = require("../utilities/commonFunctions");
var invoiceService_1 = require("./invoiceService");
var createCustomerService = function (createCustomerBody) { return __awaiter(void 0, void 0, void 0, function () {
    var newCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.createCustomer)(createCustomerBody)];
            case 1:
                newCustomer = _a.sent();
                return [2 /*return*/, newCustomer];
        }
    });
}); };
exports.createCustomerService = createCustomerService;
var deleteCustomerService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var customers, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, customerRepo_1.deleteCustomer)(id)];
            case 1:
                customers = _a.sent();
                return [2 /*return*/, customers];
            case 2:
                err_1 = _a.sent();
                throw new ResourceNotFoundError_1.ResourceNotFoundError("Customer Not Found !");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteCustomerService = deleteCustomerService;
var getCustomersServcie = function () { return __awaiter(void 0, void 0, void 0, function () {
    var customers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.getAllCustomers)()];
            case 1:
                customers = _a.sent();
                return [2 /*return*/, customers];
        }
    });
}); };
exports.getCustomersServcie = getCustomersServcie;
var getCustomerByIdServcie = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, customerRepo_1.getcustomerById)(id)];
            case 1:
                customer = _a.sent();
                return [2 /*return*/, customer];
            case 2:
                err_2 = _a.sent();
                throw new ResourceNotFoundError_1.ResourceNotFoundError("Customer Not Found !");
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getCustomerByIdServcie = getCustomerByIdServcie;
var addSubscriptionToCustomerService = function (id, subscriptionPlanId) { return __awaiter(void 0, void 0, void 0, function () {
    var subscription, customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionPlanById)(subscriptionPlanId)];
            case 1:
                subscription = _a.sent();
                if (!subscription)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError('Subscription not Found');
                return [4 /*yield*/, (0, customerRepo_1.addSubscriptionToCustomer)(id, subscription)];
            case 2:
                customer = _a.sent();
                if (!customer)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError('customer not Found');
                ;
                return [2 /*return*/, customer];
        }
    });
}); };
exports.addSubscriptionToCustomerService = addSubscriptionToCustomerService;
var removeSubscriptionToCustomerService = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.removeSubscriptionFromCustomer)(id)];
            case 1:
                customer = _a.sent();
                if (!customer)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError('customer not Found');
                ;
                return [2 /*return*/, customer];
        }
    });
}); };
exports.removeSubscriptionToCustomerService = removeSubscriptionToCustomerService;
var updateCustomerSubscriptionPlan = function (customerId, newPlanId) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, newCustomerPlan, customerPlan, today, newInvoice;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.getcustomerById)(customerId)];
            case 1:
                customer = _a.sent();
                return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionPlanById)(newPlanId)];
            case 2:
                newCustomerPlan = _a.sent();
                if (!customer || !customer.subscriptionPlanId || !newCustomerPlan)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError("Customer Not Found");
                return [4 /*yield*/, (0, subscriptionRepo_1.getSubscriptionPlanById)(customer.subscriptionPlanId)];
            case 3:
                customerPlan = _a.sent();
                if (!customerPlan)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError("subscription plan Not Found");
                today = new Date();
                return [4 /*yield*/, (0, invoiceService_1.createUpdatedSubscriptionInvoice)(customer.startSubscriptionDate, customerPlan === null || customerPlan === void 0 ? void 0 : customerPlan.price, newCustomerPlan.price, today, newCustomerPlan.cycleName)];
            case 4:
                newInvoice = _a.sent();
                // update customer entity
                customer.subscriptionPlanId = newPlanId;
                customer.endSubscriptionDate = (0, commonFunctions_1.addDaysByDate)(newCustomerPlan.durationByDays, customer.endSubscriptionDate);
                return [2 /*return*/, {
                        customer: customer,
                        newInvoice: newInvoice,
                    }];
        }
    });
}); };
exports.updateCustomerSubscriptionPlan = updateCustomerSubscriptionPlan;
