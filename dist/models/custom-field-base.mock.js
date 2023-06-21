"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCustomFieldBase = exports.mockCustomFieldBaseResponse = void 0;
const custom_field_base_1 = require("./custom-field-base");
const custom_field_pivot_mock_1 = require("./custom-field-pivot.mock");
function mockCustomFieldBaseResponse(data = {}, pivot = {}) {
    return Object.assign({ created_at: '', deleted_at: null, from: null, id: 0, key: '', model: 'employee', name: '', pivot: (0, custom_field_pivot_mock_1.mockCustomFieldPivotResponse)(pivot), to: null, type: 'string', updated_at: '', value: null }, data);
}
exports.mockCustomFieldBaseResponse = mockCustomFieldBaseResponse;
function mockCustomFieldBase(data, pivot) {
    return new custom_field_base_1.CustomFieldBase(mockCustomFieldBaseResponse(data, pivot));
}
exports.mockCustomFieldBase = mockCustomFieldBase;
