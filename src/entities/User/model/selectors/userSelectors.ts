import { StateSchema } from 'app/providers/StoreProvider';

export const getUserError = (state: StateSchema) => state.user?.error;
export const getUserIsLoading = (state: StateSchema) => state.user?.isLoading;
export const getUserFormData = (state: StateSchema) => state.user?.form;
export const getUserData = (state: StateSchema) => state.user?.data;
