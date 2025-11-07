import React from 'react';
import styles from './Modal.module.css';

import ExpenseRatioModal from './ExpenseRatioModal';
import RateOfReturnModal from './RateOfReturnModal';

type ModalProps = {
    type?: "expense_ratio" | "cost_increase" | "ror";
    onClose?: () => void;
};

const Modal = ({ type, onClose }: ModalProps) => {
    const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();
    console.log("Modal type:", type);
    return (
        <>
            <div className={styles.backdrop} onClick={onClose}></div>
            <div className={styles.holder}>
                <div className={styles.content} onClick={stopPropagation}>
                    <button className={styles.closeButton} onClick={onClose} aria-label="Close">×</button>
                    {type === "expense_ratio" && <ExpenseRatioModal />}
                    {type === "cost_increase" && <div style={{ padding: '1rem' }}><h2>Warning Modal</h2><p>This is a warning modal.</p></div>}
                    {type === "ror" && <RateOfReturnModal />}
                </div>
            </div>
        </>
    );
};

export default Modal;