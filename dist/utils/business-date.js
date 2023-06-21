"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessDate = void 0;
const luxon_1 = require("luxon");
const string_to_date_time_1 = require("./string-to-date-time");
const convert_date_time_to_business_date_1 = require("./convert-date-time-to-business-date");
class BusinessDate {
    constructor(value) {
        this.original = value;
        this.dateTime = value instanceof luxon_1.DateTime ? value : (0, string_to_date_time_1.stringToDateTime)(value, true);
    }
    toString() {
        return (0, convert_date_time_to_business_date_1.convertDateTimeToBusinessDate)(this.dateTime);
    }
}
exports.BusinessDate = BusinessDate;
