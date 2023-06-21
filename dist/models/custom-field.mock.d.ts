import { CustomField, CustomFieldResponse } from './custom-field';
import { CustomFieldPivotResponse } from './custom-field-pivot';
export declare function mockCustomFieldResponse(data?: Partial<CustomFieldResponse>, pivot?: Partial<CustomFieldPivotResponse>): {
    from: string | null;
    pivot: {
        custom_field_id: number;
        default: string | null;
        has_interval: boolean;
        id: number;
        metadata: Record<string, any> | null;
        model: import("./custom-field").CustomFieldModel;
        object_id: number;
        object_type: string;
        required: boolean;
        validator: string | null;
        created_at: string | null;
        updated_at: string | null;
    };
    to: string | null;
    value: string | null;
    id: number;
    key: string;
    name: string;
    type: import("./custom-field-base").CustomFieldType;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    model: string;
};
export declare function mockCustomField(data?: Partial<CustomFieldResponse>, pivot?: Partial<CustomFieldPivotResponse>): CustomField;
//# sourceMappingURL=custom-field.mock.d.ts.map