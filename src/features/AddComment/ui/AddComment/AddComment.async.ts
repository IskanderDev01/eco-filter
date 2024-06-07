import { FC, lazy } from 'react';
import { AddCommentFormProps } from './AddComment'

export const AddCommentFormAsync = lazy <FC<AddCommentFormProps>>(
    () => import('./AddComment'),
);
