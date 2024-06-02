import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Table.module.scss';
import { memo } from 'react';

interface Item {
    id: number;
    fullname: string;
    mobile: string;
    address: string;
    category: string;
    comment: string;
    date: string;
    filter1: string;
    filter2: string;
}

interface TableProps {
    className?: string;
    item: Item;
}

export const Table = memo((props: TableProps) => {
    const { className, item } = props;

    return (
        <div className={classNames(cls.Table, {}, [className])}>
            <ul>
                <li className={cls.name}>{item.fullname}</li>
                <li className={cls.mobile}>{item.mobile}</li>
                <li className={cls.address}>{item.address}</li>
                <li className={cls.category}>{item.category}</li>
                <li className={cls.comment}>{item.comment}</li>
                <li className={cls.date}>{item.date}</li>
                <li>{item.filter1}</li>
                <li>{item.filter2}</li>
            </ul>
        </div>
    );
});
