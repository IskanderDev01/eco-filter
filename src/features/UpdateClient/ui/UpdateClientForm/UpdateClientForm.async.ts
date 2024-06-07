import { FC, lazy } from 'react';
import { UpdateClientFormProps } from './UpdateClientForm'

export const UpdateClientFormAsync = lazy <FC<UpdateClientFormProps>>(
    () => import('./UpdateClientForm'),
);
