import { BusinessDate } from './business-date';
import {convertDateTimeToBusinessDate} from './convert-date-time-to-business-date';
import {DateTime} from 'luxon';

describe('convertDateTimeToBusinessDate', () => {
    it('should format a date time like a business date', () => {
        expect(convertDateTimeToBusinessDate(DateTime.fromObject({year: 2020, month: 4, day: 12}))).toBe('2020-04-12');
    });
});
