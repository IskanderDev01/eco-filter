import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateClientShema } from '../types/CLientSchema';
import { updateClient } from '../services/updateClient'

const initialState: UpdateClientShema = {
    error: '',
    id: 0,
    name: '',
    isLoading: false,
};

export const updateClientSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateClient.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateClient.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: updateClientActions } = updateClientSlice;
export const { reducer: updateClientReducer } = updateClientSlice;
