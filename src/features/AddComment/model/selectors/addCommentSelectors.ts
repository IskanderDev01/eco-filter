import { StateSchema } from 'app/providers/StoreProvider';

export const getAddComment = (state: StateSchema) => state?.comment?.comment;
export const getAddCommentIsLoading = (state: StateSchema) =>
    state?.comment?.isLoading;
export const getAddCommentErorr = (state: StateSchema) => state?.comment?.error;
export const getAddCommentOrderId = (state: StateSchema) =>
    state.comment?.order_id
