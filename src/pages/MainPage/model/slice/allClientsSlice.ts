import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllClients } from '../services/fetchAllClients';
import { Client } from '../types/client';
import { AllClientsSchema } from 'pages/MainPage';

const initialState: AllClientsSchema = {
    clients: [],
    isLoading: true || false,
    error: undefined,
    days: 'All',
    search: '',
};

const allClientsSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setDays: (state, action: PayloadAction<string>) => {
            state.days = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllClients.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(
                fetchAllClients.fulfilled,
                (state, action: PayloadAction<Client[]>) => {
                    state.isLoading = false;
                    state.clients = action.payload;
                },
            )
            .addCase(fetchAllClients.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: allClientsSliceActions } = allClientsSlice;
export const { reducer: allClientsSliceReducer } = allClientsSlice;
