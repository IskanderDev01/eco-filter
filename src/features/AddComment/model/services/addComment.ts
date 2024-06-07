import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { Comment } from '../types/comment';

interface AddCommentProps {
    order_id: number;
    comment?: string;
}

export const addComment = createAsyncThunk<
    Comment,
    AddCommentProps,
    ThunkConfig<string>
>('add/addComment', async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    try {
        const response = await extra.api.post('/comment/create', authData);
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
