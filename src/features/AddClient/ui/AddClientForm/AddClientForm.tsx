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
    getAddClientComment,
    getAddClientFullname,
    getAddClientMobile,
    getAddClientError,
    getAddClientCategory,
} from 'features/AddClient/model/selectors/addClientSelectors';
import {
    getAllClientsDays,
    getAllClientsIsLoading,
} from 'pages/MainPage/model/selectors/mainPageSelectors';

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
    const category = useSelector(getAddClientCategory);
    const comment = useSelector(getAddClientComment);
    const date = useSelector(getAllClientsDays);
    const fullname = useSelector(getAddClientFullname);
    const mobile = useSelector(getAddClientMobile);
    const error = useSelector(getAddClientError);
    const isLoading = useSelector(getAllClientsIsLoading);

    const onChangeFullname = useCallback(
        (value: string) => {
            dispatch(addClientActions.setFullname(value));
        },
        [dispatch],
    );

    const onChangeDate = useCallback(
        (value: string) => {
            dispatch(addClientActions.setDate(value));
        },
        [dispatch],
    );

    const onChangeCategory = useCallback(
        (value: string) => {
            dispatch(addClientActions.setCategory(value));
        },
        [dispatch],
    );

    const onChangeAddress = useCallback(
        (value: string) => {
            dispatch(addClientActions.setAddress(value));
        },
        [dispatch],
    );
    const onChangeMobile = useCallback(
        (value: string) => {
            dispatch(addClientActions.setMobile(value));
        },
        [dispatch],
    );
    const onChangeComment = useCallback(
        (value: string) => {
            dispatch(addClientActions.setComment(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(
            addClient({ address, category, comment, date, fullname, mobile }),
        );
        if (result.meta.requestStatus === 'fulfilled') {
            onClose();
        }
    }, [onClose, dispatch, fullname, address, category, comment, date, mobile]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.AddClientForm, {}, [className])}>
                <div className={cls.title}>Добавить клиента</div>
                <div className={cls.close} onClick={onClose}>
                    <FontAwesomeIcon size="xl" icon={faX} className={cls.closeIcon}/>
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
                    onChange={onChangeFullname}
                />
                <label htmlFor="date" className={cls.label}>
                    Дата
                </label>
                <Input
                    type="date"
                    id="date"
                    className={cls.input}
                    onChange={onChangeDate}
                />
                <label htmlFor="category" className={cls.label}>
                    Категория
                </label>
                <Input
                    type="text"
                    id="date"
                    className={cls.input}
                    onChange={onChangeCategory}
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
                    onChange={onChangeMobile}
                />
                <label htmlFor="comment" className={cls.label}>
                    Комментарий
                </label>
                <Input
                    value={comment}
                    type="text"
                    id="comment"
                    className={cls.input}
                    onChange={onChangeComment}
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
