import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserData, updateUserData } from 'entities/User';
import { User, UserShema } from '../types/user'

const initialState: UserShema = {
    error: undefined,
    isLoading: false,
    data: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        cancelEdit: (state) => {
            state.form = state.data;
        },
        updateUser: (state, action: PayloadAction<User>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchUserData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(fetchUserData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(
                updateUserData.fulfilled,
                (state, action: PayloadAction<User>) => {
                    state.isLoading = false;
                    state.data = action.payload;
                    state.form = action.payload;
                },
            )
            .addCase(updateUserData.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
