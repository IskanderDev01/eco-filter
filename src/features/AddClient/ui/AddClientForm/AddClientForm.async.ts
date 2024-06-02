import { FC, lazy } from 'react';
import { AddClientFormProps } from './AddClientForm'

export const AddClientFormAsync = lazy <FC<AddClientFormProps>>(
    () => import('./AddClientForm'),
);
