"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_field_base_mock_1 = require("./custom-field-base.mock");
describe('CustomFieldBase', () => {
    it('should create an instance', () => {
        expect((0, custom_field_base_mock_1.mockCustomFieldBase)()).toBeTruthy();
    });
    it('should create an instance with deleted_at', () => {
        expect((0, custom_field_base_mock_1.mockCustomFieldBase)({ deleted_at: '2020-02-02 22:22:22' })).toBeTruthy();
    });
});
