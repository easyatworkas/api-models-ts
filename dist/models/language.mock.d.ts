import { Language, LanguageResponse } from './language';
export declare function mockLanguageResponse(data?: Partial<LanguageResponse>): {
    code: string;
    ietf_bcp47_tag: string;
    iso639_1: string;
    name: string;
    users_count: number;
    created_at: string;
    updated_at: string;
};
export declare function mockLanguage(data?: Partial<LanguageResponse>): Language;
//# sourceMappingURL=language.mock.d.ts.map