define("interfaces/api-response", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/string-to-date-time", ["require", "exports", "luxon"], function (require, exports, luxon_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.stringToDateTime = void 0;
    function stringToDateTime(date, businessDate = false, format = 'yyyy-MM-dd HH:mm:ss') {
        // Use the business date format if it's a business date
        const parseFormat = businessDate ? 'yyyy-MM-dd' : format;
        // Slice the string if it's a business date so we only get the date part
        const slicedString = businessDate ? date.slice(0, 10) : date;
        // If it's a business date then just take the string and set it to the customer tz immediately because then the time won't change
        // If it's not a business date set it to UTC as it's what backend gives us and then update the tz to
        // the customer tz below so that the time is changed accordingly
        try {
            return luxon_1.DateTime.fromFormat(slicedString, parseFormat, {
                zone: businessDate ? luxon_1.Settings.defaultZone : 'UTC',
            }).setZone(luxon_1.Settings.defaultZone);
        }
        catch (e) {
            // Use a try catch cause many tests for http calls don't flush with correct data
            console.error('String to date time failed:', e);
            return luxon_1.DateTime.invalid('String to date time failed');
        }
    }
    exports.stringToDateTime = stringToDateTime;
});
define("models/custom-field-base", ["require", "exports", "utils/string-to-date-time"], function (require, exports, string_to_date_time_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomFieldBase = void 0;
    /**
     * Custom field as we get it from the API without it being attached to a model
     */
    class CustomFieldBase {
        constructor(data) {
            // This is the place where we store the translations for custom fields
            this.translationNs = 'custom_fields';
            this.id = data.id;
            this.key = data.key;
            this.name = data.name;
            this.translationKey = data.name;
            this.type = data.type;
            this.createdAt = (0, string_to_date_time_1.stringToDateTime)(data.created_at);
            this.updatedAt = (0, string_to_date_time_1.stringToDateTime)(data.updated_at);
            this.deletedAt = data.deleted_at ? (0, string_to_date_time_1.stringToDateTime)(data.deleted_at) : null;
        }
    }
    exports.CustomFieldBase = CustomFieldBase;
});
define("utils/convert-date-time-to-business-date", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertDateTimeToBusinessDate = void 0;
    function convertDateTimeToBusinessDate(date) {
        if (!date.isValid) {
            throw Error('Invalid DateTime');
        }
        return date.toFormat('yyyy-MM-dd');
    }
    exports.convertDateTimeToBusinessDate = convertDateTimeToBusinessDate;
});
define("types/business-date-string", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
define("utils/business-date", ["require", "exports", "luxon", "utils/string-to-date-time", "utils/convert-date-time-to-business-date"], function (require, exports, luxon_2, string_to_date_time_2, convert_date_time_to_business_date_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BusinessDate = void 0;
    class BusinessDate {
        constructor(value) {
            this.original = value;
            this.dateTime = value instanceof luxon_2.DateTime ? value : (0, string_to_date_time_2.stringToDateTime)(value, true);
        }
        toString() {
            return (0, convert_date_time_to_business_date_1.convertDateTimeToBusinessDate)(this.dateTime);
        }
    }
    exports.BusinessDate = BusinessDate;
});
define("models/custom-field", ["require", "exports", "luxon", "models/custom-field-pivot", "models/custom-field-base", "utils/string-to-date-time", "utils/business-date"], function (require, exports, luxon_3, custom_field_pivot_1, custom_field_base_1, string_to_date_time_3, business_date_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomField = void 0;
    /**
     * Custom field when it's attached to a model
     */
    class CustomField extends custom_field_base_1.CustomFieldBase {
        // Is this field active atm?
        get active() {
            const now = luxon_3.DateTime.now();
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
            this.from = data.from ? (0, string_to_date_time_3.stringToDateTime)(data.from) : null;
            this.to = data.to ? (0, string_to_date_time_3.stringToDateTime)(data.to) : null;
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
            if (typeof value === 'string' || value instanceof luxon_3.DateTime) {
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
});
define("models/custom-field-pivot", ["require", "exports", "utils/string-to-date-time"], function (require, exports, string_to_date_time_4) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.CustomFieldPivot = void 0;
    class CustomFieldPivot {
        constructor(data) {
            this.id = data.id;
            this.customFieldId = data.custom_field_id;
            this.default = data.default;
            this.hasInterval = data.has_interval;
            this.metadata = data.metadata;
            this.model = data.model;
            this.objectId = data.object_id;
            this.objectType = data.object_type;
            this.required = data.required;
            this.validator = data.validator;
            this.createdAt = data.created_at ? (0, string_to_date_time_4.stringToDateTime)(data.created_at) : null;
            this.updatedAt = data.updated_at ? (0, string_to_date_time_4.stringToDateTime)(data.updated_at) : null;
            try {
                this.stringifiedMetadata = data.metadata ? JSON.stringify(data.metadata) : '';
            }
            catch (e) {
                console.error(e);
                this.stringifiedMetadata = '';
            }
        }
    }
    exports.CustomFieldPivot = CustomFieldPivot;
});
define("models/custom-field-pivot.mock", ["require", "exports", "models/custom-field-pivot"], function (require, exports, custom_field_pivot_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mockCustomFieldPivot = exports.mockCustomFieldPivotResponse = void 0;
    function mockCustomFieldPivotResponse(data = {}) {
        return Object.assign({ custom_field_id: 3, default: null, has_interval: true, id: 2, metadata: null, model: 'absence', object_id: 2, object_type: 'absence', required: false, validator: null, created_at: '1970-01-01 00:00:00', updated_at: '1970-01-01 00:00:00' }, data);
    }
    exports.mockCustomFieldPivotResponse = mockCustomFieldPivotResponse;
    function mockCustomFieldPivot(data = {}) {
        return new custom_field_pivot_2.CustomFieldPivot(mockCustomFieldPivotResponse(data));
    }
    exports.mockCustomFieldPivot = mockCustomFieldPivot;
});
define("models/custom-field-base.mock", ["require", "exports", "models/custom-field-base", "models/custom-field-pivot.mock"], function (require, exports, custom_field_base_2, custom_field_pivot_mock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mockCustomFieldBase = exports.mockCustomFieldBaseResponse = void 0;
    function mockCustomFieldBaseResponse(data = {}, pivot = {}) {
        return Object.assign({ created_at: '', deleted_at: null, from: null, id: 0, key: '', model: 'employee', name: '', pivot: (0, custom_field_pivot_mock_1.mockCustomFieldPivotResponse)(pivot), to: null, type: 'string', updated_at: '', value: null }, data);
    }
    exports.mockCustomFieldBaseResponse = mockCustomFieldBaseResponse;
    function mockCustomFieldBase(data, pivot) {
        return new custom_field_base_2.CustomFieldBase(mockCustomFieldBaseResponse(data, pivot));
    }
    exports.mockCustomFieldBase = mockCustomFieldBase;
});
define("models/custom-field-base.spec", ["require", "exports", "models/custom-field-base.mock"], function (require, exports, custom_field_base_mock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('CustomFieldBase', () => {
        it('should create an instance', () => {
            expect((0, custom_field_base_mock_1.mockCustomFieldBase)()).toBeTruthy();
        });
    });
});
define("models/custom-field-pivot.spec", ["require", "exports", "models/custom-field-pivot.mock"], function (require, exports, custom_field_pivot_mock_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('CustomFieldPivot', () => {
        it('should create an instance', () => {
            expect((0, custom_field_pivot_mock_2.mockCustomFieldPivot)()).toBeTruthy();
        });
    });
});
define("models/custom-field.mock", ["require", "exports", "models/custom-field", "models/custom-field-pivot.mock"], function (require, exports, custom_field_1, custom_field_pivot_mock_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mockCustomField = exports.mockCustomFieldResponse = void 0;
    function mockCustomFieldResponse(data = {}, pivot = {}) {
        return Object.assign({ created_at: '', deleted_at: null, from: null, id: 0, key: '', model: 'employee', name: '', pivot: (0, custom_field_pivot_mock_3.mockCustomFieldPivotResponse)(pivot), to: null, type: 'string', updated_at: '', value: null }, data);
    }
    exports.mockCustomFieldResponse = mockCustomFieldResponse;
    function mockCustomField(data = {}, pivot = {}) {
        return new custom_field_1.CustomField(mockCustomFieldResponse(data, pivot));
    }
    exports.mockCustomField = mockCustomField;
});
define("models/custom-field.spec", ["require", "exports", "luxon", "models/custom-field-base", "models/custom-field.mock", "utils/business-date"], function (require, exports, luxon_4, custom_field_base_3, custom_field_mock_1, business_date_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('CustomField', () => {
        it('should create an instance', () => {
            expect((0, custom_field_mock_1.mockCustomField)()).toBeTruthy();
        });
        describe(`creatable`, function () {
            it(`should be creatable if there is no value`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: null }).creatable).toBe(true);
            });
            it(`should be creatable if there is a value but the field has interval set to true`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: '9001' }, { has_interval: true }).creatable).toBe(true);
            });
            it(`should not be creatable if there's a value and interval is false`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: '9001' }, { has_interval: false }).creatable).toBe(false);
            });
        });
        describe(`editable`, function () {
            it(`should be editable if there's a value`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: '9001' }).editable).toBe(true);
            });
            it(`should not be editable if there's no value`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: null }).editable).toBe(false);
            });
        });
        describe(`deletable`, function () {
            it(`should be deletable if there's a value and the field is not required`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: '9001' }, { required: false }).deletable).toBe(true);
            });
            it(`should not be deletable if there's no value`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: null }).deletable).toBe(false);
            });
            it(`should not be deletable if the field is required`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: '9001' }, { required: true }).deletable).toBe(false);
            });
        });
        describe(`toString()`, function () {
            it(`should return null if the value is null`, function () {
                expect((0, custom_field_mock_1.mockCustomField)({ value: null }).toString()).toBeNull();
            });
            it(`should return false as the string 0`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)();
                field.value = false;
                expect(field.toString()).toBe('0');
            });
            it(`should return true as the string 1`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)();
                field.value = true;
                expect(field.toString()).toBe('1');
            });
            it(`should return a string as a string`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)();
                field.value = '9001';
                expect(field.toString()).toBe('9001');
            });
            it(`should return an integer as a string`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)();
                field.value = 9001;
                expect(field.toString()).toBe('9001');
            });
            it(`should return a decimal as a string`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)();
                field.value = 9001.1;
                expect(field.toString()).toBe('9001.1');
            });
            it(`should convert a DateTime to a business date`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({ type: 'date' });
                field.value = luxon_4.DateTime.fromObject({ year: 2020, month: 10, day: 10 });
                expect(field.toString()).toBe('2020-10-10');
            });
        });
        describe(`clone()`, function () {
            it(`should return a new custom field`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)();
                const clone = field.clone();
                expect(clone).not.toBe(field);
                expect(clone).toBeInstanceOf(custom_field_base_3.CustomFieldBase);
            });
        });
        describe(`setNumberValue()`, function () {
            it(`should keep value as null if value is null`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: null,
                    type: 'integer',
                });
                expect(field.value).toBeNull();
            });
            it(`should convert a string value to a number`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '9001',
                    type: 'integer',
                });
                expect(field.value).toBe(9001);
            });
            it(`should just assign the number if the value is a number`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '9001',
                    type: 'integer',
                });
                field.value = 9001;
                expect(field.value).toBe(9001);
            });
        });
        describe(`setBooleanValue()`, function () {
            it(`should keep value as null if value is null`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: null,
                    type: 'boolean',
                });
                expect(field.value).toBeNull();
            });
            it(`should convert the string 1 to true`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '1',
                    type: 'boolean',
                });
                expect(field.value).toBe(true);
            });
            it(`should convert the string 0 to false`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '0',
                    type: 'boolean',
                });
                expect(field.value).toBe(false);
            });
            it(`should just assign the boolean if the value is a boolean`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '1',
                    type: 'boolean',
                });
                field.value = false;
                expect(field.value).toBe(false);
            });
        });
        describe(`setDateValue()`, function () {
            it(`should keep value as null if value is null`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: null,
                    type: 'date',
                });
                expect(field.value).toBeNull();
            });
            it(`should convert a string to a business date`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '2002-10-10',
                    type: 'date',
                });
                expect(field.value).toBeInstanceOf(business_date_2.BusinessDate);
            });
            it(`should just assign the value if the value is an instanceof DateTime`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    value: '2002-10-10',
                    type: 'date',
                });
                field.value = luxon_4.DateTime.now();
                expect(field.value).toBeInstanceOf(business_date_2.BusinessDate);
            });
        });
        describe(`value()`, function () {
            describe(`get`, function () {
                it(`should return the private _value`, function () {
                    const field = (0, custom_field_mock_1.mockCustomField)({ value: '9001' });
                    field['_value'] = 'overridden';
                    expect(field.value).toBe('overridden');
                });
            });
            describe(`set`, function () {
                it(`should call setNumberValue if type is decimal`, function () {
                    const field = (0, custom_field_mock_1.mockCustomField)({ type: 'decimal' });
                    jest.spyOn(field, 'setNumberValue').mockImplementation(() => { });
                    field.value = 9001;
                    expect(field.setNumberValue).toHaveBeenCalledWith(9001);
                });
                it(`should call setNumberValue if type is integer`, function () {
                    const field = (0, custom_field_mock_1.mockCustomField)({ type: 'integer' });
                    jest.spyOn(field, 'setNumberValue').mockImplementation(() => { });
                    field.value = 9001;
                    expect(field.setNumberValue).toHaveBeenCalledWith(9001);
                });
                it(`should call setBooleanValue if type is boolean`, function () {
                    const field = (0, custom_field_mock_1.mockCustomField)({ type: 'boolean' });
                    jest.spyOn(field, 'setBooleanValue').mockImplementation(() => { });
                    field.value = true;
                    expect(field.setBooleanValue).toHaveBeenCalledWith(true);
                });
                it(`should call setDateValue if type is date`, function () {
                    const field = (0, custom_field_mock_1.mockCustomField)({ type: 'date' });
                    jest.spyOn(field, 'setDateValue').mockImplementation(() => { });
                    field.value = '2002-10-10';
                    expect(field.setDateValue).toHaveBeenCalledWith('2002-10-10');
                });
            });
        });
        describe(`isModified()`, function () {
            it(`should  return false if the original value and current value is null`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({ value: null });
                field.value = 2;
                field.value = null;
                expect(field.isModified).toBe(false);
            });
            it(`should return true if the original value differs from the current value`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({ value: '1' });
                field.value = 2;
                expect(field.isModified).toBe(true);
            });
        });
        describe(`active()`, function () {
            it(`should return true if from is not set`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({ from: null });
                expect(field.active).toBe(true);
            });
            it(`should return true if from is set and now is after from`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({ from: luxon_4.DateTime.now().minus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss') });
                expect(field.active).toBe(true);
            });
            it(`should return false if from is set and now is before from`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({ from: luxon_4.DateTime.now().plus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss') });
                expect(field.active).toBe(false);
            });
            it(`should return true if from and to is set and now is between those`, function () {
                const field = (0, custom_field_mock_1.mockCustomField)({
                    from: luxon_4.DateTime.now().minus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss'),
                    to: luxon_4.DateTime.now().plus({ week: 1 }).toFormat('yyyy-MM-dd HH:mm:ss'),
                });
                expect(field.active).toBe(true);
            });
        });
    });
});
define("models/language", ["require", "exports", "utils/string-to-date-time"], function (require, exports, string_to_date_time_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Language = void 0;
    class Language {
        constructor(data) {
            this.languageTag = data === null || data === void 0 ? void 0 : data.ietf_bcp47_tag;
            this.name = (data === null || data === void 0 ? void 0 : data.name) || this.getName();
            this.code = data === null || data === void 0 ? void 0 : data.code;
            this.ietfBcp47Tag = data.ietf_bcp47_tag;
            this.iso639_1 = data.iso639_1;
            this.usersCount = data.users_count;
            this.createdAt = (0, string_to_date_time_5.stringToDateTime)(data.created_at);
            this.updatedAt = (0, string_to_date_time_5.stringToDateTime)(data.updated_at);
        }
        getName() {
            try {
                return new Intl.DisplayNames([this.languageTag], { type: 'language' }).of(this.languageTag) || '';
            }
            catch (e) {
                return '';
            }
        }
    }
    exports.Language = Language;
});
define("models/language.mock", ["require", "exports", "models/language"], function (require, exports, language_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.mockLanguage = exports.mockLanguageResponse = void 0;
    function mockLanguageResponse(data = {}) {
        return Object.assign({ code: 'en', ietf_bcp47_tag: 'en-US', iso639_1: 'en', name: 'English', users_count: 0, created_at: '1970-01-01 00:00:00', updated_at: '1970-01-01 00:00:00' }, data);
    }
    exports.mockLanguageResponse = mockLanguageResponse;
    function mockLanguage(data = {}) {
        return new language_1.Language(mockLanguageResponse(data));
    }
    exports.mockLanguage = mockLanguage;
});
define("models/language.spec", ["require", "exports", "models/language.mock"], function (require, exports, language_mock_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('Language', () => {
        it('should create an instance', () => {
            expect((0, language_mock_1.mockLanguage)()).toBeTruthy();
        });
    });
});
define("utils/base-api-model", ["require", "exports", "models/custom-field"], function (require, exports, custom_field_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BaseApiModel = void 0;
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
                return [...acc, new custom_field_2.CustomField(value)];
            }, []);
        }
        clone() {
            // @ts-ignore
            return new (this.constructor)(this._response);
        }
        getCustomFieldValue(key) {
            var _a;
            const customField = (_a = this.customFields) === null || _a === void 0 ? void 0 : _a.find((cf) => cf.key === key);
            return !customField ? null : customField.value;
        }
    }
    exports.BaseApiModel = BaseApiModel;
});
define("utils/base-api-model.spec", ["require", "exports", "utils/base-api-model"], function (require, exports, base_api_model_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('BaseApiModel', () => {
        it('should create an instance', () => {
            expect(new base_api_model_1.BaseApiModel({}, undefined)).toBeTruthy();
        });
    });
});
define("utils/business-date.spec", ["require", "exports", "utils/business-date"], function (require, exports, business_date_3) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('BusinessDate', () => {
        it('should create an instance', () => {
            expect(new business_date_3.BusinessDate('2022-02-02')).toBeTruthy();
        });
        describe(`toString()`, function () {
            it(`should return a properly formatted string`, function () {
                expect(new business_date_3.BusinessDate('2022-02-02').toString()).toBe('2022-02-02');
            });
        });
    });
});
define("utils/convert-date-time-to-business-date.spec", ["require", "exports", "utils/convert-date-time-to-business-date", "luxon"], function (require, exports, convert_date_time_to_business_date_2, luxon_5) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('convertDateTimeToBusinessDate', () => {
        it('should format a date time like a business date', () => {
            expect((0, convert_date_time_to_business_date_2.convertDateTimeToBusinessDate)(luxon_5.DateTime.fromObject({ year: 2020, month: 4, day: 12 }))).toBe('2020-04-12');
        });
    });
});
define("utils/string-to-date-time.spec", ["require", "exports", "utils/string-to-date-time", "luxon"], function (require, exports, string_to_date_time_6, luxon_6) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    describe('stringToDateTime()', function () {
        it(`should return a DateTime when the string is not a business date string`, function () {
            expect((0, string_to_date_time_6.stringToDateTime)('2020-02-20 20:20:20')).toBeInstanceOf(luxon_6.DateTime);
        });
        it(`should return a DateTime when the string is a business date string`, function () {
            expect((0, string_to_date_time_6.stringToDateTime)('2020-02-20', true)).toBeInstanceOf(luxon_6.DateTime);
        });
    });
});
