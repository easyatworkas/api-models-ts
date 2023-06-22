"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_mock_1 = require("./language.mock");
describe('Language', () => {
    it('should create an instance', () => {
        expect((0, language_mock_1.mockLanguage)()).toBeTruthy();
    });
    describe(`getName()`, function () {
        it(`should return a string`, function () {
            expect((0, language_mock_1.mockLanguage)()['getName']()).toEqual(expect.any(String));
        });
    });
});
