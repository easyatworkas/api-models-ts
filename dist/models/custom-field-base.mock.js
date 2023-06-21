import { CustomFieldBase } from './custom-field-base';
import { mockCustomFieldPivotResponse } from './custom-field-pivot.mock';
export function mockCustomFieldBaseResponse(data = {}, pivot = {}) {
    return {
        created_at: '',
        deleted_at: null,
        from: null,
        id: 0,
        key: '',
        model: 'employee',
        name: '',
        pivot: mockCustomFieldPivotResponse(pivot),
        to: null,
        type: 'string',
        updated_at: '',
        value: null,
        ...data,
    };
}
export function mockCustomFieldBase(data, pivot) {
    return new CustomFieldBase(mockCustomFieldBaseResponse(data, pivot));
}
//# sourceMappingURL=custom-field-base.mock.js.map