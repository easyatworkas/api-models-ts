import { DateTime } from 'luxon';
import { ApiResponse } from '../interfaces/api-response';
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
export declare class CustomFieldBase {
    id: number;
    key: string;
    name: string;
    type: CustomFieldType;
    translationKey: string;
    readonly translationNs = "custom_fields";
    createdAt: DateTime;
    updatedAt: DateTime;
    deletedAt: DateTime | null;
    constructor(data: CustomFieldBaseResponse);
}
//# sourceMappingURL=custom-field-base.d.ts.map