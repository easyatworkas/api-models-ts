import {CustomField, CustomFieldResponse} from './custom-field';
import {CustomFieldPivotResponse} from '../custom-field-pivot';
import { mockCustomFieldPivotResponse} from '../custom-field-pivot.mock';

export function mockCustomFieldResponse(data: Partial<CustomFieldResponse> = {}, pivot: Partial<CustomFieldPivotResponse> = {}) {
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
    } satisfies CustomFieldResponse;
}

export function mockCustomField(data: Partial<CustomFieldResponse> = {}, pivot: Partial<CustomFieldPivotResponse> = {}) {
    return new CustomField(mockCustomFieldResponse(data, pivot));
}
