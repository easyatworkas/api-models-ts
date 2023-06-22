import {mockCustomFieldPivot} from './custom-field-pivot.mock';

describe('CustomFieldPivot', () => {
    it('should create an instance', () => {
        expect(mockCustomFieldPivot()).toBeTruthy();
    });

    it(`should create an instance with created_at and deleted_at`, function () {
        expect(mockCustomFieldPivot({
            created_at: '2020-02-02 22:22:22',
            updated_at: '2020-02-02 22:22:22',
        })).toBeTruthy();
    });

    it(`should create an instance without created_at and deleted_at`, function () {
        expect(mockCustomFieldPivot({
            created_at: null,
            updated_at: null,
        })).toBeTruthy();
    });

    it(`should stringify the metadata`, function () {
        const customFieldPivot = mockCustomFieldPivot({
            metadata: {
                test: 'test',
            },
        });

        expect(customFieldPivot.stringifiedMetadata).toBe('{"test":"test"}');
    });
});
