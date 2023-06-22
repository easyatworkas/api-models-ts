import { Property } from './property';
import { mockProperty } from './property.mock';
import { DateTime } from 'luxon';

describe(`Property`, function() {
    it(`should create an instance`, function() {
        expect(mockProperty()).toBeInstanceOf(Property);
    });

    it(`should convert from and to to DateTimes`, function() {
        const property = mockProperty({
            from: '2021-01-01 00:00:00',
            to: '2021-01-01 00:00:00',
        });

        expect(property.from).toBeInstanceOf(DateTime);
        expect(property.to).toBeInstanceOf(DateTime);
    });
});
