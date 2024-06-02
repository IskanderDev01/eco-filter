import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import axios from 'axios';
import { User } from '../../types/user';

interface AddClientProps {
    fullname?: string;
    date?: string;
    category?: string;
    address?: string;
    mobile?: string;
    comment?: string;
}

export const addClient = createAsyncThunk<
    User,
    AddClientProps,
    ThunkConfig<string>
>('add/addClient', async (authData, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const response = await axios.post<User>(
            'https://flask-filters.vercel.app/',
            authData,
        );
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
