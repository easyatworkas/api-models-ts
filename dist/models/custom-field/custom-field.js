"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomField = void 0;
const luxon_1 = require("luxon");
const custom_field_pivot_1 = require("../custom-field-pivot");
const custom_field_base_1 = require("../custom-field-base");
const string_to_date_time_1 = require("../../utils/string-to-date-time");
const business_date_1 = require("../../utils/business-date");
/**
 * Custom field when it's attached to a model
 */
class CustomField extends custom_field_base_1.CustomFieldBase {
    // Is this field active atm?
    get active() {
        const now = luxon_1.DateTime.now();
        if (this.from) {
            const afterOrEqualFrom = this.from <= now;
            return this.to ? afterOrEqualFrom && this.to >= now : afterOrEqualFrom;
        }
        return true;
    }
    get isModified() {
        if (this._originalValue == null && this._value == null) {
            return false;
        }
        return this._originalValue !== this.toString();
    }
    get value() {
        return this._value;
    }
    set value(value) {
        switch (this.type) {
            case 'decimal':
            case 'integer': {
                this.setNumberValue(value);
                break;
            }
            case 'boolean': {
                this.setBooleanValue(value);
                break;
            }
            case 'date': {
                this.setDateValue(value);
                break;
            }
            default: {
                this._value = value;
            }
        }
    }
    constructor(data) {
        super(data);
        this._value = null;
        // Formatted and pretty select options
        this.selectOptions = [];
        // Can the user create a new value for this field?
        this.creatable = true;
        // Can the user edit the value for this field?
        this.editable = true;
        // Can the user delete the value for this field?
        this.deletable = true;
        this._response = data;
        this.translationKey = data.name;
        this.pivot = new custom_field_pivot_1.CustomFieldPivot(data.pivot);
        this.from = data.from ? (0, string_to_date_time_1.stringToDateTime)(data.from) : null;
        this.to = data.to ? (0, string_to_date_time_1.stringToDateTime)(data.to) : null;
        this.creatable = !data.value || (!!data.value && data.pivot.has_interval);
        this.editable = !!data.value;
        this.deletable = !this.pivot.required && data.value != null;
        // Assign value after all other properties have been set
        this.value = data.value;
        this._originalValue = data.value;
        // Other functions
        this.setSelectOptions();
    }
    // Returns the value as a string, or null if the value is null
    toString() {
        if (this._value == null) {
            return null;
        }
        if (this._value instanceof business_date_1.BusinessDate) {
            return this._value.toString();
        }
        if (typeof this._value === 'boolean') {
            return String(+this._value);
        }
        return this._value.toString();
    }
    // Returns the option that is currently selected when the field type is 'select'
    getSelectedOption() {
        if (this.type !== 'select') {
            return;
        }
        return this.selectOptions.find((option) => option.value === this.value);
    }
    clone(data = {}) {
        return new CustomField(Object.assign(Object.assign({}, this._response), data));
    }
    // Returns all select options as they are in the pivot's metadata
    getSelectOptions() {
        var _a;
        if (this.type !== 'select') {
            return {};
        }
        const options = (_a = this.pivot.metadata) === null || _a === void 0 ? void 0 : _a.options;
        if (typeof options === 'string') {
            return {};
        }
        return options || {};
    }
    setSelectOptions() {
        this.selectOptions = Object.entries(this.getSelectOptions()).map(([key, value]) => {
            return {
                value: key,
                textNs: this.translationNs,
                textKey: value,
            };
        });
    }
    setNumberValue(value) {
        if (value == null) {
            this._value = null;
        }
        if (typeof value === 'string') {
            this._value = Number(value);
        }
        if (typeof value === 'number') {
            this._value = value;
        }
    }
    setBooleanValue(value) {
        if (value == null) {
            this._value = null;
        }
        if (typeof value === 'string') {
            this._value = value === '1';
        }
        if (typeof value === 'boolean') {
            this._value = value;
        }
    }
    setDateValue(value) {
        if (typeof value === 'string' || value instanceof luxon_1.DateTime) {
            this._value = new business_date_1.BusinessDate(value);
        }
        else if (value instanceof business_date_1.BusinessDate) {
            this._value = value;
        }
        else {
            this._value = null;
        }
    }
}
exports.CustomField = CustomField;
