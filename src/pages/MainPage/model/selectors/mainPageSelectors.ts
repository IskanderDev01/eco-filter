import { StateSchema } from 'app/providers/StoreProvider';

export const getAllClients = (state: StateSchema) => state?.allClients?.clients;
export const getAllClientsDays = (state: StateSchema) =>
    state?.allClients?.days;
export const getAllClientsError = (state: StateSchema) =>
    state?.allClients?.error;
export const getAllClientsIsLoading = (state: StateSchema) =>
    state?.allClients?.isLoading;
export const getAllClientsSearch = (state: StateSchema) =>
    state.allClients?.search ?? '';
