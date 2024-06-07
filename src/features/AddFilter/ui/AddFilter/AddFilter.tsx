import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddClientForm.module.scss';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getAllClientsIsLoading } from 'pages/MainPage/model/selectors/mainPageSelectors';
import { addFilterActions, addFilterReducer } from 'features/AddFilter/model/slice/addFilterSlice'
import { getAddFilterAddress, getAddFilterCategoryId, getAddFilterErorr } from 'features/AddFilter/model/selectors/addFilterSelectors'
import { addFilter } from 'features/AddFilter/model/services/addFilter'
import { getUserId } from 'pages/UserPage/models/selectors/getUserSelector'
import { fetchUser } from 'pages/UserPage/models/services/fetchUser'

export interface AddFilterFormProps {
    className?: string;
    user_id: number;
    onClose: () => void;
}

const initialReducers: ReducersList = {
    filter: addFilterReducer,
};

const AddFilterForm = memo(({ className, onClose, user_id }: AddFilterFormProps) => {
    const dispatch = useAppDispatch();
    const category_id = useSelector(getAddFilterCategoryId)
    const address = useSelector(getAddFilterAddress);
    const error = useSelector(getAddFilterErorr);
    const isLoading = useSelector(getAllClientsIsLoading);
    const userId = useSelector(getUserId)

    const onChangeAddress = useCallback(
        (value: string) => {
            dispatch(addFilterActions.setAddress(value));
        },
        [dispatch],
    );
    const onChangeCategoryId = useCallback(
        (value: number) => {
            dispatch(addFilterActions.setCategoryId(value));
        },
        [dispatch],
    );
    const onLoginClick = useCallback(async () => {
        const result = await dispatch(addFilter({ user_id, category_id, address }));
        if (result.meta.requestStatus === 'fulfilled') {
            dispatch(fetchUser(userId));
            onClose();
        }
    }, [onClose, dispatch, category_id, address, user_id, userId]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.AddClientForm, {}, [className])}>
                <div className={cls.title}>Добавить фильтр</div>
                <div className={cls.close} onClick={onClose}>
                    <FontAwesomeIcon
                        size="xl"
                        icon={faX}
                        className={cls.closeIcon}
                    />
                </div>
                {error && (
                    <div className={cls.error}>Ошибка</div>
                )}
                <label htmlFor="address" className={cls.label}>
                    Категория
                </label>
                <Input
                    type="text"
                    id="address"
                    className={cls.input}
                    onChange={onChangeCategoryId}
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

export default AddFilterForm;
