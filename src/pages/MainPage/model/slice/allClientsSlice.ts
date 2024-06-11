import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAllClients } from '../services/fetchAllClients';
import { AllClientsSchema } from 'pages/MainPage';

const initialState: AllClientsSchema = {
    clients: [],
    isLoading: true || false,
    error: undefined,
    days: '',
    search: '',
    total: 0,
    per_page: 5,
    current_page: 1,
    last_page: 1,
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
        setPage: (state, action: PayloadAction<number>) => {
            state.current_page = action.payload;
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
                (state, action) => {
                    state.isLoading = false;
                    state.clients = action.payload.data;
                    state.total = action.payload.total;
                    state.per_page = action.payload.per_page;
                    state.current_page = action.payload.current_page;
                    state.last_page = action.payload.last_page;
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
