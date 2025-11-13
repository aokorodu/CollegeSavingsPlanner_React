import styles from './Disclaimer.module.css';
const Disclaimer = () => {
    return (
        <div className={styles.disclaimerContainer}>
            {/* <div className={styles.disclaimerItem}>
                <span>*</span>
                <span>projected future cost is an estimate of the total annual cost of attendance for the first year of college, based on the information provided. This amount does not guarantee future results.</span>
            </div>
            <div className={styles.disclaimerItem}>
                <span>**</span>
                <span>projected future 529 savings is an estimate of the total amount you will have saved by the time college starts, based on the information provided. This amount does not guarantee future results.</span>
            </div> */}
            <h3>Disclaimer</h3>
            <div>
                <i><strong>Please note</strong> that the College Savings Planner provides estimates based on the inputs you provide. Actual costs and investment returns may vary. It's always a good idea to consult with a financial advisor for personalized advice tailored to your specific situation.</i>
            </div>
        </div>
    );
}

export default Disclaimer;