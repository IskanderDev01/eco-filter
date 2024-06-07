import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserSchema } from '../types/UserSchema';
import { fetchUser } from '../services/fetchUser';
import { User } from '../types/user';

const initialState: UserSchema = {
    user: {
        id: 0,
        name: '',
        address: '',
        phone: '',
        orders: [],
    },
    isLoading: true || false,
    error: undefined,
    id: 1,
};

const userSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchUser.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.user = action.payload;
                },
            )
            .addCase(fetchUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: userSliceActions } = userSlice;
export const { reducer: userSliceReducer } = userSlice;
