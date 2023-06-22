import { DateTime } from 'luxon';
import { TinyColor } from '@ctrl/tinycolor';
import { BaseApiModel } from '../../utils/base-api-model';
import { ApiResponse } from '../../interfaces/api-response';
import { Property, PropertyResponse } from '../property/property';
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
export declare class AbsenceType extends BaseApiModel<AbsenceTypeResponse, AbsenceType> {
    id: number;
    code?: string | null;
    color: TinyColor;
    gradable: boolean;
    name: string;
    paid: boolean;
    translatedName: string;
    properties: Property[];
    settingGroupId: number;
    span: AbsenceSpan;
    from: DateTime | null;
    to: DateTime | null;
    createdAt: DateTime | null;
    updatedAt: DateTime | null;
    deletedAt: DateTime | null;
    textColor?: string;
    constructor(data: AbsenceTypeResponse);
    setTranslatedName(translated: string): void;
}
//# sourceMappingURL=absence-type.d.ts.map