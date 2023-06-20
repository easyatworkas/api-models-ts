import { BusinessDate } from './business-date';

describe('BusinessDate', () => {
    it('should create an instance', () => {
        expect(new BusinessDate('2022-02-02')).toBeTruthy();
    });

    describe(`toString()`, function() {
        it(`should return a properly formatted string`, function() {
            expect(new BusinessDate('2022-02-02').toString()).toBe('2022-02-02');
        });
    });
});
