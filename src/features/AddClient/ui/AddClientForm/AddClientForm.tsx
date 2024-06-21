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
    getAddClientDate,
    getAddClientFilter,
    getAddClientFirstFilterDate,
    getAddClientIsLoading,
    getAddClientMonth,
    getAddClientName,
    getAddClientPhone,
    getAddClientSecondFilterDate,
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
    const expiration_date = useSelector(getAddClientMonth);
    const validateErrors = useSelector(getValidateAddClientData);
    const [errorWindow, setErrorWindow] = useState(false);
    const created_at = useSelector(getAddClientDate);
    const first_date = useSelector(getAddClientFirstFilterDate);
    const second_date = useSelector(getAddClientSecondFilterDate);
    console.log(first_date)
    console.log(second_date)
    useEffect(() => {
        if (expiration_date.some((item) => item === '')) {
            dispatch(
                addClientActions.setMonthFilter(
                    expiration_date.filter((item) => item !== ''),
                ),
            );
        }
    }, [expiration_date]);

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
            dispatch(addClientActions.setMonthFilter(value.split(' ')));
        },
        [dispatch],
    );

    const onchangeDate = useCallback(
        (value: string) => {
            dispatch(addClientActions.setDate(value));
        },
        [dispatch],
    );

    const onchangeFilterDate1 = useCallback(
        (value: string) => {
            dispatch(addClientActions.setDateFilter1(value));
        },
        [dispatch],
    );
    const onchangeFilterDate2 = useCallback(
        (value: string) => {
            dispatch(addClientActions.setDateFilter2(value));
        },
        [dispatch],
    );

    const onLoginClick1 = useCallback(async () => {
        if(Boolean(created_at)) {
            setErrorWindow(true);
            const result = await dispatch(
                addClient({
                    address,
                    name,
                    phone,
                    category_id,
                    expiration_date,
                    created_at,
                    first_date,
                    second_date,
                }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onClose();
                dispatch(fetchAllClients());
                setErrorWindow(false);
            }
        }
        else{
            setErrorWindow(true);
            const result = await dispatch(
                addClient({
                    address,
                    name,
                    phone,
                    category_id,
                    expiration_date
                }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onClose();
                dispatch(fetchAllClients());
                setErrorWindow(false);
            }
        }
    }, [
        onClose,
        dispatch,
        name,
        address,
        phone,
        category_id,
        expiration_date,
        created_at,
        first_date,
        second_date,
    ]);

    const onLoginClick2 = useCallback(async () => {
        if(Boolean(created_at)) {
            setErrorWindow(true);
            const result = await dispatch(
                addClient({
                    address,
                    name,
                    phone,
                    category_id,
                    expiration_date,
                    first_date,
                    created_at,
                }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onClose();
                dispatch(fetchAllClients());
                setErrorWindow(false);
            }
        }
        else{
            setErrorWindow(true);
            const result = await dispatch(
                addClient({
                    address,
                    name,
                    phone,
                    category_id,
                    expiration_date,
                }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onClose();
                dispatch(fetchAllClients());
                setErrorWindow(false);
            }
        }
    }, [
        onClose,
        dispatch,
        name,
        address,
        phone,
        category_id,
        expiration_date,
        created_at,
        first_date,
    ]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.AddClientForm, {}, [className])}>
                <div className={cls.title}>Добавить клиента</div>
                <div className={cls.close} onClick={onClose}>
                    <FontAwesomeIcon
                        size="lg"
                        icon={faX}
                        className={cls.closeIcon}
                    />
                </div>
                {errorWindow &&
                    validateErrors?.map((error) => (
                        <div key={error} className={cls.error}>{error}</div>
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
                        placeholder="917777777"
                        className={cls.input}
                        onChange={onChangePhone}
                    />
                </div>
                <label htmlFor="date" className={cls.label}>
                    Дата клиента
                </label>
                <div className={cls.date}>
                    <Input
                        type="date"
                        id="date"
                        className={cls.input}
                        onChange={onchangeDate}
                    />
                </div>
                <label htmlFor="filter" className={cls.label}>
                    Категория
                </label>
                <select
                    className={cls.select}
                    onChange={(e) =>
                        dispatch(
                            addClientActions.setFilter(Number(e.target.value)),
                        )
                    }
                    name="категория"
                    id="filter"
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
                {category_id === 1 && Boolean(created_at) ? (
                    <>
                        <label htmlFor="datefilter1" className={cls.label}>
                            Укажите последнюю замену фильтра 1
                        </label>
                        <div className={cls.date}>
                            <Input
                                type="date"
                                id="datefilter1"
                                className={cls.input}
                                onChange={onchangeFilterDate1}
                            />
                        </div>
                        <label htmlFor="datefilter2" className={cls.label}>
                            Укажите последнюю замену фильтра 2
                        </label>
                        <div className={cls.date}>
                            <Input
                                type="date"
                                id="datefilter2"
                                className={cls.input}
                                onChange={onchangeFilterDate2}
                            />
                        </div>
                    </>
                ) : Boolean(created_at) ? (
                    <>
                        <label htmlFor="datefilter3" className={cls.label}>
                            Укажите последнюю замену фильтра
                        </label>
                        <div className={cls.date}>
                            <Input
                                type="date"
                                id="datefilter3"
                                className={cls.input}
                                onChange={onchangeFilterDate1}
                            />
                        </div>
                    </>
                )
                : ''
            }

                <label htmlFor="filter" className={cls.label}>
                    Месяц фильтра
                </label>
                <Input
                    type="text"
                    id="filter"
                    className={cls.input}
                    placeholder={category_id === 1 ? "_ _" : "_"}
                    onChange={onChangeMonthFilter}
                />
                {
                    category_id === 1 ? <Button
                    theme={ButtonTheme.BACKGROUND}
                    className={cls.loginBtn}
                    onClick={onLoginClick1}
                    disabled={isLoading}
                >
                    ДОБАВИТЬ
                </Button>
                : <Button
                theme={ButtonTheme.BACKGROUND}
                className={cls.loginBtn}
                onClick={onLoginClick2}
                disabled={isLoading}
            >
                ДОБАВИТЬ
            </Button>
                }
                
            </div>
        </DynamicModuleLoader>
    );
});

export default AddClientForm;
