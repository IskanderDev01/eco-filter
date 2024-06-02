import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';
import { useCallback, useState } from 'react';
import { AddClientModal } from 'features/AddClient';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { allClientsSliceActions } from 'pages/MainPage/model/slice/allClientsSlice';
import { useSelector } from 'react-redux';
import {
    getAllClientsDays,
    getAllClientsSearch,
} from 'pages/MainPage/model/selectors/mainPageSelectors';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';

interface NavbarProps {
    className?: string;
}

export const Navbar = (props: NavbarProps) => {
    const { className } = props;
    const [isAuthModal, setIsAuthModal] = useState(false);
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const dispatch = useAppDispatch();
    const search = useSelector(getAllClientsSearch);

    const fetchData = useCallback(() => {
        dispatch(fetchAllClients());
    }, [dispatch]);

    const debounceFetchData = useDebounce(fetchData, 500);

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(allClientsSliceActions.setSearch(search));
            debounceFetchData();
        },
        [dispatch, debounceFetchData],
    );

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.nav, {}, ['container'])}>
                <div className={cls.data}>
                    {day}.{month}.{year} г.
                </div>
                <Input
                    onChange={onChangeSearch}
                    value={search}
                    placeholder="Поиск..."
                    className={cls.input}
                />
                <Button theme={ButtonTheme.BACKGROUND} onClick={onShowModal}>
                    Добавить
                </Button>
                {isAuthModal && (
                    <AddClientModal
                        isOpen={isAuthModal}
                        onClose={onCloseModal}
                    />
                )}
            </div>
        </div>
    );
};
