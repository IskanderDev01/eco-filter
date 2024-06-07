import { classNames } from 'shared/lib/classNames/classNames';
import cls from './UserPage.module.scss';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
    getUser,
    getUserId,
    getUserIsLoading,
} from 'pages/UserPage/models/selectors/getUserSelector';
import { useCallback, useEffect, useState } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { userSliceReducer } from 'pages/UserPage/models/slice/userSlice';
import { fetchUser } from 'pages/UserPage/models/services/fetchUser';
import { Loader } from 'shared/ui/Loader/Loader';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { deleteFilter } from 'features/AddFilter/model/services/deleteFilter';
import { filterChanged } from 'features/AddFilter/model/services/filterChanged';
import { AddFilterModal } from 'features/AddFilter/ui/AddFilterModal/AddFilterModal';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteComment } from 'features/AddComment/model/services/deleteComment';
import { AddCommentModal } from 'features/AddComment/ui/AddCommentModal/AddCommentModal';
import { getAddCommentOrderId } from 'features/AddComment/model/selectors/addCommentSelectors';
import { addCommentActions } from 'features/AddComment/model/slice/addCommentSlice';
import { deleteClient } from 'features/AddClient/model/services/addClient/deleteClient';
import { useNavigate } from 'react-router-dom';
import { UpdateClientModal } from 'features/UpdateClient/ui/UpdateClientModal/UpdateClientModal';
import { updateClientActions } from 'features/UpdateClient/model/slice/updateClientShema';
import { UpdateCommentModal } from 'features/UpdateComment/ui/UpdateCommentModal/UpdateCommentModal'
import { updateCommentActions } from 'features/UpdateComment/model/slice/updateCommentSlice'
import { COMMENTID } from 'shared/const/localstorage'

interface UserPageProps {
    className?: string;
}
const reducers: ReducersList = {
    user: userSliceReducer,
};

