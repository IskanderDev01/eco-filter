import { StateSchema } from 'app/providers/StoreProvider'

export const getUpdateClientIsLoading = (state: StateSchema) =>
state.userUpdate?.isLoading
export const getUpdateClientError = (state: StateSchema) =>
    state.userUpdate?.error
export const getUpdateClientId = (state: StateSchema) =>
    state.userUpdate?.id ?? 0
export const getUpdateClientName = (state: StateSchema) =>
    state.userUpdate?.name ?? ''