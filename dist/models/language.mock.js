import { Language } from './language';
export function mockLanguageResponse(data = {}) {
    return {
        code: 'en',
        ietf_bcp47_tag: 'en-US',
        iso639_1: 'en',
        name: 'English',
        users_count: 0,
        created_at: '1970-01-01 00:00:00',
        updated_at: '1970-01-01 00:00:00',
        ...data
    };
}
export function mockLanguage(data = {}) {
    return new Language(mockLanguageResponse(data));
}
//# sourceMappingURL=language.mock.js.map