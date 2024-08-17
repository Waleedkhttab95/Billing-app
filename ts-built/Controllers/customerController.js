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
exports.removeSubscriptionToCustomer = exports.addSubscriptionToCustomer = exports.getCustoemrById = exports.getCustoemrs = exports.deleteCustomer = exports.createCustomer = void 0;
var class_transformer_1 = require("class-transformer");
var customerService_1 = require("../Services/customerService");
var createCustomerDto_1 = require("../Models/DTO/customerDto/createCustomerDto");
var class_validator_1 = require("class-validator");
var customerRepo_1 = require("../Repositories/customer/customerRepo");
var addSubscriptionToCustomer_1 = require("../Models/DTO/customerDto/addSubscriptionToCustomer");
var createCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var createCustoemrDto, errors, createdCustomer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                createCustoemrDto = (0, class_transformer_1.plainToInstance)(createCustomerDto_1.CreateCustomerDto, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(createCustoemrDto)];
            case 1:
                errors = _a.sent();
                if (errors.length > 0) {
                    return [2 /*return*/, res.status(400).json({ errors: errors })];
                }
                return [4 /*yield*/, (0, customerService_1.createCustomerService)(createCustoemrDto)];
            case 2:
                createdCustomer = _a.sent();
                return [2 /*return*/, res.status(201).send(createdCustomer)];
        }
    });
}); };
exports.createCustomer = createCustomer;
var deleteCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerService_1.deleteCustomerService)(req.params.id)];
            case 1:
                customers = _a.sent();
                return [2 /*return*/, res.status(201).send(customers)];
        }
    });
}); };
exports.deleteCustomer = deleteCustomer;
var getCustoemrs = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerService_1.getCustomersServcie)()];
            case 1:
                customers = _a.sent();
                return [2 /*return*/, res.status(200).send(customers)];
        }
    });
}); };
exports.getCustoemrs = getCustoemrs;
var getCustoemrById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.getcustomerById)(req.params.id)];
            case 1:
                customer = _a.sent();
                return [2 /*return*/, res.status(200).send(customer)];
        }
    });
}); };
exports.getCustoemrById = getCustoemrById;
var addSubscriptionToCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var addSubscriptionToCustomerDto, errors, customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                addSubscriptionToCustomerDto = (0, class_transformer_1.plainToInstance)(addSubscriptionToCustomer_1.AddSubscriptionToCustomerDto, req.body);
                return [4 /*yield*/, (0, class_validator_1.validate)(addSubscriptionToCustomerDto)];
            case 1:
                errors = _a.sent();
                if (errors.length > 0) {
                    return [2 /*return*/, res.status(400).json({ errors: errors })];
                }
                return [4 /*yield*/, (0, customerService_1.addSubscriptionToCustomerService)(addSubscriptionToCustomerDto.id, addSubscriptionToCustomerDto.subscriptionPlanId)];
            case 2:
                customer = _a.sent();
                return [2 /*return*/, res.status(200).send(customer)];
        }
    });
}); };
exports.addSubscriptionToCustomer = addSubscriptionToCustomer;
var removeSubscriptionToCustomer = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var customer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerService_1.removeSubscriptionToCustomerService)(req.params.id)];
            case 1:
                customer = _a.sent();
                return [2 /*return*/, res.status(200).send(customer)];
        }
    });
}); };
exports.removeSubscriptionToCustomer = removeSubscriptionToCustomer;
