import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const filterChanged = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>('add/addFilter', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.put(`/order/update/${id}`, {
            status: 'active',
        });
        if (!response.data) {
            throw new Error();
        }
        return '';
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
