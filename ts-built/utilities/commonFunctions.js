"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDaysByDate = exports.addDays = void 0;
var addDays = function (days, date) {
    if (date === void 0) { date = new Date(); }
    date.setDate(date.getDate() + days);
    return date;
};
exports.addDays = addDays;
var addDaysByDate = function (days, date) {
    date.setDate(date.getDate() + days);
    return date;
};
exports.addDaysByDate = addDaysByDate;
