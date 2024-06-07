import { FC, lazy } from 'react';
import { AddFilterFormProps } from './AddFilter'

export const AddFilterFormAsync = lazy <FC<AddFilterFormProps>>(
    () => import('./AddFilter'),
);
