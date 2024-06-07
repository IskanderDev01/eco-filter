import { StateSchema } from 'app/providers/StoreProvider';

export const getUserError = (state: StateSchema) => state?.user?.error;
export const getUserIsLoading = (state: StateSchema) => state?.user?.isLoading;
export const getUser = (state: StateSchema) => state?.user?.user;
export const getUserId = (state: StateSchema) => state?.user?.id ?? 1;
