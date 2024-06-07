import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TableHeader.module.scss';
import { memo } from 'react';

interface TableHeaderProps {
    className?: string;
}

export const TableHeader = memo((props: TableHeaderProps) => {
    const { className } = props;

    return (
        <div className={classNames(cls.TableHeader, {}, [className])}>
            <div className={cls.tbody}>
                <div>Имя</div>
                <div>Телефон</div>
                <div>Адрес</div>
                <div>Дата добавления</div>
            </div>
        </div>
    );
});
