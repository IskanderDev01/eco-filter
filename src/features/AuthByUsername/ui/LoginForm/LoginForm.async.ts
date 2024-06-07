import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LogintFormAsync = lazy <FC<LoginFormProps>>(
    () => import('./LoginForm'),
);
