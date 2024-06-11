import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const updateFilterStatus = createAsyncThunk<
    string,
    number | undefined,
    ThunkConfig<string>
>('update/updateFilterStatus', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const filterId = Number(localStorage.getItem('filter_id'))

    try {
        await extra.api.put(`/filter/update/${filterId}`)
        
        return '';
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});