const UserPage = (props: UserPageProps) => {
    const { className } = props;
    const navigate = useNavigate();
    const [isFilterModal, setIsFilterModal] = useState(false);
    const [isCommenModal, setIsCommentModal] = useState(false);
    const [isUpdateClientModal, setIsUpdateClientModal] = useState(false);
    const [isUpdateCommentModal, setIsUpdateCommentModal] = useState(false);
    const [order_id, setOrderId] = useState(0);
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getUserIsLoading);
    const user = useSelector(getUser);
    const userId = useSelector(getUserId);
    const userID = localStorage.getItem('userId');

    useEffect(() => {
        dispatch(fetchUser(Number(userID)));
    }, [dispatch, userID]);

    const onCloseUpdateClientModal = useCallback(() => {
        setIsUpdateClientModal(false);
    }, []);
    const onCloseUpdateCommentModal = useCallback(() => {
        setIsUpdateCommentModal(false);
    }, []);
    const onCloseFilterModal = useCallback(() => {
        setIsFilterModal(false);
    }, []);
    const onCloseCommentModal = useCallback(() => {
        setIsCommentModal(false);
    }, []);
    const onShowFilterModal = useCallback(() => {
        setIsFilterModal(true);
    }, []);
    const onShowCommentModal = useCallback((id: number) => {
        setOrderId(id);
        setIsCommentModal(true);
    }, []);
    const onShowUpdateClientModal = useCallback(() => {
        dispatch(updateClientActions.setId(Number(userID)));
        setIsUpdateClientModal(true);
    }, []);
    const onShowUpdateCommentModal = useCallback((id: number) => {
        dispatch(updateCommentActions.setId(id));
        localStorage.setItem(COMMENTID, String(id));
        setIsUpdateCommentModal(true);
    }, []);

    const changedFilter = (id: number) => {
        dispatch(filterChanged(id));
        dispatch(fetchUser(userId));
    };
    const deleteOrder = (id: number) => {
        dispatch(deleteFilter(id));
        dispatch(fetchUser(userId));
    };
    const deleteComments = (id: number) => {
        dispatch(deleteComment(id));
        dispatch(fetchUser(userId));
    };
    const deleteUser = () => {
        dispatch(deleteClient(Number(userID)));
        navigate(-1);
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.UserPage, {}, [className])}>
                {isLoading ? (
                    <Loader className={cls.loader} />
                ) : (
                    <div>
                        <div className={cls.btn_add}>
                            <Button
                                theme={ButtonTheme.BACKGROUND}
                                onClick={onShowUpdateClientModal}
                            >
                                Изменить
                            </Button>
                            <Button
                                theme={ButtonTheme.DELETE}
                                onClick={deleteUser}
                            >
                                Удалить клиента
                            </Button>
                            <Button
                                theme={ButtonTheme.BACKGROUND}
                                onClick={onShowFilterModal}
                            >
                                Добавить фильтр
                            </Button>
                        </div>

                        <div className={cls.user}>
                            <div>
                                <span>Имя:</span>
                                {user?.name}
                            </div>
                            <div>
                                <span>Телефон:</span>
                                {user?.phone}
                            </div>
                            <div>
                                <span>Адрес:</span>
                                {user?.address}
                            </div>
                        </div>

                        {user?.orders.map((orders) => (
                            <div className={cls.filter} key={orders.id}>
                                <div className={cls.status}>
                                    <span>Статус:</span>
                                    {orders.status}
                                </div>
                                {orders.filters.map((filter) => (
                                    <div
                                        key={filter.id}
                                        className={cls.filter_info}
                                    >
                                        <div>
                                            <span>Фильтр:</span>
                                            {filter.expiration_date} месяц
                                        </div>
                                        <div>
                                            <span>Дата Заказа:</span>
                                            {filter.ordered_at}
                                        </div>
                                        <div>
                                            <span>Был изменен в:</span>
                                            {filter.changed_at}
                                        </div>
                                    </div>
                                ))}
                                {orders.comments.map((comments) => (
                                    <div
                                        key={comments.id}
                                        className={cls.comments}
                                    >
                                        <div>
                                            <span>Комментарий:</span>
                                            {comments.comment}
                                        </div>
                                        <Button
                                            theme={ButtonTheme.DELETE}
                                            onClick={() =>
                                                deleteComments(comments.id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </Button>
                                        <Button theme={ButtonTheme.BACKGROUND} onClick={() => onShowUpdateCommentModal(comments.id)}>
                                            Изменить
                                        </Button>
                                    </div>
                                ))}
                                <div className={cls.options}>
                                    {orders.status === 'active' && (
                                        <Button
                                            theme={ButtonTheme.DELETE}
                                            onClick={() =>
                                                deleteOrder(orders.id)
                                            }
                                        >
                                            Удалить фильтр
                                        </Button>
                                    )}
                                    {orders.status === 'deleted' && (
                                        <Button
                                            theme={ButtonTheme.BACKGROUND}
                                            onClick={() =>
                                                changedFilter(orders.id)
                                            }
                                        >
                                            Изменить Статус
                                        </Button>
                                    )}
                                    <Button
                                        theme={ButtonTheme.BACKGROUND}
                                        onClick={() =>
                                            onShowCommentModal(orders.id)
                                        }
                                    >
                                        Добавить комментарий
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {isUpdateCommentModal && (
                    <UpdateCommentModal
                        isOpen={isUpdateCommentModal}
                        onClose={onCloseUpdateCommentModal}
                    />
                )}
                {isUpdateClientModal && (
                    <UpdateClientModal
                        isOpen={isUpdateClientModal}
                        onClose={onCloseUpdateClientModal}
                    />
                )}
                {isCommenModal && (
                    <AddCommentModal
                        order_id={order_id}
                        isOpen={isCommenModal}
                        onClose={onCloseCommentModal}
                    />
                )}
                {isFilterModal && (
                    <AddFilterModal
                        user_id={userId}
                        isOpen={isFilterModal}
                        onClose={onCloseFilterModal}
                    />
                )}
            </div>
        </DynamicModuleLoader>
    );
};

export default UserPage;
