import { forwardRef } from 'react';
import styles from './ExtraFundsNote.module.css';

const ExtraFundsNote = forwardRef<HTMLDivElement | null>((_, ref) => {
    return (
        <div className={styles.extraContent} ref={ref}>
            <p><strong>Note:</strong> you may end up with extra funds. See the summary below for what to do when funds remain in your 529 plan after education expenses have been covered.</p>
        </div>
    );
});

export default ExtraFundsNote;
/*
You can use leftover 529 funds by changing the beneficiary to another family member, rolling it into a Roth IRA (up to a lifetime limit of $35,000), paying up to $10,000 in student loans, or using it for your own further education. If you take a non-qualified withdrawal, you will likely have to pay taxes and a 10% penalty on the earnings.
*/