"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateInvoiceDto = void 0;
var class_validator_1 = require("class-validator");
var Invoice_1 = require("../../Invoice");
var CreateInvoiceDto = /** @class */ (function () {
    function CreateInvoiceDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        __metadata("design:type", String)
    ], CreateInvoiceDto.prototype, "customerId", void 0);
    __decorate([
        (0, class_validator_1.IsNumber)(),
        __metadata("design:type", Number)
    ], CreateInvoiceDto.prototype, "amount", void 0);
    __decorate([
        (0, class_validator_1.IsEnum)(Invoice_1.InvoiceStatus),
        __metadata("design:type", String)
    ], CreateInvoiceDto.prototype, "status", void 0);
    __decorate([
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], CreateInvoiceDto.prototype, "createdAt", void 0);
    __decorate([
        (0, class_validator_1.IsBoolean)(),
        __metadata("design:type", Boolean)
    ], CreateInvoiceDto.prototype, "prorated", void 0);
    __decorate([
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], CreateInvoiceDto.prototype, "billingStartFrom", void 0);
    __decorate([
        (0, class_validator_1.IsDateString)(),
        __metadata("design:type", Date)
    ], CreateInvoiceDto.prototype, "billingEndTo", void 0);
    return CreateInvoiceDto;
}());
exports.CreateInvoiceDto = CreateInvoiceDto;
