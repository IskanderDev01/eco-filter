import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback, useEffect, useState } from 'react';
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
    getAddClientFilter,
    getAddClientIsLoading,
    getAddClientMonth,
    getAddClientName,
    getAddClientPhone,
    getValidateAddClientData,
} from 'features/AddClient/model/selectors/addClientSelectors';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';

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
    const isLoading = useSelector(getAddClientIsLoading);
    const category_id = useSelector(getAddClientFilter);
    const expiration_date = useSelector(getAddClientMonth)
    const validateErrors = useSelector(getValidateAddClientData)
    const [errorWindow, setErrorWindow] = useState(false)
    useEffect(() => {
        if (expiration_date.some(item => item === '')) {
            dispatch(addClientActions.setMonthFilter(expiration_date.filter(item => item !== '')))
        }
        
    }, [expiration_date])

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

    const onChangeMonthFilter = useCallback(
        (value: string) => {
            dispatch(addClientActions.setMonthFilter(value.split(' ')))
        },
        [dispatch],
    );
    
    const onLoginClick = useCallback(async () => {
        setErrorWindow(true)
        const result = await dispatch(
            addClient({ address, name, phone, category_id, expiration_date }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            onClose();
            dispatch(fetchAllClients());
            setErrorWindow(false)
        }
    }, [onClose, dispatch, name, address, phone, category_id, expiration_date]);

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
                {errorWindow && validateErrors?.map( error => (
                    <div className={cls.error}>{error}</div>
                ))}
                <label htmlFor="fullname" className={cls.label}>
                    Имя
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
                <div className={cls.mobile}>
                    <span>+998</span>
                    <Input
                    type="text"
                    id="mobile"
                    placeholder='917777777'
                    className={cls.input}
                    onChange={onChangePhone}
                />
                </div>
                <label htmlFor="filter" className={cls.label}>
                    Фильтр
                </label>
                <select className={cls.select} onChange={e => dispatch(addClientActions.setFilter(Number(e.target.value)))} name="категория" id="filter">
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                <label htmlFor="filter" className={cls.label}>
                    Месяц фильтра
                </label>
                <Input
                    type="text"
                    id="filter"
                    className={cls.input}
                    placeholder='1 категория: 2 4, 2 категория: 5 или 6'
                    onChange={onChangeMonthFilter}
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
