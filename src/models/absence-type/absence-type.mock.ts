import { AbsenceType, AbsenceTypeResponse } from './absence-type';

export function mockAbsenceTypeResponse(data: Partial<AbsenceTypeResponse> = {}): AbsenceTypeResponse {
    return {
        gradable: false,
        id: 1,
        name: 'test',
        paid: false,
        setting_group_id: 0,
        span: 'hour',
        ...data,
    };
}

export function mockAbsenceType(data: Partial<AbsenceTypeResponse> = {}) {
    return new AbsenceType(mockAbsenceTypeResponse(data));
}
