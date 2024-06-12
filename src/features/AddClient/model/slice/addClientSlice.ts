import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClientSchema, ValidateAddClientError } from '../types/CLientSchema';
import { addClient } from '../services/addClient/addClient';

const initialState: ClientSchema = {
    name: '',
    address: '',
    phone: '',
    expiration_date: [],
    validateErrors: null,
    category_id: 1,
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
        setFilter: (state, action: PayloadAction<number>) => {
            state.category_id = action.payload;
        },
        setMonthFilter: (state, action: PayloadAction<Array<string>>) => {
            state.expiration_date = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addClient.pending, (state) => {
                state.validateErrors = null;
                state.isLoading = true;
            })
            .addCase(addClient.fulfilled, (state) => {
                state.isLoading = false;
                state.validateErrors = undefined;
            })
            .addCase(addClient.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

export const { actions: addClientActions } = addClientSlice;
export const { reducer: addClientReducer } = addClientSlice;
