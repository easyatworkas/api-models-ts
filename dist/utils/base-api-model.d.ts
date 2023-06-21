import { CustomField, CustomFieldModel, CustomFieldValue } from '../models/custom-field';
import { ApiResponse } from '../interfaces/api-response';
/**
 * The purpose of this is to extend API models with simple functionality that don't interfere with the model or response in any big way.
 */
export declare class BaseApiModel<Response extends ApiResponse, Model> {
    readonly customFieldModel: CustomFieldModel | undefined;
    readonly _response: Response;
    customFields: CustomField[];
    constructor(data: Response, customFieldModel: CustomFieldModel | undefined);
    clone(): Model;
    getCustomFieldValue(key: string): CustomFieldValue;
}
//# sourceMappingURL=base-api-model.d.ts.map