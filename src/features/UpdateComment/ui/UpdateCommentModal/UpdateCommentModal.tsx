import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { UpdateCommentFormAsync } from '../UpdateCommentForm/UpdateCommentForm.async';
import { Loader } from 'shared/ui/Loader/Loader';

interface UpdateCommentModal {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export const UpdateCommentModal = ({
    className,
    isOpen,
    onClose,
}: UpdateCommentModal) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <UpdateCommentFormAsync onClose={onClose} />
        </Suspense>
    </Modal>
);
