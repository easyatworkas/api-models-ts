"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const convert_date_time_to_business_date_1 = require("./convert-date-time-to-business-date");
const luxon_1 = require("luxon");
describe('convertDateTimeToBusinessDate', () => {
    it('should format a date time like a business date', () => {
        expect((0, convert_date_time_to_business_date_1.convertDateTimeToBusinessDate)(luxon_1.DateTime.fromObject({ year: 2020, month: 4, day: 12 }))).toBe('2020-04-12');
    });
    it('should throw an error if the date time is invalid', () => {
        expect(() => (0, convert_date_time_to_business_date_1.convertDateTimeToBusinessDate)(luxon_1.DateTime.invalid('invalid'))).toThrowError('Invalid DateTime');
    });
});
