import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { AddClientFormAsync } from '../AddClientForm/AddClientForm.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface AddClientModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const AddClientModal = ({
    className,
    isOpen,
    onClose,
}: AddClientModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <AddClientFormAsync onClose={onClose} />
        </Suspense>
    </Modal>
);
