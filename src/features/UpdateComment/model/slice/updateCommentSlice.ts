import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UpdateCommentShema } from '../types/UpdateCommentShema'
import { updateComment } from '../services/updateComment'

const initialState:  UpdateCommentShema = {
    error: '',
    id: 0,
    comment: '',
    isLoading: false,
};

export const updateCommentSlice = createSlice({
    name: 'update',
    initialState,
    reducers: {
        setComment: (state, action: PayloadAction<string>) => {
            state.comment = action.payload;
        },
        setId: (state, action: PayloadAction<number>) => {
            state.id = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateComment.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateComment.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: updateCommentActions } = updateCommentSlice;
export const { reducer: updateCommentReducer } = updateCommentSlice;
