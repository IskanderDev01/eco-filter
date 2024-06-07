import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientSchema } from '../types/CLientSchema';
import { addClient } from '../services/addClient/addClient';

const initialState: ClientSchema = {
    name: '',
    address: '',
    phone: '',
    isLoading: false,
};

export const addClientSlice = createSlice({
    name: 'addClient',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setPhone: (state, action: PayloadAction<string>) => {
            state.phone = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addClient.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addClient.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addClient.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: addClientActions } = addClientSlice;
export const { reducer: addClientReducer } = addClientSlice;
