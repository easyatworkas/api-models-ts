"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const custom_field_pivot_mock_1 = require("./custom-field-pivot.mock");
describe('CustomFieldPivot', () => {
    it('should create an instance', () => {
        expect((0, custom_field_pivot_mock_1.mockCustomFieldPivot)()).toBeTruthy();
    });
});
