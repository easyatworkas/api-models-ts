import { stringToDateTime } from '../utils/string-to-date-time';
/**
 * Custom field as we get it from the API without it being attached to a model
 */
export class CustomFieldBase {
    constructor(data) {
        // This is the place where we store the translations for custom fields
        this.translationNs = 'custom_fields';
        this.id = data.id;
        this.key = data.key;
        this.name = data.name;
        this.translationKey = data.name;
        this.type = data.type;
        this.createdAt = stringToDateTime(data.created_at);
        this.updatedAt = stringToDateTime(data.updated_at);
        this.deletedAt = data.deleted_at ? stringToDateTime(data.deleted_at) : null;
    }
}
//# sourceMappingURL=custom-field-base.js.map