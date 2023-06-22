"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockProperty = exports.mockPropertyResponse = void 0;
const property_1 = require("./property");
function mockPropertyResponse(data = {}) {
    return Object.assign({ id: 1, key: 'key', value: 'value', created_at: '2021-01-01 00:00:00', updated_at: '2021-01-01 00:00:00', from: null, to: null }, data);
}
exports.mockPropertyResponse = mockPropertyResponse;
function mockProperty(data = {}) {
    return new property_1.Property(mockPropertyResponse(data));
}
exports.mockProperty = mockProperty;
