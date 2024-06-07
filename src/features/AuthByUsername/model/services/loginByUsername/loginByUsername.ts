import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema'
import axios from 'axios';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { LoginUser } from '../../types/loginUser'

interface LoginByUsernameProps {
    email: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<LoginUser, LoginByUsernameProps, ThunkConfig<string>>(
    'login/loginByUsername',
    async (authData, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi;
        try {
            const response = await extra.api.post<LoginUser>('/login', authData);
            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, response.data.token);
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
