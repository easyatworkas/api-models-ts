import { DateTime } from 'luxon';
import { CustomFieldPivot, CustomFieldPivotResponse } from '../custom-field-pivot';
import { CustomFieldBase, CustomFieldBaseResponse } from '../custom-field-base';
import {stringToDateTime} from '../../utils/string-to-date-time';
import {BusinessDate} from '../../utils/business-date';
import {BusinessDateString} from '../../types/business-date-string';

export type CustomFieldModel = 'employee' | 'absence' | 'emergency_contact' | 'paid_time' | 'shift' | 'contract';
export type CustomFieldValue = string | number | boolean | BusinessDate | null;

export interface CustomFieldResponse extends CustomFieldBaseResponse {
    from: string | null;
    pivot: CustomFieldPivotResponse;
    to: string | null;
    value: string | BusinessDateString | null;
}

/**
 * Custom field when it's attached to a model
 */
export class CustomField extends CustomFieldBase {
    private readonly _response: CustomFieldResponse;

    // Is this field active atm?
    get active(): boolean {
        const now = DateTime.now();

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

    private readonly _originalValue: CustomFieldValue;
    private _value: CustomFieldValue = null;
    get value(): CustomFieldValue {
        return this._value;
    }

    set value(value: unknown) {
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
                this._value = value as CustomFieldValue;
            }
        }
    }

    pivot: CustomFieldPivot;
    // Formatted and pretty select options
    selectOptions: { value: string, textNs: string, textKey: string }[] = [];
    from: DateTime | null;
    to: DateTime | null;
    // Can the user create a new value for this field?
    creatable = true;
    // Can the user edit the value for this field?
    editable = true;
    // Can the user delete the value for this field?
    deletable = true;

    constructor(data: CustomFieldResponse) {
        super(data);

        this._response = data;

        this.translationKey = data.name;
        this.pivot = new CustomFieldPivot(data.pivot);
        this.from = data.from ? stringToDateTime(data.from): null;
        this.to = data.to ? stringToDateTime(data.to): null;
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
        if (this._value instanceof BusinessDate) {
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

    clone(data: Partial<CustomFieldResponse> = {}): CustomField {
        return new CustomField({
            ...this._response,
            ...data,
        });
    }

    // Returns all select options as they are in the pivot's metadata
    getSelectOptions(): Record<string, string> {
        if (this.type !== 'select') {
            return {};
        }

        const options = this.pivot.metadata?.options;
        if (typeof options === 'string') {
            return {};
        }

        return options || {};
    }

    private setSelectOptions() {
        this.selectOptions = Object.entries(this.getSelectOptions()).map(([ key, value ]) => {
            return {
                value: key,
                textNs: this.translationNs,
                textKey: value,
            };
        });
    }

    private setNumberValue(value: unknown) {
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

    private setBooleanValue(value: unknown) {
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

    private setDateValue(value: unknown) {
        if (typeof value === 'string' || value instanceof DateTime) {
            this._value = new BusinessDate(value);
        } else if (value instanceof BusinessDate) {
            this._value = value;
        } else {
            this._value = null;
        }
    }
}
