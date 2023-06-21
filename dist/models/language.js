"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Language = void 0;
const string_to_date_time_1 = require("../utils/string-to-date-time");
class Language {
    constructor(data) {
        this.languageTag = data === null || data === void 0 ? void 0 : data.ietf_bcp47_tag;
        this.name = (data === null || data === void 0 ? void 0 : data.name) || this.getName();
        this.code = data === null || data === void 0 ? void 0 : data.code;
        this.ietfBcp47Tag = data.ietf_bcp47_tag;
        this.iso639_1 = data.iso639_1;
        this.usersCount = data.users_count;
        this.createdAt = (0, string_to_date_time_1.stringToDateTime)(data.created_at);
        this.updatedAt = (0, string_to_date_time_1.stringToDateTime)(data.updated_at);
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
exports.Language = Language;
