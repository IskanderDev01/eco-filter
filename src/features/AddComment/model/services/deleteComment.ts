import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';

export const deleteComment = createAsyncThunk<
    string,
    number,
    ThunkConfig<string>
>('comment/deleteComment', async (id, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        await extra.api.delete(`/comment/delete/${id}`);
        
        return '';
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
