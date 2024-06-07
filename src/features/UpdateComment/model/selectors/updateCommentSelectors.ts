import { StateSchema } from 'app/providers/StoreProvider';

export const getUpdateCommentIsLoading = (state: StateSchema) =>
    state.updateComment?.isLoading;
export const getUpdateCommentError = (state: StateSchema) =>
    state.updateComment?.error;
export const getUpdateCommentId = (state: StateSchema) =>
    state.updateComment?.id;
export const getUpdateComment = (state: StateSchema) =>
    state.updateComment?.comment ?? '';
