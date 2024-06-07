import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginState = (state: StateSchema) => state.login;
export const getLoginEmail = (state: StateSchema) => state.login?.email ?? '';
export const getLoginPassword = (state: StateSchema) => state.login?.password ?? '';
export const getLoginIsLoading = (state: StateSchema) => state.login?.isLoading;
export const getLoginErorr = (state: StateSchema) => state.login?.error;
