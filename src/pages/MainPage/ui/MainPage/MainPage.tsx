import { Table } from 'shared/ui/Table/Table';
import { memo, useEffect, useState } from 'react';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import {
    allClientsSliceActions,
    allClientsSliceReducer,
} from 'pages/MainPage/model/slice/allClientsSlice';
import { classNames } from 'shared/lib/classNames/classNames';
import { MainNavFilter } from '../MainNavFilters/MainNavFilter';
import cls from './MainPage.module.scss';
import { TableHeader } from 'shared/ui/TableHeader/TableHeader';
import {
    getAllClients,
    getAllClientsIsLoading,
    getAllClientsCurrentPage,
    getAllClientsLastPage,
    getAllClientsDays,
    getAllClientsSortBy,
} from 'pages/MainPage/model/selectors/mainPageSelectors';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Loader } from 'shared/ui/Loader/Loader';

interface MainPageProps {
    className?: string;
}

const reducers: ReducersList = {
    allClients: allClientsSliceReducer,
};

const MainPage = memo((props: MainPageProps) => {
    const { className } = props;
    const clients = useSelector(getAllClients);
    const isLoading = useSelector(getAllClientsIsLoading);
    const current_page = useSelector(getAllClientsCurrentPage);
    const last_page = useSelector(getAllClientsLastPage);
    const sortBy = useSelector(getAllClientsSortBy);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllClients());
    }, [dispatch, current_page]);

    const handlePageChange = (page: number) => {
        dispatch(allClientsSliceActions.setPage(page));
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= last_page; i++) {
            pages.push(
                <Button
                    theme={ButtonTheme.BACKGROUND}
                    key={i}
                    onClick={() => handlePageChange(i)}
                    disabled={i === current_page}
                >
                    {i}
                </Button>,
            );
        }
        return pages;
    };

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.MainPage, {}, [className])}>
                <MainNavFilter />
                <TableHeader />
                {isLoading ? (
                    <Loader className={cls.loader} />
                ) : clients && sortBy === 'top' ? (
                    clients
                        ?.filter((item) =>
                            item.filters.some(
                                (filter) => filter.status === 'expired',
                            ),
                        )
                        .sort((a: any, b: any) => {
                            const aRemainingDays = a.filters.find(
                                (filter: any) => filter.status === 'expired',
                            ).remaining_days;
                            const bRemainingDays = b.filters.find(
                                (filter: any) => filter.status === 'expired',
                            ).remaining_days;
                            console.log(aRemainingDays);
                            console.log(bRemainingDays);
                            return aRemainingDays - bRemainingDays;
                        })
                        .map((item) => <Table item={item} key={item.id} />)
                ) : (
                    clients
                        ?.filter((item) =>
                            item.filters.some(
                                (filter) => filter.status === 'expired',
                            ),
                        )
                        .sort((a: any, b: any) => {
                            const aRemainingDays = a.filters.find(
                                (filter: any) => filter.status === 'expired',
                            ).remaining_days;
                            const bRemainingDays = b.filters.find(
                                (filter: any) => filter.status === 'expired',
                            ).remaining_days;
                            return aRemainingDays + bRemainingDays;
                        })
                        .map((item) => <Table item={item} key={item.id} />)
                )}
                {isLoading ? '' :
                clients &&
                    clients
                        .filter((item) =>
                            !item.filters.some(
                                (filter) => filter.status === 'expired',
                            ),
                        )
                        .map((item) => <Table item={item} key={item.id} />)}
                {isLoading || (
                    <div className={cls.pagination}>{renderPagination()}</div>
                )}
            </div>
        </DynamicModuleLoader>
    );
});

export default MainPage;
