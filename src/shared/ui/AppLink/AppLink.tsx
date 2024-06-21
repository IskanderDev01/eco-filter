import { classNames } from 'shared/lib/classNames/classNames';
import { LinkProps } from 'react-router-dom';
import { ReactNode, memo } from 'react';
import cls from './AppLink.module.scss';
import { NavLink } from 'react-router-dom'

export enum AppLinkTheme {
    DARK = 'themedark',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    children: ReactNode;
    activeClassName?: string;
}

export const AppLink = memo((props: AppLinkProps) => {
    const {
        to,
        className,
        theme = AppLinkTheme.DARK,
        activeClassName = '',
        children,
        ...otherProps
    } = props;

    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                classNames(cls.AppLink, { [activeClassName]: isActive, [cls[theme]]: true }, [
                    className,
                ])
            }
            {...otherProps}
        >
            {children}
        </NavLink>
    );
});
