import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from '../types/user'

export const fetchUser = createAsyncThunk<
    User,
    number,
    ThunkConfig<string>
>('user/fetchUser', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get(`/users/${id}`);
        if (!response.data) {
            throw new Error();
        }
        return response.data.user;
    } catch (e) {
        return rejectWithValue('error');
    }
});
