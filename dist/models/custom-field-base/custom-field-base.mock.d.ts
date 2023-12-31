import { CustomFieldBase, CustomFieldBaseResponse } from './custom-field-base';
import { CustomFieldPivotResponse } from '../custom-field-pivot/custom-field-pivot';
export declare function mockCustomFieldBaseResponse(data?: Partial<CustomFieldBaseResponse>, pivot?: Partial<CustomFieldPivotResponse>): {
    id: number;
    key: string;
    name: string;
    type: import("./custom-field-base").CustomFieldType;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    from: null;
    model: string;
    pivot: {
        custom_field_id: number;
        default: string | null;
        has_interval: boolean;
        id: number;
        metadata: Record<string, any> | null;
        model: import("../custom-field/custom-field").CustomFieldModel;
        object_id: number;
        object_type: string;
        required: boolean;
        validator: string | null;
        created_at: string | null;
        updated_at: string | null;
    };
    to: null;
    value: null;
};
export declare function mockCustomFieldBase(data?: Partial<CustomFieldBaseResponse>, pivot?: Partial<CustomFieldPivotResponse>): CustomFieldBase;
//# sourceMappingURL=custom-field-base.mock.d.ts.map