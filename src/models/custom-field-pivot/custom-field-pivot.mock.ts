import { CustomFieldPivot, CustomFieldPivotResponse } from './custom-field-pivot';

export function mockCustomFieldPivotResponse(data: Partial<CustomFieldPivotResponse> = {}) {
    return {
        custom_field_id: 3,
        default: null,
        has_interval: true,
        id: 2,
        metadata: null,
        model: 'absence',
        object_id: 2,
        object_type: 'absence',
        required: false,
        validator: null,
        created_at: '1970-01-01 00:00:00',
        updated_at: '1970-01-01 00:00:00',
        ...data,
    } satisfies CustomFieldPivotResponse;
}

export function mockCustomFieldPivot(data: Partial<CustomFieldPivotResponse> = {}) {
    return new CustomFieldPivot(mockCustomFieldPivotResponse(data));
}
