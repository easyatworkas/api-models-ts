"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_api_model_1 = require("./base-api-model");
describe('BaseApiModel', () => {
    it('should create an instance', () => {
        expect(new base_api_model_1.BaseApiModel({}, undefined)).toBeTruthy();
    });
});
