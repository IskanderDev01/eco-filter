import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableHeader.module.scss';
import { memo, useState } from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { getAllClientsDays } from 'pages/MainPage/model/selectors/mainPageSelectors';

interface TableHeaderProps {
    className?: string;
}

export const TableHeader = memo((props: TableHeaderProps) => {
    const { className } = props;
    const [arrow, setArrow] = useState(false);
    const days = useSelector(getAllClientsDays);

    const handleArrow = () => {
        setArrow(!arrow);
    };

    return (
        <div className={classNames(cls.TableHeader, {}, [className])}>
            <div className={cls.tbody}>
                <div>имя</div>
                <div>телефон</div>
                <div>адрес</div>
                <div>старт</div>
                <div>фильтр</div>
                <div>была замена</div>
                <div>комментарий</div>
                {
                    days === 'today' || days === 'tomorrow'
                    ? ''
                    : <div className={cls.pastDays} onClick={handleArrow}>
                    <span>прошло</span>
                    {/* {arrow ? (
                        <FontAwesomeIcon icon={faArrowUp} />
                    ) : (
                        <FontAwesomeIcon icon={faArrowDown} />
                    )} */}
                </div>
                }
                
                <div className={cls.options}>функции</div>
                <div className={cls.checkbox}>отметить</div>
            </div>
        </div>
    );
});
