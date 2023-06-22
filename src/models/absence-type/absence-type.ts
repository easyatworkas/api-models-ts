import { DateTime } from 'luxon';
import { TinyColor } from '@ctrl/tinycolor';
import { BaseApiModel } from '../../utils/base-api-model';
import { ApiResponse } from '../../interfaces/api-response';
import { Property, PropertyResponse } from '../property/property';
import { stringToDateTime } from '../../utils/string-to-date-time';

export type AbsenceSpan = 'hour' | 'day';

export interface AbsenceTypeResponse extends ApiResponse {
    id: number;
    code?: string | null;
    color?: string | null;
    gradable: boolean;
    name: string;
    paid: boolean;
    properties?: PropertyResponse[];
    setting_group_id: number;
    span: AbsenceSpan;
    from?: string | null;
    to?: string | null;
    created_at?: string | null;
    updated_at?: string | null;
    deleted_at?: string | null;
}

export class AbsenceType extends BaseApiModel<AbsenceTypeResponse, AbsenceType> {
    id: number;
    code?: string | null;
    color: TinyColor;
    gradable: boolean;
    name: string;
    paid: boolean;
    translatedName = '';
    properties: Property[];
    settingGroupId: number;
    span: AbsenceSpan;
    from: DateTime | null;
    to: DateTime | null;
    createdAt: DateTime | null;
    updatedAt: DateTime | null;
    deletedAt: DateTime | null;
    textColor?: string;

    constructor(data: AbsenceTypeResponse) {
        super(data, undefined);

        this.id = data.id;
        this.code = data.code;
        this.color = data.color?.startsWith('#') ? new TinyColor(data.color) : new TinyColor('#FFF');
        this.gradable = data.gradable;
        this.name = data.name;
        this.paid = data.paid;
        this.properties = data.properties?.map((p) => new Property(p)) || [];
        this.settingGroupId = data.setting_group_id;
        this.span = data.span;
        this.from = data.from ? stringToDateTime(data.from): null;
        this.to = data.to ? stringToDateTime(data.to): null;
        this.createdAt = data.created_at ? stringToDateTime(data.created_at): null;
        this.updatedAt = data.updated_at ? stringToDateTime(data.updated_at): null;
        this.deletedAt = data.deleted_at ? stringToDateTime(data.deleted_at): null;
        this.textColor = this.color.isDark() ? 'white' : 'black';
    }

    setTranslatedName(translated: string) {
        this.translatedName = translated;
    }
}
