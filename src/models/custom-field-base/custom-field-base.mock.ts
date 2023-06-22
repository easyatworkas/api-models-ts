import { CustomFieldBase, CustomFieldBaseResponse } from './custom-field-base';
import { CustomFieldPivotResponse } from '../custom-field-pivot/custom-field-pivot';
import { mockCustomFieldPivotResponse } from '../custom-field-pivot/custom-field-pivot.mock';

export function mockCustomFieldBaseResponse(data: Partial<CustomFieldBaseResponse> = {}, pivot: Partial<CustomFieldPivotResponse> = {}) {
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
    } satisfies CustomFieldBaseResponse;
}

export function mockCustomFieldBase(data?: Partial<CustomFieldBaseResponse>, pivot?: Partial<CustomFieldPivotResponse>) {
    return new CustomFieldBase(mockCustomFieldBaseResponse(data, pivot));
}
