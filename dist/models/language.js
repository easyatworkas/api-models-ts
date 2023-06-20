import { stringToDateTime } from '../utils/string-to-date-time';
export class Language {
    constructor(data) {
        this.languageTag = data?.ietf_bcp47_tag;
        this.name = data?.name || this.getName();
        this.code = data?.code;
        this.ietfBcp47Tag = data.ietf_bcp47_tag;
        this.iso639_1 = data.iso639_1;
        this.usersCount = data.users_count;
        this.createdAt = stringToDateTime(data.created_at);
        this.updatedAt = stringToDateTime(data.updated_at);
    }
    getName() {
        try {
            return new Intl.DisplayNames([this.languageTag], { type: 'language' }).of(this.languageTag) || '';
        }
        catch (e) {
            return '';
        }
    }
}
//# sourceMappingURL=language.js.map