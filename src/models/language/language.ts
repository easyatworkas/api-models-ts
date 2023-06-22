import { DateTime } from 'luxon';
import {stringToDateTime} from '../../utils/string-to-date-time';
import {ApiResponse} from '../../interfaces/api-response';

export interface LanguageResponse extends ApiResponse {
    code: string;
    ietf_bcp47_tag: string;
    iso639_1: string;
    name: string;
    // This only comes from the language controller api
    users_count?: number;
    created_at: string;
    updated_at: string;
}

export class Language {
    code: string;
    ietfBcp47Tag: string;
    languageTag: string;
    iso639_1: string;
    name: string | undefined;
    usersCount?: number;
    createdAt: DateTime;
    updatedAt: DateTime;

    constructor(data: LanguageResponse) {
        this.languageTag = data?.ietf_bcp47_tag;
        this.name = data?.name || this.getName();
        this.code = data?.code;
        this.ietfBcp47Tag = data.ietf_bcp47_tag;
        this.iso639_1 = data.iso639_1;
        this.usersCount = data.users_count;
        this.createdAt = stringToDateTime(data.created_at);
        this.updatedAt = stringToDateTime(data.updated_at);
    }

    private getName() {
        try {
            return new Intl.DisplayNames([ this.languageTag ], { type: 'language' }).of(this.languageTag);
        } catch (e) {
            return undefined;
        }
    }
}
