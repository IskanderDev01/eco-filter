import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const deleteClient = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>('client/deleteClient', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        await extra.api.delete(`/user/delete/${id}`);
        
        return '';
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
