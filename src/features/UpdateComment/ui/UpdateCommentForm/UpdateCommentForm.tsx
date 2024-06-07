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
import { getUpdateClientError, getUpdateClientIsLoading, getUpdateClientName } from 'features/UpdateClient/model/selectors/updateClientSelectors'
import { fetchUser } from 'pages/UserPage/models/services/fetchUser'
import { getUserId } from 'pages/UserPage/models/selectors/getUserSelector'
import { updateClient } from 'features/UpdateClient/model/services/updateClient'
import { updateClientActions, updateClientReducer } from 'features/UpdateClient/model/slice/updateClientShema'
import { updateCommentActions, updateCommentReducer } from 'features/UpdateComment/model/slice/updateCommentSlice'
import { getUpdateComment, getUpdateCommentError, getUpdateCommentIsLoading } from 'features/UpdateComment/model/selectors/updateCommentSelectors'
import { updateComment } from 'features/UpdateComment/model/services/updateComment'

export interface UpdateCommentFormProps {
    className?: string;
    onClose: () => void;
}

const initialReducers: ReducersList = {
    updateComment: updateCommentReducer,
};

const UpdateCommentForm = memo(({ className, onClose }: UpdateCommentFormProps) => {
    const dispatch = useAppDispatch();
    const comment = useSelector(getUpdateComment);
    const error = useSelector(getUpdateCommentError);
    const isLoading = useSelector(getUpdateCommentIsLoading);
    const userID = localStorage.getItem('userId');

    const onChangeComment = useCallback(
        (value: string) => {
            dispatch(updateCommentActions.setComment(value));
        },
        [dispatch],
    );

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(updateComment({comment}));
        if (result.meta.requestStatus === 'fulfilled') {
            onClose();
            dispatch(fetchUser(Number(userID)));
        }
    }, [onClose, dispatch, comment]);

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.AddClientForm, {}, [className])}>
                <div className={cls.title}>Изменить комментарий</div>
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
                    комментарий
                </label>
                <Input
                    type="text"
                    id="fullname"
                    className={cls.input}
                    onChange={onChangeComment}
                />
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    Изменить
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});

export default UpdateCommentForm;
