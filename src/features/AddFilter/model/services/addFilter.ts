import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Filter } from '../types/filter'

interface AddFilterProps {
    user_id?: number;
    address?: string;
    category_id?: number;
}

export const addFilter = createAsyncThunk<
    Filter,
    AddFilterProps,
    ThunkConfig<string>
>('add/addFilter', async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post('/order/create', authData)
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
