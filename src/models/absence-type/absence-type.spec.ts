import { AbsenceType } from './absence-type';
import { mockAbsenceType } from './absence-type.mock';

describe('AbsenceType', () => {
    it('should create an instance', () => {
        expect(mockAbsenceType()).toBeInstanceOf(AbsenceType);
    });
});
