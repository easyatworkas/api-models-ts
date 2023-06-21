"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const business_date_1 = require("./business-date");
describe('BusinessDate', () => {
    it('should create an instance', () => {
        expect(new business_date_1.BusinessDate('2022-02-02')).toBeTruthy();
    });
    describe(`toString()`, function () {
        it(`should return a properly formatted string`, function () {
            expect(new business_date_1.BusinessDate('2022-02-02').toString()).toBe('2022-02-02');
        });
    });
});
