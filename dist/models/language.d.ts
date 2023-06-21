import { DateTime } from 'luxon';
import { ApiResponse } from '../interfaces/api-response';
export interface LanguageResponse extends ApiResponse {
    code: string;
    ietf_bcp47_tag: string;
    iso639_1: string;
    name: string;
    users_count?: number;
    created_at: string;
    updated_at: string;
}
export declare class Language {
    code: string;
    ietfBcp47Tag: string;
    languageTag: string;
    iso639_1: string;
    name: string;
    usersCount?: number;
    createdAt: DateTime;
    updatedAt: DateTime;
    constructor(data: LanguageResponse);
    private getName;
}
