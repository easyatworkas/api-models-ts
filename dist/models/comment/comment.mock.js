"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockComment = exports.mockCommentResponse = void 0;
const comment_1 = require("./comment");
function mockCommentResponse(data = {}) {
    return Object.assign({ body: 'test', commentable_id: 1, commentable_type: '', id: 3, user_id: 10, user_name: 'test', created_at: '2020-01-01 00:00:00' }, data);
}
exports.mockCommentResponse = mockCommentResponse;
function mockComment(data = {}) {
    return new comment_1.Comment(mockCommentResponse(data));
}
exports.mockComment = mockComment;
