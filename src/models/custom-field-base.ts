import { DateTime } from 'luxon';
import {stringToDateTime} from '../utils/string-to-date-time';
import {ApiResponse} from '../interfaces/api-response';

export type CustomFieldType = 'string' | 'integer' | 'decimal' | 'date' | 'boolean' | 'select';

export interface CustomFieldBaseResponse extends ApiResponse {
    id: number;
    key: string;
    name: string;
    type: CustomFieldType;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

/**
 * Custom field as we get it from the API without it being attached to a model
 */
export class CustomFieldBase {
    id: number;
    key: string;
    name: string;
    // This is the same as name, but just makes it easier to understand and use
    translationKey: string;
    type: CustomFieldType;
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime | null;

    constructor(data: CustomFieldBaseResponse) {
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
