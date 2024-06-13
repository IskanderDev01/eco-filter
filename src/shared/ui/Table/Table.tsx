import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import {
    memo,
    useCallback,
    useMemo,
    useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCheck,
    faPencil,
    faTrash,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { Button, ButtonTheme } from '../Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Client } from 'pages/MainPage/model/types/client';
import { FILTER_ID, USER_ID } from 'shared/const/localstorage';
import { updateFilterStatus } from 'pages/MainPage/model/services/updateFilterStatus';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';
import { deleteClient } from 'pages/MainPage/model/services/deleteClient';
import { getUserFormData, fetchUserData, UserFormModal } from 'entities/User';
import { useSelector } from 'react-redux';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getAllClientsDays } from 'pages/MainPage/model/selectors/mainPageSelectors'

interface TableProps {
    className?: string;
    item: Client
}
const formatDate = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
    const year = date.getFullYear();
    
    return `${day}.${month}.${year}`;
};
export const Table = memo((props: TableProps) => {
    const { className, item } = props;
    const dispatch = useAppDispatch();
    const [checkOpen1, setCheckIsOpen1] = useState(false);
    const [checkOpen2, setCheckIsOpen2] = useState(false);
    const [deleteUserOpen, setDeleteUserOpen] = useState(false);
    const [isUpdateClientModal, setIsUpdateClientModal] = useState(false);
    const [userId, setUserId] = useState<number>(0);
    const formData = useSelector(getUserFormData);
    
    const formattedDate = useMemo(() => {
        const date = new Date(item?.created_at);
        return format(date, 'd MMMM yyyy', { locale: ru });
    }, []);
    const days = useSelector(getAllClientsDays)

    const onShowCheckModal1 = useCallback((id: number) => {
        setCheckIsOpen1(true);
        setCheckIsOpen2(false);
        localStorage.setItem(FILTER_ID, String(id));
    }, []);
    const onCloseCheckModal1 = useCallback(() => {
        setCheckIsOpen1(false);
    }, []);
    const onShowCheckModal2 = useCallback((id: number) => {
        setCheckIsOpen2(true);
        setCheckIsOpen1(false);
        localStorage.setItem(FILTER_ID, String(id));
    }, []);
    const onCloseCheckModal2 = useCallback(() => {
        setCheckIsOpen2(false);
    }, []);
    
    const checkFilterStatusTrue = useCallback(async () => {
        const res = await dispatch(updateFilterStatus());
        if (res.meta.requestStatus === 'fulfilled') {
            dispatch(fetchAllClients());
            setCheckIsOpen1(false);
            setCheckIsOpen2(false)
        }
    }, [dispatch]);

    const onShowdeleteUserModal = useCallback((id: number) => {
        setUserId(id);
        setDeleteUserOpen(true);
    }, []);

    const onClosedeleteUserModal = useCallback(() => {
        setDeleteUserOpen(false);
    }, []);

    const deleteUserConfirm = async () => {
        const res = await dispatch(deleteClient(userId));
        if(res.meta.requestStatus === 'fulfilled') {
            dispatch(fetchAllClients());
            setDeleteUserOpen(false);
        }
    };

    const onShowUpdateClientModal = useCallback(
        (id: number) => {
            setIsUpdateClientModal(true);
            localStorage.setItem(USER_ID, String(id));
            dispatch(fetchUserData(id));
        },
        [dispatch],
    );
    const onCloseUpdateClientModal = useCallback(() => {
        setIsUpdateClientModal(false);
    }, []); 

    return (
        <div
            className={classNames(cls.Table, {}, [
                className,
                cls[
                    days === 'today' || days === 'tomorrow' || days === 'expired'
                    ? item?.filters[0]?.status
                    : item?.filters[0]?.status === 'expired' || item?.filters[1]?.status === 'expired'
                    ? 'expired'
                    : item?.filters[0]?.status === 'be_changed' || item?.filters[1]?.status === 'be_changed'
                    ? 'be_changed'
                    : 'not_expired'
                ],
            ])}
        >
            <div className={cls.tbody}>
                <div>{item?.name}</div>
                <div>{item?.phone}</div>
                <div>{item?.address}</div>
                <div>{formattedDate}</div>
                <div>
                    {
                        days === 'today' || days === 'tomorrow' || days === 'expired'
                        ? item?.filters[0]?.expiration_date + ' мес.'
                        : item?.filters[1] === undefined
                        ? item?.filters[0]?.expiration_date + ' мес.'
                        : item?.filters[0]?.expiration_date + ' - ' + item?.filters[1]?.expiration_date + ' мес.'
                    }
                </div>
                <div className={cls.changed_at}>
                    {
                        days === 'today' || days === 'tomorrow' || days === 'expired'
                        ? item?.filters[1] === undefined
                        ? <div className={cls.flex}>
                            {item?.filters[0]?.expiration_date + ' мес-'+ formatDate(item?.filters[0]?.changed_at)}
                        </div> 
                        : <>
                            <div className={cls.flex}>
                                {item?.filters[0]?.expiration_date + ' мес-' + formatDate(item?.filters[0]?.changed_at)}
                            </div>
                            <div className={cls.flex}>
                                {item?.filters[1]?.expiration_date + ' мес-' + formatDate(item?.filters[1]?.changed_at)}
                            </div>
                        </>
                        : item?.filters[1] === undefined
                        ? <div className={cls.flex}>
                            {item?.filters[0]?.expiration_date + ' мес-' + formatDate(item?.filters[0]?.changed_at)}
                    </div>
                        : <>
                                <div className={cls.flex}>
                                    {item?.filters[0]?.expiration_date + ' мес-' + formatDate(item?.filters[0]?.changed_at)}
                                </div>
                                <div className={cls.flex}>
                                    {item?.filters[1]?.expiration_date + ' мес-' + formatDate(item?.filters[1]?.changed_at)}
                                </div>
                        </>
                    }
                </div>
                {
                    days === 'today' || days === 'tomorrow' 
                    ? ''
                    : item?.filters[1] === undefined
                    ? <div  className={cls.pastDays}>
                        {
                            item?.filters[0]?.status === 'expired'
                            ? 'тип ' + item?.filters[0]?.expiration_date + 'мес - '
                            + item?.filters[0]?.remaining_days + ' д'
                            : ''
                        }
                    </div>
                    : <div  className={cls.pastDays}>
                        <div>
                        {
                            item?.filters[0]?.status === 'expired'
                            ? 'тип ' + item?.filters[0]?.expiration_date + 'мес - '
                            + item?.filters[0]?.remaining_days + ' д'
                            : ''
                        }
                        </div>
                        <div className={cls.margin_top}>
                        {
                            item?.filters[1]?.status === 'expired'
                            ? 'тип ' + item?.filters[1]?.expiration_date + 'мес - '
                            + item?.filters[1]?.remaining_days + ' д'
                            : ''
                        }
                        </div>
                    </div>
                }
                <div className={cls.comment}>
                    {item?.description ?? 'нету комментария'}
                </div>
                <div className={cls.options}>
                    <div className={cls.column}>
                    {
                        item?.filters[0]?.status !== 'not_expired'
                        ? <>
                            <span>{item?.filters[0]?.expiration_date + '- '}</span>
                            <div
                                onClick={() => onShowCheckModal1(item.filters[0].id)}
                                className={cls.checkBtn}
                            >
                                <FontAwesomeIcon icon={faCheck} size="xs" />
                            </div>
                            </>  
                        : ''
                    }
                    {
                        item?.filters[1] === undefined
                        ? ''
                        :item?.filters[1]?.status !== 'not_expired'
                        ? <>
                            <span className={cls.margin_left}>{item?.filters[1]?.expiration_date + '- '}</span>
                            <div
                                onClick={() => onShowCheckModal2(item.filters[1].id)}
                                className={cls.checkBtn}
                            >
                                <FontAwesomeIcon icon={faCheck} size="xs" />
                            </div>
                            </>  
                        : ''
                    }
                    </div>
                    <div className={cls.column}>
                    <Button
                        theme={ButtonTheme.DELETE}
                        onClick={() => onShowdeleteUserModal(item?.id)}
                    >
                        <FontAwesomeIcon icon={faUser} size="sm" />
                        <FontAwesomeIcon icon={faTrash} size="sm" />
                    </Button>
                    <Button
                        theme={ButtonTheme.BACKGROUND}
                        className={cls.margin_left}
                        onClick={() => onShowUpdateClientModal(item?.id)}
                    >
                        <FontAwesomeIcon icon={faPencil} size="sm" />
                    </Button>
                    </div>
                    
                </div>
            </div>
            {checkOpen1 && (
                <div className={cls.confirmationCheck1}>
                    <div className={cls.title}>подтвердить?</div>
                    <div className={cls.confirm_btn}>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={checkFilterStatusTrue}
                        >
                            да
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={onCloseCheckModal1}
                            className={cls.margin_left}
                        >
                            нет
                        </Button>
                    </div>
                </div>
            )}
            {checkOpen2 && (
                <div className={cls.confirmationCheck2}>
                    <div className={cls.title}>подтвердить?</div>
                    <div className={cls.confirm_btn}>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={checkFilterStatusTrue}
                        >
                            да
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={onCloseCheckModal2}
                            className={cls.margin_left}
                        >
                            нет
                        </Button>
                    </div>
                </div>
            )}
            {deleteUserOpen && (
                <div className={cls.deleteUserOpen}>
                    <div className={cls.title}>вы точно хотите</div>
                    <div className={cls.title}> удалить клиента?</div>
                    <div className={cls.confirm_btn}>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={deleteUserConfirm}
                        >
                            да
                        </Button>
                        <Button
                            theme={ButtonTheme.BACKGROUND}
                            onClick={onClosedeleteUserModal}
                            className={cls.margin_left}
                        >
                            нет
                        </Button>
                    </div>
                </div>
            )}
            {isUpdateClientModal && (
                <UserFormModal
                    data={formData}
                    isOpen={isUpdateClientModal}
                    onClose={onCloseUpdateClientModal}
                />
            )}
        </div>
    );
});
