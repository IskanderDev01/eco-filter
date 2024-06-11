import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from '../../types/user';

export const fetchUserData = createAsyncThunk<
    any,
    number,
    ThunkConfig<string>
>('user/fetchUserData', async (_, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const userId = localStorage.getItem('user_id');
    
    try {
        const response = await extra.api.get<any>(`/user/about/${userId}`);
        if (!response.data) {
            throw new Error();
        }
        return response.data.user;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
