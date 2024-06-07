import { StateSchema } from 'app/providers/StoreProvider'

export const getAddFilterAddress = (state: StateSchema) =>
    state?.filter?.address ?? '';
export const getAddFilterUserId = (state: StateSchema) =>
    state?.filter?.user_id;
export const getAddFilterCategoryId = (state: StateSchema) =>
    state?.filter?.category_id ?? 0;
export const getAddFilterIsLoading = (state: StateSchema) =>
    state?.filter?.isLoading;
export const getAddFilterErorr = (state: StateSchema) =>
    state?.filter?.error;