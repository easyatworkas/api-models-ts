"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_field_base_mock_1 = require("./custom-field-base.mock");
describe('CustomFieldBase', () => {
    it('should create an instance', () => {
        expect((0, custom_field_base_mock_1.mockCustomFieldBase)()).toBeTruthy();
    });
});
