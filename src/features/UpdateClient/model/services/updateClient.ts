import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

interface UpdateClientProps {
    name: string
}

export const updateClient = createAsyncThunk<
    string,
    UpdateClientProps,
    ThunkConfig<string>
>('update/updateClient', async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const userID = localStorage.getItem('userId');
    
    try {
        const response = await extra.api.put(`/user/update/${userID}`, authData)
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
