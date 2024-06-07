import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterSchema } from '../types/FiltersSchema'
import { addFilter } from '../services/addFilter'

const initialState: FilterSchema = {
    user_id: 0,
    address: '',
    category_id: 0,
    isLoading: false,
};

export const addFilterSlice = createSlice({
    name: 'addFilter',
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<number>) => {
            state.user_id= action.payload;
        },
        setCategoryId: (state, action: PayloadAction<number>) => {
            state.category_id = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addFilter.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addFilter.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addFilter.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: addFilterActions } = addFilterSlice;
export const { reducer: addFilterReducer } = addFilterSlice;
