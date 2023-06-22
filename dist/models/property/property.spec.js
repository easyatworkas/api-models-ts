"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const property_1 = require("./property");
const property_mock_1 = require("./property.mock");
const luxon_1 = require("luxon");
describe(`Property`, function () {
    it(`should create an instance`, function () {
        expect((0, property_mock_1.mockProperty)()).toBeInstanceOf(property_1.Property);
    });
    it(`should convert from and to to DateTimes`, function () {
        const property = (0, property_mock_1.mockProperty)({
            from: '2021-01-01 00:00:00',
            to: '2021-01-01 00:00:00',
        });
        expect(property.from).toBeInstanceOf(luxon_1.DateTime);
        expect(property.to).toBeInstanceOf(luxon_1.DateTime);
    });
});
