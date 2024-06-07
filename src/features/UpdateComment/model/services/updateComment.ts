import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { getUpdateCommentId } from '../selectors/updateCommentSelectors'

interface UpdateCommentProps {
    comment: string
}

export const updateComment = createAsyncThunk<
    string,
    UpdateCommentProps,
    ThunkConfig<string>
>('update/updateComment', async (authData, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;
    const id = localStorage.getItem('commentId')

    try {
        const response = await extra.api.put(`/comment/update/${id}`, authData)
        if (!response.data) {
            throw new Error();
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
