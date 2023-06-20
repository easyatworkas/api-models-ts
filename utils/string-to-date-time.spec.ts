import { stringToDateTime } from './string-to-date-time';
import { DateTime } from 'luxon';

describe('stringToDateTime()', function() {
    it(`should return a DateTime when the string is not a business date string`, function() {
        expect(stringToDateTime('2020-02-20 20:20:20')).toBeInstanceOf(DateTime);
    });

    it(`should return a DateTime when the string is a business date string`, function() {
        expect(stringToDateTime('2020-02-20', true)).toBeInstanceOf(DateTime);
    });
});
