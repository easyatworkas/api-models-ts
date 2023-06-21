import { CustomField } from './custom-field';
import { mockCustomFieldPivotResponse } from './custom-field-pivot.mock';
export function mockCustomFieldResponse(data = {}, pivot = {}) {
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
        ...data
    };
}
export function mockCustomField(data = {}, pivot = {}) {
    return new CustomField(mockCustomFieldResponse(data, pivot));
}
//# sourceMappingURL=custom-field.mock.js.map