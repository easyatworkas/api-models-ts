import {mockCustomFieldBase} from './custom-field-base.mock';

describe('CustomFieldBase', () => {
    it('should create an instance', () => {
        expect(mockCustomFieldBase()).toBeTruthy();
    });

    it('should create an instance with deleted_at', () => {
        expect(mockCustomFieldBase({deleted_at: '2020-02-02 22:22:22'})).toBeTruthy();
    });
});
