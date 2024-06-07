import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { memo, useCallback } from 'react';
import { Client } from 'pages/MainPage/model/types/client';
import { useDispatch } from 'react-redux';
import { userSliceActions } from 'pages/UserPage/models/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { USERID } from 'shared/const/localstorage'

interface TableProps {
    className?: string;
    item: Client;
}

export const Table = memo((props: TableProps) => {
    const { className, item } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setUserId = useCallback(
        (userId: number) => {
            dispatch(userSliceActions.setUserId(userId));
            console.log(userId);
            navigate('/user');
            localStorage.setItem(USERID, String(userId))
        },
        [dispatch],
    );

    return (
        <div className={classNames(cls.Table, {}, [className])}>
            <div className={cls.tbody} onClick={() => setUserId(item.id)}>
                <div>{item.name}</div>
                <div>{item.phone}</div>
                <div>{item.address}</div>
                <div>{item.created_at}</div>
            </div>
        </div>
    );
});
