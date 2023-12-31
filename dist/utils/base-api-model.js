"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseApiModel = void 0;
const custom_field_1 = require("../models/custom-field/custom-field");
/**
 * The purpose of this is to extend API models with simple functionality that don't interfere with the model or response in any big way.
 */
class BaseApiModel {
    constructor(data, customFieldModel) {
        this.customFields = [];
        // Set the response as it is
        this._response = Object.freeze(data);
        // Set the model
        this.customFieldModel = customFieldModel;
        // Get all properties starting with "cf_" and create an instance of CustomField for each as long as the value is not nil
        this.customFields = Object.entries(data).reduce((acc, [key, value]) => {
            if (!key.startsWith('cf_')) {
                return acc;
            }
            if (value == null) {
                return acc;
            }
            return [...acc, new custom_field_1.CustomField(value)];
        }, []);
    }
    clone() {
        // @ts-ignore
        return new (this.constructor)(this._response);
    }
    getCustomFieldValue(key) {
        const customField = this.customFields.find((cf) => cf.key === key);
        return !customField ? null : customField.value;
    }
}
exports.BaseApiModel = BaseApiModel;
