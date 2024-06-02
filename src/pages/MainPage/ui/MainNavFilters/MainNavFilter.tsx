import { classNames } from 'shared/lib/classNames/classNames';
import { memo, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { allClientsSliceActions } from 'pages/MainPage/model/slice/allClientsSlice';
import cls from './MainNavFilter.module.scss';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';

interface MainNavFilterProps {
    className?: string;
}

export const MainNavFilter = memo((props: MainNavFilterProps) => {
    const dispatch = useAppDispatch();
    const { className } = props;

    const fetchData = useCallback(() => {
        dispatch(fetchAllClients());
    }, [dispatch]);

    const filterAll = useCallback(() => {
        dispatch(allClientsSliceActions.setDays('All'));
        fetchData();
    }, [dispatch]);
    const filterToday = useCallback(() => {
        dispatch(allClientsSliceActions.setDays('Today'));
        fetchData();
    }, [dispatch]);
    const filterTomorrow = useCallback(() => {
        dispatch(allClientsSliceActions.setDays('Tomorrow'));
        fetchData();
    }, [dispatch]);
    const filterPast = useCallback(() => {
        dispatch(allClientsSliceActions.setDays('Past'));
        fetchData();
    }, [dispatch]);

    return (
        <div className={classNames(cls.MainNavFilter, {}, [className])}>
            <div className={cls.filters}>
                <div onClick={filterAll}>Все</div>
                <div onClick={filterToday}>сегодня</div>
                <div onClick={filterTomorrow}>завтра</div>
                <div onClick={filterPast}>прошедшие</div>
            </div>
        </div>
    );
});
