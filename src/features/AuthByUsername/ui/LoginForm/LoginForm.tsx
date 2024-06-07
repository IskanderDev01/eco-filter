import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import {
    getLoginEmail,
    getLoginErorr,
    getLoginIsLoading,
    getLoginPassword,
} from '../../model/selectors/getLoginState/getLoginState';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

export interface LoginFormProps {
    className?: string;
}
const initialReducers: ReducersList = {
    login: loginReducer,
};
const LoginForm = memo(({ className }: LoginFormProps) => {
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginErorr);

    const onChangeEmail = useCallback(
        (value: string) => {
            dispatch(loginActions.setEmail(value));
        },
        [dispatch],
    );
    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            location.reload();
        }
    }, [dispatch, email, password]);
    
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <div className={cls.title}>Регистрация</div>
                {error && (
                    <div className={cls.error}>Вы ввели неверное данное</div>
                )}
                <label htmlFor="email" className={cls.label}>
                    Email
                </label>
                <Input
                    type="email"
                    id="email"
                    className={cls.input}
                    onChange={onChangeEmail}
                />
                <label htmlFor="password" className={cls.label}>
                    Password
                </label>
                <Input
                    type="password"
                    id="password"
                    className={cls.input}
                    onChange={onChangePassword}
                />
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    регистрация
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
