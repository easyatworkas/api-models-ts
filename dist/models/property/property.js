"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Property = void 0;
const string_to_date_time_1 = require("../../utils/string-to-date-time");
const base_api_model_1 = require("../../utils/base-api-model");
class Property extends base_api_model_1.BaseApiModel {
    constructor(data) {
        super(data, undefined);
        this.id = data.id;
        this.key = data.key;
        this.value = data.value;
        this.createdAt = (0, string_to_date_time_1.stringToDateTime)(data.created_at);
        this.updatedAt = (0, string_to_date_time_1.stringToDateTime)(data.updated_at);
        this.from = data.from ? (0, string_to_date_time_1.stringToDateTime)(data.from) : null;
        this.to = data.to ? (0, string_to_date_time_1.stringToDateTime)(data.to) : null;
    }
}
exports.Property = Property;
