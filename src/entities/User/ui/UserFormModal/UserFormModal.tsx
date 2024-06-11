import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { UserFormFormAsync } from '../UserForm/UserForm.async';
import { User } from 'entities/User/model/types/user'

interface UserFormModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    data?: User;
}

export const UserFormModal = ({
    className,
    isOpen,
    data,
    onClose,
}: UserFormModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <UserFormFormAsync data={data} onClose={onClose} />
        </Suspense>
    </Modal>
);
