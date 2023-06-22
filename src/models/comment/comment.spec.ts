import { Comment } from './comment';
import { mockComment } from './comment.mock';

describe('Comment', () => {
    it('should create an instance', () => {
        expect(mockComment()).toBeInstanceOf(Comment);
    });

    describe(`getReadableFields()`, function () {
        it(`should return a string array`, function () {
            expect(mockComment().getReadableFields()).toEqual([ 'body', 'commentable_id', 'commentable_type', 'id', 'user_id', 'user_name' ]);
        });
    });
});
