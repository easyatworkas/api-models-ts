import { DateTime } from 'luxon';
import { ReadableFields } from '../../interfaces/readable-fields';
import { BaseApiModel } from '../../utils/base-api-model';
import { ApiResponse } from '../../interfaces/api-response';
export interface CommentResponse extends ApiResponse {
    body: string;
    commentable_id: number;
    commentable_type: string;
    created_at: string;
    id: number;
    user_id: number;
    user_name: string;
}
export declare class Comment extends BaseApiModel<CommentResponse, Comment> implements ReadableFields<CommentResponse> {
    body: string;
    commentableId: number;
    commentableType: string;
    createdAt: DateTime;
    id: number;
    userId: number;
    userName: string;
    constructor(data: CommentResponse);
    getReadableFields(): string[];
}
//# sourceMappingURL=comment.d.ts.map