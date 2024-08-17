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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentProccess = exports.createPaymentService = void 0;
var delay_1 = __importDefault(require("delay"));
var customerRepo_1 = require("../Repositories/customer/customerRepo");
var invoiceRepo_1 = require("../Repositories/invoice/invoiceRepo");
var paymentRepo_1 = require("../Repositories/payment/paymentRepo");
var sendEmailFunction_1 = require("../utilities/email/sendEmailFunction");
var ResourceNotFoundError_1 = require("../Errors/ResourceNotFoundError");
var Invoice_1 = require("../Models/Invoice");
var createPaymentService = function (createPaymentDto) { return __awaiter(void 0, void 0, void 0, function () {
    var customer, invoice, newPayment, paymentResult, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, customerRepo_1.getcustomerById)(createPaymentDto.customerId)];
            case 1:
                customer = _a.sent();
                return [4 /*yield*/, (0, invoiceRepo_1.getInvoiceById)(createPaymentDto.invoiceId)];
            case 2:
                invoice = _a.sent();
                if (!customer || !invoice)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError("Customer or invocie not found !");
                if (customer.id != invoice.customerId)
                    throw new ResourceNotFoundError_1.ResourceNotFoundError("customer and the invoice doesnot matching !");
                return [4 /*yield*/, (0, paymentRepo_1.createPayment)({
                        invoiceId: invoice.id,
                        customerId: customer.id,
                        amount: invoice.amount,
                        paymentMethod: createPaymentDto.paymentMethod,
                    })];
            case 3:
                newPayment = _a.sent();
                _a.label = 4;
            case 4:
                _a.trys.push([4, 7, , 9]);
                return [4 /*yield*/, (0, exports.paymentProccess)(newPayment)];
            case 5:
                paymentResult = _a.sent();
                // Update invoice status
                invoice.status = Invoice_1.InvoiceStatus.PAID;
                invoice.paymentDate = new Date();
                // send email
                return [4 /*yield*/, (0, sendEmailFunction_1.sendEmail)({
                        name: customer.name,
                        email: customer.email,
                        date: new Date().toDateString(),
                        id: newPayment.id,
                        subject: "Payment success",
                        template: "successPaymentTemplate",
                    })];
            case 6:
                // send email
                _a.sent();
                return [3 /*break*/, 9];
            case 7:
                err_1 = _a.sent();
                // send email
                return [4 /*yield*/, (0, sendEmailFunction_1.sendEmail)({
                        name: customer.name,
                        email: customer.email,
                        date: new Date().toDateString(),
                        id: newPayment.id,
                        subject: "Payment faild",
                        template: "faildPaymentTemplate",
                    })];
            case 8:
                // send email
                _a.sent();
                throw new Error("Payment failed on all attempts ! ");
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.createPaymentService = createPaymentService;
var paymentProccess = function (payment) { return __awaiter(void 0, void 0, void 0, function () {
    var attemptsCount, paymentStatusResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                attemptsCount = 0;
                _a.label = 1;
            case 1:
                if (!(attemptsCount < 3)) return [3 /*break*/, 5];
                paymentStatusResult = void 0;
                if (!(paymentStatusResult === "successfuly")) return [3 /*break*/, 2];
                (payment.status = "PAID"), (payment.isPaid = true);
                attemptsCount = 3; // to make sure we will exit from while
                return [2 /*return*/, payment];
            case 2:
                attemptsCount++;
                return [4 /*yield*/, (0, delay_1.default)(2000)];
            case 3:
                _a.sent(); // we can change the delay time
                _a.label = 4;
            case 4: return [3 /*break*/, 1];
            case 5: throw new Error("Payment Faild !");
        }
    });
}); };
exports.paymentProccess = paymentProccess;
