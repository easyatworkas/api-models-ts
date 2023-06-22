import { DateTime } from 'luxon';
import { ApiResponse } from '../../interfaces/api-response';
import { BaseApiModel } from '../../utils/base-api-model';
export interface PropertyResponse extends ApiResponse {
    id: number;
    key: string;
    value: string;
    created_at: string;
    updated_at: string;
    from?: string | null;
    to?: string | null;
}
export declare class Property extends BaseApiModel<PropertyResponse, Property> {
    id: number;
    key: string;
    value: string;
    createdAt: DateTime | null;
    updatedAt: DateTime | null;
    from: DateTime | null;
    to: DateTime | null;
    constructor(data: PropertyResponse);
}
