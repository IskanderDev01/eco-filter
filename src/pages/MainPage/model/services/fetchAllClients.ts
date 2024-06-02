import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { addQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import {
    getAllClientsDays,
    getAllClientsSearch,
} from '../selectors/mainPageSelectors';
import { Client } from '../types/client';

export const fetchAllClients = createAsyncThunk<
    Client[],
    void,
    ThunkConfig<string>
>('allClients/fetchAllClients', async (_, thunkApi) => {
    const { rejectWithValue, getState } = thunkApi;
    const days = getAllClientsDays(getState());
    const search = getAllClientsSearch(getState());

    try {
        addQueryParams({
            search,
        });
        const response = await axios.get<Client[]>(
            `https://flask-filters.vercel.app/${days}`,
            {
                params: {
                    q: search,
                },
            },
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
