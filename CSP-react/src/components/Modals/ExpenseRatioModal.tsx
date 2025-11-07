import styles from './Modal.module.css';

const ExpenseRatioModal = () => {
    return (

        <div className={styles.modalContent}>
            <h2>Expense Ratio</h2>
            <p>An expense ratio is the annual fee a fund charges investors to cover its operating costs, expressed as a percentage of the fund's average assets under management.</p>
            <p>This percentage is automatically deducted from your investment returns and includes costs like management, administrative, legal, and marketing fees. </p>
            <p>For example, a $10,000 investment in a fund with a 0.50% expense ratio would cost $50 annually. </p>
        </div>

    );
}

export default ExpenseRatioModal;