import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Users } from '../../types/users';
import { ValidateAddClientError } from '../../types/CLientSchema';
import { validateAddClientData } from '../validateAddClientData/validateAddClientData';

export const addClient = createAsyncThunk<
    Users,
    Users,
    ThunkConfig<ValidateAddClientError[]>
>('add/addClient', async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const errors = validateAddClientData(authData);
    if (errors.length) {
        return rejectWithValue(errors);
    }
    try {
        if (!errors?.length) {
            const response = await extra.api.post('/user/create', authData);
            if (!response.data) {
                throw new Error();               
            }
            return response.data;
        }
    } catch (e) {
        console.log(e);
        return rejectWithValue([ValidateAddClientError.SERVER_ERROR]);
    }
});
