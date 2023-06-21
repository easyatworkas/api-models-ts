import {CustomField, CustomFieldModel, CustomFieldResponse, CustomFieldValue} from '../models/custom-field/custom-field';
import {ApiResponse} from '../interfaces/api-response';

/**
 * The purpose of this is to extend API models with simple functionality that don't interfere with the model or response in any big way.
 */
export class BaseApiModel<Response extends ApiResponse, Model> {
    readonly customFieldModel: CustomFieldModel | undefined;
    readonly _response: Response;

    customFields: CustomField[] = [];

    constructor(data: Response, customFieldModel: CustomFieldModel | undefined) {
        // Set the response as it is
        this._response = Object.freeze(data);

        // Set the model
        this.customFieldModel = customFieldModel;

        // Get all properties starting with "cf_" and create an instance of CustomField for each as long as the value is not nil
        this.customFields = Object.entries(data).reduce((acc, [ key, value ]) => {
            if (!key.startsWith('cf_')) {
                return acc;
            }
            if (value == null) {
                return acc;
            }
            return [ ...acc, new CustomField(value as CustomFieldResponse) ];
        }, [] as CustomField[]);
    }

    clone(): Model {
        // @ts-ignore
        return new (this.constructor)(this._response) as Model;
    }

    getCustomFieldValue(key: string): CustomFieldValue {
        const customField = this.customFields?.find((cf) => cf.key === key);

        return !customField ? null : customField.value;
    }
}
