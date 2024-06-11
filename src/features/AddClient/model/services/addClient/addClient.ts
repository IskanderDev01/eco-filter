import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Users } from '../../types/users'


interface AddClientProps {
    name?: string;
    address?: string;
    phone?: string;
    category_id?: number;
    expiration_date?: Array<string>;
}

export const addClient = createAsyncThunk<
    Users,
    AddClientProps,
    ThunkConfig<string>
>('add/addClient', async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post('/user/create', authData);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
