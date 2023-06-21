"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockCustomFieldPivot = exports.mockCustomFieldPivotResponse = void 0;
const custom_field_pivot_1 = require("./custom-field-pivot");
function mockCustomFieldPivotResponse(data = {}) {
    return Object.assign({ custom_field_id: 3, default: null, has_interval: true, id: 2, metadata: null, model: 'absence', object_id: 2, object_type: 'absence', required: false, validator: null, created_at: '1970-01-01 00:00:00', updated_at: '1970-01-01 00:00:00' }, data);
}
exports.mockCustomFieldPivotResponse = mockCustomFieldPivotResponse;
function mockCustomFieldPivot(data = {}) {
    return new custom_field_pivot_1.CustomFieldPivot(mockCustomFieldPivotResponse(data));
}
exports.mockCustomFieldPivot = mockCustomFieldPivot;
