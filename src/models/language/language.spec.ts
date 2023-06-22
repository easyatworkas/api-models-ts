import {mockLanguage} from './language.mock';

describe('Language', () => {
    it('should create an instance', () => {
        expect(mockLanguage()).toBeTruthy();
    });

    describe(`getName()`, function () {
        it(`should return a string`, function () {
            expect(mockLanguage()['getName']()).toEqual(expect.any(String));
        });
    });
});
