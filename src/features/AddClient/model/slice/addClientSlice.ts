import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientSchema } from '../types/CLientSchema';
import { addClient } from '../services/addClient/addClient';

const initialState: ClientSchema = {
    fullname: '',
    date: '',
    category: '',
    address: '',
    mobile: '',
    comment: '',
    isLoading: false,
};

export const addClientSlice = createSlice({
    name: 'addClient',
    initialState,
    reducers: {
        setFullname: (state, action: PayloadAction<string>) => {
            state.fullname = action.payload;
        },
        setCategory: (state, action: PayloadAction<string>) => {
            state.category = action.payload;
        },
        setComment: (state, action: PayloadAction<string>) => {
            state.comment = action.payload;
        },
        setDate: (state, action: PayloadAction<string>) => {
            state.date = action.payload;
        },
        setMobile: (state, action: PayloadAction<string>) => {
            state.mobile = action.payload;
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
