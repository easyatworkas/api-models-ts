"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomFieldPivot = void 0;
const string_to_date_time_1 = require("../../utils/string-to-date-time");
class CustomFieldPivot {
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
        this.createdAt = data.created_at ? (0, string_to_date_time_1.stringToDateTime)(data.created_at) : null;
        this.updatedAt = data.updated_at ? (0, string_to_date_time_1.stringToDateTime)(data.updated_at) : null;
        this.stringifiedMetadata = data.metadata ? JSON.stringify(data.metadata) : '';
    }
}
exports.CustomFieldPivot = CustomFieldPivot;
