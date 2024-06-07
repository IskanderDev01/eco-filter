import { StateSchema } from 'app/providers/StoreProvider';

export const getAddClientAddress = (state: StateSchema) =>
    state?.addClientForm?.address;
export const getAddClientError = (state: StateSchema) =>
    state?.addClientForm?.error;
export const getAddClientName = (state: StateSchema) =>
    state?.addClientForm?.name;
export const getAddClientIsLoading = (state: StateSchema) =>
    state?.addClientForm?.isLoading;
export const getAddClientPhone = (state: StateSchema) =>
    state?.addClientForm?.phone;
