import { CustomFieldPivot, CustomFieldPivotResponse } from './custom-field-pivot';
export declare function mockCustomFieldPivotResponse(data?: Partial<CustomFieldPivotResponse>): {
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
export declare function mockCustomFieldPivot(data?: Partial<CustomFieldPivotResponse>): CustomFieldPivot;
//# sourceMappingURL=custom-field-pivot.mock.d.ts.map