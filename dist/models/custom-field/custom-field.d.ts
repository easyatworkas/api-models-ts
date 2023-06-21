import { DateTime } from 'luxon';
import { CustomFieldPivot, CustomFieldPivotResponse } from '../custom-field-pivot';
import { CustomFieldBase, CustomFieldBaseResponse } from '../custom-field-base';
import { BusinessDate } from '../../utils/business-date';
import { BusinessDateString } from '../../types/business-date-string';
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
export declare class CustomField extends CustomFieldBase {
    private readonly _response;
    get active(): boolean;
    get isModified(): boolean;
    private readonly _originalValue;
    private _value;
    get value(): CustomFieldValue;
    set value(value: unknown);
    pivot: CustomFieldPivot;
    selectOptions: {
        value: string;
        textNs: string;
        textKey: string;
    }[];
    from: DateTime | null;
    to: DateTime | null;
    creatable: boolean;
    editable: boolean;
    deletable: boolean;
    constructor(data: CustomFieldResponse);
    toString(): string | null;
    getSelectedOption(): {
        value: string;
        textNs: string;
        textKey: string;
    } | undefined;
    clone(data?: Partial<CustomFieldResponse>): CustomField;
    getSelectOptions(): Record<string, string>;
    private setSelectOptions;
    private setNumberValue;
    private setBooleanValue;
    private setDateValue;
}
