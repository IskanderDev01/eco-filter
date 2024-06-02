import { Table } from 'shared/ui/Table/Table';
import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TableTop } from 'shared/ui/TableTop/TableTop';
import { Loader } from 'shared/ui/Loader/Loader';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { allClientsSliceReducer } from 'pages/MainPage/model/slice/allClientsSlice';
import { classNames } from 'shared/lib/classNames/classNames';
import {
    getAllClients,
    getAllClientsDays,
    getAllClientsIsLoading,
} from 'pages/MainPage/model/selectors/mainPageSelectors';
import { MainNavFilter } from '../MainNavFilters/MainNavFilter';
import cls from './MainPage.module.scss';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';

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
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllClients());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <div className={classNames(cls.MainPage, {}, [className])}>
                <MainNavFilter />
                <TableTop />
                {isLoading ? (
                    <Loader className={cls.loader} />
                ) : (
                    clients && clients.map((item) => <Table item={item} />)
                )}
            </div>
        </DynamicModuleLoader>
    );
});

export default MainPage;
