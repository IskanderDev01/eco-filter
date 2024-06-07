import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Suspense } from 'react';
import { Loader } from 'shared/ui/Loader/Loader';
import { AddCommentFormAsync } from '../AddComment/AddComment.async'

interface AddCommentModalProps {
    className?: string;
    isOpen: boolean;
    order_id: number;
    onClose: () => void;
}

export const AddCommentModal = ({
    className,
    order_id,
    isOpen,
    onClose,
}: AddCommentModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <AddCommentFormAsync order_id={order_id} onClose={onClose} />
        </Suspense>
    </Modal>
);
