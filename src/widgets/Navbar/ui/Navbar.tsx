import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';
import { useCallback, useState } from 'react';
import { AddClientModal } from 'features/AddClient';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { allClientsSliceActions } from 'pages/MainPage/model/slice/allClientsSlice';
import { useSelector } from 'react-redux';
import { useDebounce } from 'shared/lib/hooks/useDebounce/useDebounce';
import { fetchAllClients } from 'pages/MainPage/model/services/fetchAllClients';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage';
import { getAllClientsSearch } from 'pages/MainPage/model/selectors/mainPageSelectors'

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

    const debounceFetchData = useDebounce(fetchData, 300);

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

    const onLogout = () => {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        location.reload();
    };

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <div className={classNames(cls.nav, {}, ['container'])}>
                <div className={cls.data}>
                    {day}.{month}.{year} г.
                </div>
                <div className={cls.inputBlock}>
                    <Input
                        onChange={onChangeSearch}
                        value={search}
                        placeholder="Поиск..."
                        className={cls.input}
                    />
                </div>

                <div className={cls.btn}>
                    <Button
                        theme={ButtonTheme.BACKGROUND}
                        onClick={onLogout}
                    >
                        Выйти
                    </Button>
                    <Button
                        theme={ButtonTheme.BACKGROUND}
                        onClick={onShowModal}
                    >
                        Добавить клиента
                    </Button>
                </div>

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
