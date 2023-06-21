"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDateTimeToBusinessDate = void 0;
function convertDateTimeToBusinessDate(date) {
    if (!date.isValid) {
        throw Error('Invalid DateTime');
    }
    return date.toFormat('yyyy-MM-dd');
}
exports.convertDateTimeToBusinessDate = convertDateTimeToBusinessDate;
