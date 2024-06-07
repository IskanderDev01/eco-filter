import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Client, ClientData } from '../types/client';
import {
    getAllClientsCurrentPage,
    getAllClientsDays,
    getAllClientsSearch,
} from '../selectors/mainPageSelectors';

export const fetchAllClients = createAsyncThunk<
    ClientData,
    void,
    ThunkConfig<string>
>('allClients/fetchAllClients', async (_, thunkApi) => {
    const { getState, extra, rejectWithValue } = thunkApi;
    const search = getAllClientsSearch(getState());
    const days = getAllClientsDays(getState());
    const current_page = getAllClientsCurrentPage(getState());

    try {
        if (search) {
            const response = await extra.api.get(
                `/users/filters/${days}?search=${search}`,
            );

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } else {
            const response = await extra.api.get(
                `/users/filters/${days}?page=${current_page}&per_page=5`,
            );

            if (!response.data) {
                throw new Error();
            }
            return response.data;
        }
    } catch (e) {
        return rejectWithValue('error');
    }
});
