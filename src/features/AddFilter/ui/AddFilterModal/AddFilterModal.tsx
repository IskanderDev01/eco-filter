import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { AddFilterFormAsync } from '../AddFilter/AddFilter.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface AddFilterModalProps {
    className?: string;
    isOpen: boolean;
    user_id: number;
    onClose: () => void;
}

export const AddFilterModal = ({
    className,
    user_id,
    isOpen,
    onClose,
}: AddFilterModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <AddFilterFormAsync user_id={user_id} onClose={onClose} />
        </Suspense>
    </Modal>
);
