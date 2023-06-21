import { DateTime } from 'luxon';
import { stringToDateTime } from './string-to-date-time';
import { convertDateTimeToBusinessDate } from './convert-date-time-to-business-date';
export class BusinessDate {
    constructor(value) {
        this.original = value;
        this.dateTime = value instanceof DateTime ? value : stringToDateTime(value, true);
    }
    toString() {
        return convertDateTimeToBusinessDate(this.dateTime);
    }
}
//# sourceMappingURL=business-date.js.map