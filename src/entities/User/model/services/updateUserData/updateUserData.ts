import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserFormData } from '../../selectors/userSelectors';
import { ThunkConfig } from 'app/providers/StoreProvider/config/StateSchema';
import { User } from '../../types/user';

export const updateUserData = createAsyncThunk<
    User,
    void,
    ThunkConfig<string>
>('user/updateUserData', async (_, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const formData = getUserFormData(getState());

    try {
        const response = await extra.api.put<User>(
            `/user/update/${formData?.id}`,
            formData,
        );
        console.log(formData?.id)

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
