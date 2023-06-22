import { DateTime } from 'luxon';
import { stringToDateTime } from '../../utils/string-to-date-time';
import { ApiResponse } from '../../interfaces/api-response';
import { BaseApiModel } from '../../utils/base-api-model';

export interface PropertyResponse extends ApiResponse {
    id: number,
    key: string,
    value: string,
    created_at: string,
    updated_at: string,
    from?: string | null,
    to?: string | null
}

export class Property extends BaseApiModel<PropertyResponse, Property> {
    id: number;
    key: string;
    value: string;
    createdAt: DateTime | null;
    updatedAt: DateTime | null;
    from: DateTime | null;
    to: DateTime | null;

    constructor(data: PropertyResponse) {
        super(data, undefined);

        this.id = data.id;
        this.key = data.key;
        this.value = data.value;
        this.createdAt = stringToDateTime(data.created_at);
        this.updatedAt = stringToDateTime(data.updated_at);
        this.from = data.from ? stringToDateTime(data.from) : null;
        this.to = data.to ? stringToDateTime(data.to) : null;
    }
}
