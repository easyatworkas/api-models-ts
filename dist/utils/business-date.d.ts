import { DateTime } from 'luxon';
import { BusinessDateString } from '../types/business-date-string';
export declare class BusinessDate {
    readonly original: BusinessDateString | DateTime;
    dateTime: DateTime;
    constructor(value: DateTime | BusinessDateString);
    toString(): string;
}
