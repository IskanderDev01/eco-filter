import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Input } from 'shared/ui/Input/Input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './AddCommentForm.module.scss';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    addFilterActions,
} from 'features/AddFilter/model/slice/addFilterSlice';
import {
    getAddComment,
    getAddCommentErorr,
    getAddCommentIsLoading,
} from 'features/AddComment/model/selectors/addCommentSelectors';
import { addComment } from 'features/AddComment/model/services/addComment'
import { addCommentActions, addCommentReducer, addCommentSlice } from 'features/AddComment/model/slice/addCommentSlice'
import { fetchUser } from 'pages/UserPage/models/services/fetchUser'
import { getUserId } from 'pages/UserPage/models/selectors/getUserSelector'

export interface AddCommentFormProps {
    className?: string;
    order_id: number;
    onClose: () => void;
}

const initialReducers: ReducersList = {
    comment: addCommentReducer,
};

const AddComment = memo(
    ({ className, onClose, order_id }: AddCommentFormProps) => {
        const dispatch = useAppDispatch();
        const comment = useSelector(getAddComment);
        const error = useSelector(getAddCommentErorr);
        const isLoading = useSelector(getAddCommentIsLoading);
        const userId = useSelector(getUserId)

        const onChangeComment = useCallback(
            (value: string) => {
                dispatch(addCommentActions.setComment(value));
            },
            [dispatch],
        );
        const onLoginClick = useCallback(async () => {
            const result = await dispatch(
                addComment({ order_id, comment }),
            );
            if (result.meta.requestStatus === 'fulfilled') {
                onClose();
                dispatch(fetchUser(userId));
            }
        }, [onClose, dispatch, order_id, comment]);

        return (
            <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                <div className={classNames(cls.AddCommentForm, {}, [className])}>
                    <div className={cls.title}>Добавить комментарий</div>
                    <div className={cls.close} onClick={onClose}>
                        <FontAwesomeIcon
                            size="xl"
                            icon={faX}
                            className={cls.closeIcon}
                        />
                    </div>
                    {error && <div className={cls.error}>Ошибка</div>}
                    <label htmlFor="comment" className={cls.label}>
                        Комментарий
                    </label>
                    <Input
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
    },
);

export default AddComment;
