import { DateTime } from 'luxon';
import { stringToDateTime } from './string-to-date-time';
import {convertDateTimeToBusinessDate} from './convert-date-time-to-business-date';
import {BusinessDateString} from '../types/business-date-string';

export class BusinessDate {
    readonly original: BusinessDateString | DateTime;
    dateTime: DateTime;

    constructor(value: DateTime | BusinessDateString) {
        this.original = value;
        this.dateTime = value instanceof DateTime ? value : stringToDateTime(value, true);
    }

    toString() {
        return convertDateTimeToBusinessDate(this.dateTime);
    }
}
