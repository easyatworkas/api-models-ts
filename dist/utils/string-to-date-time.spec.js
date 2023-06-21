"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const string_to_date_time_1 = require("./string-to-date-time");
const luxon_1 = require("luxon");
describe('stringToDateTime()', function () {
    it(`should return a DateTime when the string is not a business date string`, function () {
        expect((0, string_to_date_time_1.stringToDateTime)('2020-02-20 20:20:20')).toBeInstanceOf(luxon_1.DateTime);
    });
    it(`should return a DateTime when the string is a business date string`, function () {
        expect((0, string_to_date_time_1.stringToDateTime)('2020-02-20', true)).toBeInstanceOf(luxon_1.DateTime);
    });
});
