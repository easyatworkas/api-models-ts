"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCustomField = exports.mockCustomFieldResponse = void 0;
const custom_field_1 = require("./custom-field");
const custom_field_pivot_mock_1 = require("./custom-field-pivot.mock");
function mockCustomFieldResponse(data = {}, pivot = {}) {
    return Object.assign({ created_at: '', deleted_at: null, from: null, id: 0, key: '', model: 'employee', name: '', pivot: (0, custom_field_pivot_mock_1.mockCustomFieldPivotResponse)(pivot), to: null, type: 'string', updated_at: '', value: null }, data);
}
exports.mockCustomFieldResponse = mockCustomFieldResponse;
function mockCustomField(data = {}, pivot = {}) {
    return new custom_field_1.CustomField(mockCustomFieldResponse(data, pivot));
}
exports.mockCustomField = mockCustomField;
