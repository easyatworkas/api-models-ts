"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToDateTime = void 0;
const luxon_1 = require("luxon");
function stringToDateTime(date, businessDate = false, format = 'yyyy-MM-dd HH:mm:ss') {
    // Use the business date format if it's a business date
    const parseFormat = businessDate ? 'yyyy-MM-dd' : format;
    // Slice the string if it's a business date so we only get the date part
    const slicedString = businessDate ? date.slice(0, 10) : date;
    // If it's a business date then just take the string and set it to the customer tz immediately because then the time won't change
    // If it's not a business date set it to UTC as it's what backend gives us and then update the tz to
    // the customer tz below so that the time is changed accordingly
    try {
        return luxon_1.DateTime.fromFormat(slicedString, parseFormat, {
            zone: businessDate ? luxon_1.Settings.defaultZone : 'UTC',
        }).setZone(luxon_1.Settings.defaultZone);
    }
    catch (e) {
        // Use a try catch cause many tests for http calls don't flush with correct data
        console.error('String to date time failed:', e);
        return luxon_1.DateTime.invalid('String to date time failed');
    }
}
exports.stringToDateTime = stringToDateTime;
