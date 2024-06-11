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
        if (!days) {
            const response = await extra.api.get(
                `/users/filters/all?page=${current_page}&search=${search}&per_page=10`,
            );
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        }
        else {
            const response = await extra.api.get(
                `/users/filters/all?filter=${days}&search=${search}&page=${current_page}&per_page=10`,
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
