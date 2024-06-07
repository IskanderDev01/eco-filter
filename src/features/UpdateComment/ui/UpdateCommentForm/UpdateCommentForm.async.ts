import { FC, lazy } from 'react';
import { UpdateCommentFormProps } from './UpdateCommentForm';

export const UpdateCommentFormAsync = lazy<FC<UpdateCommentFormProps>>(
    () => import('./UpdateCommentForm'),
);
