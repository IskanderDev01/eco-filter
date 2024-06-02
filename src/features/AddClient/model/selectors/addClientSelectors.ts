import { StateSchema } from 'app/providers/StoreProvider';

export const getAddClientAddress = (state: StateSchema) =>
    state?.addClientForm?.address;
export const getAddClientComment = (state: StateSchema) =>
    state?.addClientForm?.comment;
export const getAddClientState = (state: StateSchema) =>
    state?.addClientForm?.date;
export const getAddClientError = (state: StateSchema) =>
    state?.addClientForm?.error;
export const getAddClientFullname = (state: StateSchema) =>
    state?.addClientForm?.fullname;
export const getAddClientIsLoading = (state: StateSchema) =>
    state?.addClientForm?.isLoading;
export const getAddClientMobile = (state: StateSchema) =>
    state?.addClientForm?.mobile;
export const getAddClientCategory = (state: StateSchema) =>
    state?.addClientForm?.category;
