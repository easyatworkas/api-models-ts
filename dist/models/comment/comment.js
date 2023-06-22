"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const string_to_date_time_1 = require("../../utils/string-to-date-time");
const base_api_model_1 = require("../../utils/base-api-model");
class Comment extends base_api_model_1.BaseApiModel {
    constructor(data) {
        super(data, undefined);
        this.body = '';
        this.body = data.body;
        this.commentableId = data.commentable_id;
        this.commentableType = data.commentable_type;
        this.createdAt = (0, string_to_date_time_1.stringToDateTime)(data.created_at);
        this.id = data.id;
        this.userId = data.user_id;
        this.userName = data.user_name;
    }
    getReadableFields() {
        return ['body', 'commentable_id', 'commentable_type', 'id', 'user_id', 'user_name'];
    }
}
exports.Comment = Comment;
