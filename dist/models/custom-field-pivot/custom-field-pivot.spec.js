"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_field_pivot_mock_1 = require("./custom-field-pivot.mock");
describe('CustomFieldPivot', () => {
    it('should create an instance', () => {
        expect((0, custom_field_pivot_mock_1.mockCustomFieldPivot)()).toBeTruthy();
    });
    it(`should create an instance with created_at and deleted_at`, function () {
        expect((0, custom_field_pivot_mock_1.mockCustomFieldPivot)({
            created_at: '2020-02-02 22:22:22',
            updated_at: '2020-02-02 22:22:22',
        })).toBeTruthy();
    });
    it(`should create an instance without created_at and deleted_at`, function () {
        expect((0, custom_field_pivot_mock_1.mockCustomFieldPivot)({
            created_at: null,
            updated_at: null,
        })).toBeTruthy();
    });
    it(`should stringify the metadata`, function () {
        const customFieldPivot = (0, custom_field_pivot_mock_1.mockCustomFieldPivot)({
            metadata: {
                test: 'test',
            },
        });
        expect(customFieldPivot.stringifiedMetadata).toBe('{"test":"test"}');
    });
});
