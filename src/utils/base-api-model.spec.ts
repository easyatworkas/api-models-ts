import { BaseApiModel } from './base-api-model';
import { mockCustomFieldResponse } from '../models/custom-field/custom-field.mock';

describe('BaseApiModel', () => {
    it('should create an instance', () => {
        expect(new BaseApiModel({}, undefined)).toBeTruthy();
    });

    it(`should add all properties starting with "cf_" as custom fields`, function() {
        expect(new BaseApiModel({
            cf_test: mockCustomFieldResponse(),
            cf_test_2: mockCustomFieldResponse(),
        }, undefined).customFields.length).toBe(2);
    });

    describe(`clone()`, function () {
        it(`should return a new instance of the same class`, function() {
            const model = new BaseApiModel({}, undefined);
            expect(model.clone()).not.toBe(model);
        });
    });

    describe(`getCustomFieldValue()`, function() {
        it(`should return null if the custom field is not found`, function() {
            expect(new BaseApiModel({}, undefined).getCustomFieldValue('test')).toBeNull();
        });

        it(`should return the custom field value when the custom field is found`, function() {
            const key = 'cf_test';
            const value = 'yahoo';
            expect(new BaseApiModel({ [key]: mockCustomFieldResponse({ value, key }) }, undefined).getCustomFieldValue(key)).toBe(value);
        });
    });
});
