import { classNames } from 'shared/lib/classNames/classNames';
import { LogintFormAsync } from '../LoginForm/LoginForm.async';
import cls from './LoginModal.module.scss';

interface LoginModalProps {
    className?: string;
}

export const LoginModal = ({ className }: LoginModalProps) => (
    <div
        className={classNames(cls.Login, {}, [className])}
    >
        <LogintFormAsync />
    </div>
);
