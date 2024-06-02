import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import cls from './TableTop.module.scss';

interface TableTopProps {
    className?: string;
}

export const TableTop = memo((props: TableTopProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.TableTop, {}, [className])}>
            <ul>
                <li className={cls.name}>Имя</li>
                <li className={cls.mobile}>Телефон</li>
                <li className={cls.address}>Адрес</li>
                <li className={cls.category}>Категория</li>
                <li className={cls.comment}>Комментарий</li>
                <li className={cls.date}>Дата</li>
                <li>Фильтр 1</li>
                <li>Фильтр 2</li>
            </ul>
        </div>
    );
});
