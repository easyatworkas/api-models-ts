import {Property, PropertyResponse} from './property';

export function mockPropertyResponse(data: Partial<PropertyResponse> = {}) {
    return {
        id: 1,
        key: 'key',
        value: 'value',
        created_at: '2021-01-01 00:00:00',
        updated_at: '2021-01-01 00:00:00',
        from: null,
        to: null,
        ...data,
    } satisfies PropertyResponse;
}

export function mockProperty(data: Partial<PropertyResponse> = {}) {
    return new Property(mockPropertyResponse(data));
}
