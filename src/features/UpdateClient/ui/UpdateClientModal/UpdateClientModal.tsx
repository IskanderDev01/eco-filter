import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { UpdateClientFormAsync } from '../UpdateClientForm/UpdateClientForm.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface UpdateClientModal {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateClientModal = ({
    className,
    isOpen,
    onClose,
}: UpdateClientModal) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <UpdateClientFormAsync onClose={onClose} />
        </Suspense>
    </Modal>
);
