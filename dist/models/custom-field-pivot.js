import { stringToDateTime } from '../utils/string-to-date-time';
export class CustomFieldPivot {
    constructor(data) {
        this.id = data.id;
        this.customFieldId = data.custom_field_id;
        this.default = data.default;
        this.hasInterval = data.has_interval;
        this.metadata = data.metadata;
        this.model = data.model;
        this.objectId = data.object_id;
        this.objectType = data.object_type;
        this.required = data.required;
        this.validator = data.validator;
        this.createdAt = data.created_at ? stringToDateTime(data.created_at) : null;
        this.updatedAt = data.updated_at ? stringToDateTime(data.updated_at) : null;
        try {
            this.stringifiedMetadata = data.metadata ? JSON.stringify(data.metadata) : '';
        }
        catch (e) {
            console.error(e);
            this.stringifiedMetadata = '';
        }
    }
}
//# sourceMappingURL=custom-field-pivot.js.map