declare module "interfaces/api-response" {
    export type ApiResponse = {
        [key: string | number]: string | number | boolean | null | undefined | ApiResponse | Record<string | number, ApiResponse> | Array<string | number | boolean | null | undefined | ApiResponse>;
    };
}
declare module "utils/string-to-date-time" {
    import { DateTime } from 'luxon';
    export function stringToDateTime(date: string, businessDate?: boolean, format?: string): DateTime;
}
declare module "models/custom-field-base" {
    import { DateTime } from 'luxon';
    import { ApiResponse } from "interfaces/api-response";
    export type CustomFieldType = 'string' | 'integer' | 'decimal' | 'date' | 'boolean' | 'select';
    export interface CustomFieldBaseResponse extends ApiResponse {
        id: number;
        key: string;
        name: string;
        type: CustomFieldType;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
    }
    /**
     * Custom field as we get it from the API without it being attached to a model
     */
    export class CustomFieldBase {
        id: number;
        key: string;
        name: string;
        type: CustomFieldType;
        translationKey: string;
        readonly translationNs = "custom_fields";
        createdAt: DateTime;
        updatedAt: DateTime;
        deletedAt: DateTime | null;
        constructor(data: CustomFieldBaseResponse);
    }
}
declare module "utils/convert-date-time-to-business-date" {
    import { DateTime } from 'luxon';
    export function convertDateTimeToBusinessDate(date: DateTime): string;
}
declare module "types/business-date-string" {
    /**
     * A string representing a business date in the format 'YYYY-MM-DD'
     */
    export type BusinessDateString = string;
}
declare module "utils/business-date" {
    import { DateTime } from 'luxon';
    import { BusinessDateString } from "types/business-date-string";
    export class BusinessDate {
        readonly original: BusinessDateString | DateTime;
        dateTime: DateTime;
        constructor(value: DateTime | BusinessDateString);
        toString(): string;
    }
}
declare module "models/custom-field" {
    import { DateTime } from 'luxon';
    import { CustomFieldPivot, CustomFieldPivotResponse } from "models/custom-field-pivot";
    import { CustomFieldBase, CustomFieldBaseResponse } from "models/custom-field-base";
    import { BusinessDate } from "utils/business-date";
    import { BusinessDateString } from "types/business-date-string";
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
}
declare module "models/custom-field-pivot" {
    import { DateTime } from 'luxon';
    import { CustomFieldModel } from "models/custom-field";
    import { ApiResponse } from "interfaces/api-response";
    export interface CustomFieldPivotResponse extends ApiResponse {
        custom_field_id: number;
        default: string | null;
        has_interval: boolean;
        id: number;
        metadata: Record<string, any> | null;
        model: CustomFieldModel;
        object_id: number;
        object_type: string;
        required: boolean;
        validator: string | null;
        created_at: string | null;
        updated_at: string | null;
    }
    export class CustomFieldPivot {
        customFieldId: number;
        default: string | null;
        hasInterval: boolean;
        id: number;
        metadata: Record<string, Record<string, string> | string> | null;
        readonly stringifiedMetadata: string;
        model: CustomFieldModel;
        objectId: number;
        objectType: string;
        required: boolean;
        validator: string | null;
        createdAt: DateTime | null;
        updatedAt: DateTime | null;
        constructor(data: CustomFieldPivotResponse);
    }
}
declare module "models/custom-field-pivot.mock" {
    import { CustomFieldPivot, CustomFieldPivotResponse } from "models/custom-field-pivot";
    export function mockCustomFieldPivotResponse(data?: Partial<CustomFieldPivotResponse>): {
        custom_field_id: number;
        default: string | null;
        has_interval: boolean;
        id: number;
        metadata: Record<string, any> | null;
        model: import("models/custom-field").CustomFieldModel;
        object_id: number;
        object_type: string;
        required: boolean;
        validator: string | null;
        created_at: string | null;
        updated_at: string | null;
    };
    export function mockCustomFieldPivot(data?: Partial<CustomFieldPivotResponse>): CustomFieldPivot;
}
declare module "models/custom-field-base.mock" {
    import { CustomFieldBase, CustomFieldBaseResponse } from "models/custom-field-base";
    import { CustomFieldPivotResponse } from "models/custom-field-pivot";
    export function mockCustomFieldBaseResponse(data?: Partial<CustomFieldBaseResponse>, pivot?: Partial<CustomFieldPivotResponse>): {
        id: number;
        key: string;
        name: string;
        type: import("models/custom-field-base").CustomFieldType;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        from: null;
        model: string;
        pivot: {
            custom_field_id: number;
            default: string | null;
            has_interval: boolean;
            id: number;
            metadata: Record<string, any> | null;
            model: import("models/custom-field").CustomFieldModel;
            object_id: number;
            object_type: string;
            required: boolean;
            validator: string | null;
            created_at: string | null;
            updated_at: string | null;
        };
        to: null;
        value: null;
    };
    export function mockCustomFieldBase(data?: Partial<CustomFieldBaseResponse>, pivot?: Partial<CustomFieldPivotResponse>): CustomFieldBase;
}
declare module "models/custom-field-base.spec" { }
declare module "models/custom-field-pivot.spec" { }
declare module "models/custom-field.mock" {
    import { CustomField, CustomFieldResponse } from "models/custom-field";
    import { CustomFieldPivotResponse } from "models/custom-field-pivot";
    export function mockCustomFieldResponse(data?: Partial<CustomFieldResponse>, pivot?: Partial<CustomFieldPivotResponse>): {
        from: string | null;
        pivot: {
            custom_field_id: number;
            default: string | null;
            has_interval: boolean;
            id: number;
            metadata: Record<string, any> | null;
            model: import("models/custom-field").CustomFieldModel;
            object_id: number;
            object_type: string;
            required: boolean;
            validator: string | null;
            created_at: string | null;
            updated_at: string | null;
        };
        to: string | null;
        value: string | null;
        id: number;
        key: string;
        name: string;
        type: import("models/custom-field-base").CustomFieldType;
        created_at: string;
        updated_at: string;
        deleted_at: string | null;
        model: string;
    };
    export function mockCustomField(data?: Partial<CustomFieldResponse>, pivot?: Partial<CustomFieldPivotResponse>): CustomField;
}
declare module "models/custom-field.spec" { }
declare module "models/language" {
    import { DateTime } from 'luxon';
    import { ApiResponse } from "interfaces/api-response";
    export interface LanguageResponse extends ApiResponse {
        code: string;
        ietf_bcp47_tag: string;
        iso639_1: string;
        name: string;
        users_count?: number;
        created_at: string;
        updated_at: string;
    }
    export class Language {
        code: string;
        ietfBcp47Tag: string;
        languageTag: string;
        iso639_1: string;
        name: string;
        usersCount?: number;
        createdAt: DateTime;
        updatedAt: DateTime;
        constructor(data: LanguageResponse);
        private getName;
    }
}
declare module "models/language.mock" {
    import { Language, LanguageResponse } from "models/language";
    export function mockLanguageResponse(data?: Partial<LanguageResponse>): {
        code: string;
        ietf_bcp47_tag: string;
        iso639_1: string;
        name: string;
        users_count: number;
        created_at: string;
        updated_at: string;
    };
    export function mockLanguage(data?: Partial<LanguageResponse>): Language;
}
declare module "models/language.spec" { }
declare module "utils/base-api-model" {
    import { CustomField, CustomFieldModel, CustomFieldValue } from "models/custom-field";
    import { ApiResponse } from "interfaces/api-response";
    /**
     * The purpose of this is to extend API models with simple functionality that don't interfere with the model or response in any big way.
     */
    export class BaseApiModel<Response extends ApiResponse, Model> {
        readonly customFieldModel: CustomFieldModel | undefined;
        readonly _response: Response;
        customFields: CustomField[];
        constructor(data: Response, customFieldModel: CustomFieldModel | undefined);
        clone(): Model;
        getCustomFieldValue(key: string): CustomFieldValue;
    }
}
declare module "utils/base-api-model.spec" { }
declare module "utils/business-date.spec" { }
declare module "utils/convert-date-time-to-business-date.spec" { }
declare module "utils/string-to-date-time.spec" { }
