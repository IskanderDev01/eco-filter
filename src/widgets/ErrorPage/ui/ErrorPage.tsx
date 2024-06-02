import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.ErrorPage, {}, [className])}>
            <p>Произошла непредвиденная ошибка</p>
            <Button theme={ButtonTheme.BACKGROUND} onClick={reloadPage} className={cls.btn}>
                Обновить страницу
            </Button>
        </div>
    );
};
