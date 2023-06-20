import { DateTime } from 'luxon';
import {CustomFieldModel} from './custom-field';
import {stringToDateTime} from '../utils/string-to-date-time';
import {ApiResponse} from '../interfaces/api-response';

export interface CustomFieldPivotResponse extends ApiResponse {
    custom_field_id: number;
    // The default value
    default: string | null;
    has_interval: boolean;
    id: number;
    metadata: Record<string, any> | null;
    model: CustomFieldModel;
    object_id: number;
    object_type: string;
    required: boolean;
    validator: string | null;
    // It can be null sometimes, maybe old data? Don't change :)
    created_at: string | null;
    // It can be null sometimes, maybe old data? Don't change :)
    updated_at: string | null;
}

export class CustomFieldPivot {
    customFieldId: number;
    default: string | null;
    hasInterval: boolean;
    id: number;
    metadata: Record<string, Record<string, string> | string> | null;
    readonly stringifiedMetadata: string;
    model: CustomFieldModel;
    objectId: number;
    objectType: string;
    required: boolean;
    validator: string | null;
    createdAt: DateTime | null;
    updatedAt: DateTime | null;

    constructor(data: CustomFieldPivotResponse) {
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
        } catch (e) {
            console.error(e);
            this.stringifiedMetadata = '';
        }
    }
}
