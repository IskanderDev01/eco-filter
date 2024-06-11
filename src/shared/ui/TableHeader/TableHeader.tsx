import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableHeader.module.scss';
import { memo, useCallback, useState } from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getAllClientsDays, getAllClientsSortBy } from 'pages/MainPage/model/selectors/mainPageSelectors';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { allClientsSliceActions } from 'pages/MainPage/model/slice/allClientsSlice'

interface TableHeaderProps {
    className?: string;
}

export const TableHeader = memo((props: TableHeaderProps) => {
    const { className } = props;
    const [arrow, setArrow] = useState(false);
    const days = useSelector(getAllClientsDays);
    const sortBy = useSelector(getAllClientsSortBy)
    const dispatch = useAppDispatch()

    const sortTop = () => {
        dispatch(allClientsSliceActions.setSortBy('top'))
        setArrow(!arrow);
    }
    const sortDown = () => {
        dispatch(allClientsSliceActions.setSortBy('down'))
        setArrow(!arrow);
    }

    return (
        <div className={classNames(cls.TableHeader, {}, [className])}>
            <div className={cls.tbody}>
                <div>имя</div>
                <div>телефон</div>
                <div>адрес</div>
                <div>старт</div>
                <div>фильтр</div>
                <div>была замена</div>
                {
                    days === 'today' || days === 'tomorrow'
                    ? ''
                    : <div className={cls.pastDays}>
                    <span>прошло</span>
                    {arrow ? (
                        <FontAwesomeIcon icon={faArrowDown} onClick={sortDown}/>
                    ) : (
                        <FontAwesomeIcon icon={faArrowUp} onClick={sortTop}/>
                    )}
                </div>
                }
                <div className={cls.comment}>комментарий</div>
                <div className={cls.options}>функции</div>
            </div>
        </div>
    );
});
