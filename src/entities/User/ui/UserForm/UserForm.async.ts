import { FC, lazy } from 'react';
import { UserFormProps } from './UserForm'

export const UserFormFormAsync = lazy <FC<UserFormProps>>(
    () => import('./UserForm'),
);
