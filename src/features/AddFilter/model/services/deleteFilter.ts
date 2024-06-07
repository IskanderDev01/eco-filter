import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const deleteFilter = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>('filter/deleteFilter', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        await extra.api.delete(`/order/delete/${id}`);
        
        return '';
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
