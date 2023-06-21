export function convertDateTimeToBusinessDate(date) {
    if (!date.isValid) {
        throw Error('Invalid DateTime');
    }
    return date.toFormat('yyyy-MM-dd');
}
//# sourceMappingURL=convert-date-time-to-business-date.js.map