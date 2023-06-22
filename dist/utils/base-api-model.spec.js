"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_api_model_1 = require("./base-api-model");
const custom_field_mock_1 = require("../models/custom-field/custom-field.mock");
describe('BaseApiModel', () => {
    it('should create an instance', () => {
        expect(new base_api_model_1.BaseApiModel({}, undefined)).toBeTruthy();
    });
    it(`should add all properties starting with "cf_" as custom fields`, function () {
        expect(new base_api_model_1.BaseApiModel({
            cf_test: (0, custom_field_mock_1.mockCustomFieldResponse)(),
            cf_test_2: (0, custom_field_mock_1.mockCustomFieldResponse)(),
        }, undefined).customFields.length).toBe(2);
    });
    describe(`clone()`, function () {
        it(`should return a new instance of the same class`, function () {
            const model = new base_api_model_1.BaseApiModel({}, undefined);
            expect(model.clone()).not.toBe(model);
        });
    });
    describe(`getCustomFieldValue()`, function () {
        it(`should return null if the custom field is not found`, function () {
            expect(new base_api_model_1.BaseApiModel({}, undefined).getCustomFieldValue('test')).toBeNull();
        });
        it(`should return the custom field value when the custom field is found`, function () {
            const key = 'cf_test';
            const value = 'yahoo';
            expect(new base_api_model_1.BaseApiModel({ [key]: (0, custom_field_mock_1.mockCustomFieldResponse)({ value, key }) }, undefined).getCustomFieldValue(key)).toBe(value);
        });
    });
});
