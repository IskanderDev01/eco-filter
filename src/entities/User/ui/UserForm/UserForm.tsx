import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import cls from './UserForm.module.scss';
import {
    getUserError,
    getUserIsLoading,
} from 'entities/User/model/selectors/userSelectors';
import { useSelector } from 'react-redux';
import { userActions, userReducer } from 'entities/User/model/slice/userSlice';
import { useCallback } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { updateUserData } from 'entities/User/model/services/updateUserData/updateUserData';
import { User } from 'entities/User/model/types/user';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';

export interface UserFormProps {
    className?: string;
    onClose: () => void;
    data?: User;
}

const initialReducers: ReducersList = {
    user: userReducer,
};

const UserForm = (props: UserFormProps) => {
    const { className, onClose, data } = props;
    const dispatch = useAppDispatch();
    const error = useSelector(getUserError);
    const isLoading = useSelector(getUserIsLoading);

    const onChaneName = useCallback(
        (value?: string) => {
            dispatch(userActions.updateUser({ name: value || '' }));
        },
        [dispatch],
    );
    const onChangePhone = useCallback(
        (value?: string) => {
            dispatch(userActions.updateUser({ phone: value || '' }));
        },
        [dispatch],
    );
    const onChangeAddress = useCallback(
        (value?: string) => {
            dispatch(userActions.updateUser({ address: value || '' }));
        },
        [dispatch],
    );
    const onChaneComment = useCallback(
        (value?: string) => {
            dispatch(userActions.updateUser({ description: value || '' }));
        },
        [dispatch],
    );
    const onCancelEdit = useCallback(() => {
        onClose();
    }, [dispatch]);

    const onSave = useCallback(async () => {
        const res = await dispatch(updateUserData());
        if (res.meta.requestStatus === 'fulfilled') {
            onClose();
            dispatch(fetchAllClients());
        }
    }, [dispatch]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.UserForm, {}, [className])}>
                <div className={cls.title}>Изменить</div>
                <div className={cls.close} onClick={onClose}>
                    <FontAwesomeIcon
                        size="xl"
                        icon={faX}
                        className={cls.closeIcon}
                    />
                </div>
                {error && (
                    <div className={cls.error}>Введен неверное данное</div>
                )}
                <div className={cls.data}>
                    <label htmlFor="name">имя</label>
                    <Input
                        value={data?.name ?? ''}
                        id="name"
                        className={cls.input}
                        onChange={onChaneName}
                    />
                    <label htmlFor="phone">телефон</label>
                    <Input
                        value={data?.phone ?? ''}
                        id="phone"
                        className={cls.input}
                        onChange={onChangePhone}
                    />
                    <label htmlFor="address">адрес</label>
                    <Input
                        value={data?.address ?? ''}
                        id="address"
                        className={cls.input}
                        onChange={onChangeAddress}
                    />
                    <label htmlFor="comment">Комментарий</label>
                    <Input
                        value={data?.description ?? ''}
                        id="comment"
                        className={cls.input}
                        onChange={onChaneComment}
                    />
                    <Button
                        className={cls.loginBtn}
                        theme={ButtonTheme.BACKGROUND}
                        disabled={isLoading}
                        onClick={onSave}
                    >
                        Сохранить
                    </Button>
                    <Button
                        className={cls.loginBtn}
                        theme={ButtonTheme.BACKGROUND}
                        onClick={onCancelEdit}
                    >
                        Отменить
                    </Button>
                </div>
            </div>
        </DynamicModuleLoader>
    );
};

export default UserForm;
