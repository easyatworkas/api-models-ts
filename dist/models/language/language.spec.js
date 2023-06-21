"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_mock_1 = require("./language.mock");
describe('Language', () => {
    it('should create an instance', () => {
        expect((0, language_mock_1.mockLanguage)()).toBeTruthy();
    });
});
