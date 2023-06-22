"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const absence_type_1 = require("./absence-type");
const absence_type_mock_1 = require("./absence-type.mock");
describe('AbsenceType', () => {
    it('should create an instance', () => {
        expect((0, absence_type_mock_1.mockAbsenceType)()).toBeInstanceOf(absence_type_1.AbsenceType);
    });
});
