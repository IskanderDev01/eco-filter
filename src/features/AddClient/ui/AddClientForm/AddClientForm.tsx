import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddClientForm.module.scss';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addClient } from 'features/AddClient/model/services/addClient/addClient';
import {
    addClientActions,
    addClientReducer,
} from 'features/AddClient/model/slice/addClientSlice';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    getAddClientAddress,
    getAddClientError,
    getAddClientName,
    getAddClientPhone,
} from 'features/AddClient/model/selectors/addClientSelectors';
import { getAllClientsIsLoading } from 'pages/MainPage/model/selectors/mainPageSelectors';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients'

export interface AddClientFormProps {
    className?: string;
    onClose: () => void;
}

const initialReducers: ReducersList = {
    addClientForm: addClientReducer,
};

const AddClientForm = memo(({ className, onClose }: AddClientFormProps) => {
    const dispatch = useAppDispatch();
    const address = useSelector(getAddClientAddress);
    const name = useSelector(getAddClientName);
    const phone = useSelector(getAddClientPhone);
    const error = useSelector(getAddClientError);
    const isLoading = useSelector(getAllClientsIsLoading);

    const onChangeName = useCallback(
        (value: string) => {
            dispatch(addClientActions.setName(value));
        },
        [dispatch],
    );

    const onChangeAddress = useCallback(
        (value: string) => {
            dispatch(addClientActions.setAddress(value));
        },
        [dispatch],
    );
    const onChangePhone = useCallback(
        (value: string) => {
            dispatch(addClientActions.setPhone(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(addClient({ address, name, phone }));
        if (result.meta.requestStatus === 'fulfilled') {
            onClose();
            dispatch(fetchAllClients())
        }
    }, [onClose, dispatch, name, address, phone]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.AddClientForm, {}, [className])}>
                <div className={cls.title}>Добавить клиента</div>
                <div className={cls.close} onClick={onClose}>
                    <FontAwesomeIcon
                        size="xl"
                        icon={faX}
                        className={cls.closeIcon}
                    />
                </div>
                {error && (
                    <div className={cls.error}>Вы ввели неверное данное</div>
                )}
                <label htmlFor="fullname" className={cls.label}>
                    Полное имя
                </label>
                <Input
                    type="text"
                    id="fullname"
                    className={cls.input}
                    onChange={onChangeName}
                />
                <label htmlFor="address" className={cls.label}>
                    Адрес
                </label>
                <Input
                    type="text"
                    id="address"
                    className={cls.input}
                    onChange={onChangeAddress}
                />
                <label htmlFor="mobile" className={cls.label}>
                    Мобильный номер
                </label>
                <Input
                    type="text"
                    id="mobile"
                    className={cls.input}
                    onChange={onChangePhone}
                />
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    ДОБАВИТЬ
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default AddClientForm;
