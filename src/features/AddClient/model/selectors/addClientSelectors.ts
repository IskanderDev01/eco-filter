import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { validateAddClientData } from '../services/validateAddClientData/validateAddClientData';
import { Users } from '../types/users';

export const getAddClientAddress = (state: StateSchema) =>
    state.addClientForm?.address ?? '';
export const getAddClientError = (state: StateSchema) =>
    state.addClientForm?.error;
export const getAddClientName = (state: StateSchema) =>
    state.addClientForm?.name ?? '';
export const getAddClientIsLoading = (state: StateSchema) =>
    state.addClientForm?.isLoading;
export const getAddClientPhone = (state: StateSchema) =>
    state.addClientForm?.phone ?? '';
export const getAddClientFilter = (state: StateSchema) =>
    state.addClientForm?.category_id ?? 1;
export const getAddClientMonth = (state: StateSchema) =>
    state.addClientForm?.expiration_date ?? [];
export const getAddClientDate = (state: StateSchema) =>
    state.addClientForm?.created_at ?? '';
export const getAddClientFirstFilterDate = (state: StateSchema) =>
    state.addClientForm?.first_date ?? '';
export const getAddClientSecondFilterDate = (state: StateSchema) =>
    state.addClientForm?.second_date ?? '';

export const getValidateAddClientData = createSelector(
    [
        getAddClientName,
        getAddClientAddress,
        getAddClientPhone,
        getAddClientFilter,
        getAddClientMonth,
        getAddClientDate,
        getAddClientFirstFilterDate,
        getAddClientSecondFilterDate
    ],
    (name, address, phone, category_id, expiration_date, created_at, first_date, second_date) =>
        validateAddClientData({
            name,
            address,
            phone,
            category_id,
            expiration_date,
            created_at,
            first_date,
            second_date
        } as Users),
);
