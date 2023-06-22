"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockAbsenceType = exports.mockAbsenceTypeResponse = void 0;
const absence_type_1 = require("./absence-type");
function mockAbsenceTypeResponse(data = {}) {
    return Object.assign({ gradable: false, id: 1, name: 'test', paid: false, setting_group_id: 0, span: 'hour' }, data);
}
exports.mockAbsenceTypeResponse = mockAbsenceTypeResponse;
function mockAbsenceType(data = {}) {
    return new absence_type_1.AbsenceType(mockAbsenceTypeResponse(data));
}
exports.mockAbsenceType = mockAbsenceType;
