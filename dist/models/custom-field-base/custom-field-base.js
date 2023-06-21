"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldBase = void 0;
const string_to_date_time_1 = require("../../utils/string-to-date-time");
/**
 * Custom field as we get it from the API without it being attached to a model
 */
class CustomFieldBase {
    constructor(data) {
        // This is the place where we store the translations for custom fields
        this.translationNs = 'custom_fields';
        this.id = data.id;
        this.key = data.key;
        this.name = data.name;
        this.translationKey = data.name;
        this.type = data.type;
        this.createdAt = (0, string_to_date_time_1.stringToDateTime)(data.created_at);
        this.updatedAt = (0, string_to_date_time_1.stringToDateTime)(data.updated_at);
        this.deletedAt = data.deleted_at ? (0, string_to_date_time_1.stringToDateTime)(data.deleted_at) : null;
    }
}
exports.CustomFieldBase = CustomFieldBase;
