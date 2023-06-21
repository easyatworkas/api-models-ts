"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockLanguage = exports.mockLanguageResponse = void 0;
const language_1 = require("./language");
function mockLanguageResponse(data = {}) {
    return Object.assign({ code: 'en', ietf_bcp47_tag: 'en-US', iso639_1: 'en', name: 'English', users_count: 0, created_at: '1970-01-01 00:00:00', updated_at: '1970-01-01 00:00:00' }, data);
}
exports.mockLanguageResponse = mockLanguageResponse;
function mockLanguage(data = {}) {
    return new language_1.Language(mockLanguageResponse(data));
}
exports.mockLanguage = mockLanguage;
