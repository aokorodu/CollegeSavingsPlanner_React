import { forwardRef } from 'react';
import styles from './ExtraFundsNote.module.css';

const ExtraFundsNote = forwardRef<HTMLDivElement | null>((_, ref) => {
    return (
        <div className={styles.extraContent} ref={ref}>
            <h3>note: you may have extra funds</h3>You can use leftover 529 funds by changing the beneficiary to another family member, rolling it into a Roth IRA (up to a lifetime limit of $35,000), paying up to $10,000 in student loans, or using it for your own further education. If you take a non-qualified withdrawal, you will likely have to pay taxes and a 10% penalty on the earnings.
        </div>
    );
});

export default ExtraFundsNote;