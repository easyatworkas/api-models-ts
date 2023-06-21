import { CustomFieldPivot } from './custom-field-pivot';
export function mockCustomFieldPivotResponse(data = {}) {
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
        ...data
    };
}
export function mockCustomFieldPivot(data = {}) {
    return new CustomFieldPivot(mockCustomFieldPivotResponse(data));
}
//# sourceMappingURL=custom-field-pivot.mock.js.map