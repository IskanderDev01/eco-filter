import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommentShema } from '../types/CommentShema'
import { addComment } from '../services/addComment'

const initialState: CommentShema = {
    order_id: 0,
    comment: '',
    isLoading: false,
};

export const addCommentSlice = createSlice({
    name: 'addComment',
    initialState,
    reducers: {
        setOrderId: (state, action: PayloadAction<number>) => {
            state.order_id= action.payload;
        },
        setComment: (state, action: PayloadAction<string>) => {
            state.comment = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addComment.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(addComment.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(addComment.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: addCommentActions } = addCommentSlice;
export const { reducer: addCommentReducer } = addCommentSlice;
