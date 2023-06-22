"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbsenceType = void 0;
const tinycolor_1 = require("@ctrl/tinycolor");
const base_api_model_1 = require("../../utils/base-api-model");
const property_1 = require("../property/property");
const string_to_date_time_1 = require("../../utils/string-to-date-time");
class AbsenceType extends base_api_model_1.BaseApiModel {
    constructor(data) {
        var _a, _b;
        super(data, undefined);
        this.translatedName = '';
        this.id = data.id;
        this.code = data.code;
        this.color = ((_a = data.color) === null || _a === void 0 ? void 0 : _a.startsWith('#')) ? new tinycolor_1.TinyColor(data.color) : new tinycolor_1.TinyColor('#FFF');
        this.gradable = data.gradable;
        this.name = data.name;
        this.paid = data.paid;
        this.properties = ((_b = data.properties) === null || _b === void 0 ? void 0 : _b.map((p) => new property_1.Property(p))) || [];
        this.settingGroupId = data.setting_group_id;
        this.span = data.span;
        this.from = data.from ? (0, string_to_date_time_1.stringToDateTime)(data.from) : null;
        this.to = data.to ? (0, string_to_date_time_1.stringToDateTime)(data.to) : null;
        this.createdAt = data.created_at ? (0, string_to_date_time_1.stringToDateTime)(data.created_at) : null;
        this.updatedAt = data.updated_at ? (0, string_to_date_time_1.stringToDateTime)(data.updated_at) : null;
        this.deletedAt = data.deleted_at ? (0, string_to_date_time_1.stringToDateTime)(data.deleted_at) : null;
        this.textColor = this.color.isDark() ? 'white' : 'black';
    }
    setTranslatedName(translated) {
        this.translatedName = translated;
    }
}
exports.AbsenceType = AbsenceType;
