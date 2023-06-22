import { Comment, CommentResponse } from './comment';

export function mockCommentResponse(data: Partial<CommentResponse> = {}): CommentResponse {
    return {
        body: 'test',
        commentable_id: 1,
        commentable_type: '',
        id: 3,
        user_id: 10,
        user_name: 'test',
        created_at: '2020-01-01 00:00:00',
        ...data,
    };
}

export function mockComment(data: Partial<CommentResponse> = {}) {
    return new Comment(mockCommentResponse(data));
}
