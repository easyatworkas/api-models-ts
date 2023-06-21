import { DateTime } from 'luxon';
import { CustomFieldModel } from './custom-field';
import { ApiResponse } from '../interfaces/api-response';
export interface CustomFieldPivotResponse extends ApiResponse {
    custom_field_id: number;
    default: string | null;
    has_interval: boolean;
    id: number;
    metadata: Record<string, any> | null;
    model: CustomFieldModel;
    object_id: number;
    object_type: string;
    required: boolean;
    validator: string | null;
    created_at: string | null;
    updated_at: string | null;
}
export declare class CustomFieldPivot {
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
    constructor(data: CustomFieldPivotResponse);
}
//# sourceMappingURL=custom-field-pivot.d.ts.map