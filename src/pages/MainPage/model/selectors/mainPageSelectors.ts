import { StateSchema } from 'app/providers/StoreProvider';

export const getAllClients = (state: StateSchema) =>
    state?.allClients?.clients ?? [];
export const getAllClientsDays = (state: StateSchema) =>
    state?.allClients?.days;
export const getAllClientsError = (state: StateSchema) =>
    state?.allClients?.error;
export const getAllClientsIsLoading = (state: StateSchema) =>
    state?.allClients?.isLoading;
export const getAllClientsSearch = (state: StateSchema) =>
    state.allClients?.search ?? '';
export const getAllClientsTotal = (state: StateSchema) =>
    state.allClients?.total ?? 0;
export const getAllClientsPerPage = (state: StateSchema) =>
    state.allClients?.per_page ?? 5;
export const getAllClientsCurrentPage = (state: StateSchema) =>
    state.allClients?.current_page ?? 0;
export const getAllClientsLastPage = (state: StateSchema) =>
    state.allClients?.last_page ?? 0;
export const getAllClientsSortBy = (state: StateSchema) =>
    state.allClients?.sortBy;
