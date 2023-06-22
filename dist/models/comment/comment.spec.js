"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_1 = require("./comment");
const comment_mock_1 = require("./comment.mock");
describe('Comment', () => {
    it('should create an instance', () => {
        expect((0, comment_mock_1.mockComment)()).toBeInstanceOf(comment_1.Comment);
    });
    describe(`getReadableFields()`, function () {
        it(`should return a string array`, function () {
            expect((0, comment_mock_1.mockComment)().getReadableFields()).toEqual(['body', 'commentable_id', 'commentable_type', 'id', 'user_id', 'user_name']);
        });
    });
});
