import { DateTime } from 'luxon';
import { stringToDateTime } from '../../utils/string-to-date-time';
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

export class Comment extends BaseApiModel<CommentResponse, Comment> implements ReadableFields<CommentResponse> {
    body = '';
    commentableId: number;
    commentableType: string;
    createdAt: DateTime;
    id: number;
    userId: number;
    userName: string;

    constructor(data: CommentResponse) {
        super(data, undefined);

        this.body = data.body;
        this.commentableId = data.commentable_id;
        this.commentableType = data.commentable_type;
        this.createdAt = stringToDateTime(data.created_at);
        this.id = data.id;
        this.userId = data.user_id;
        this.userName = data.user_name;
    }

    getReadableFields() {
        return [ 'body', 'commentable_id', 'commentable_type', 'id', 'user_id', 'user_name' ];
    }
}
