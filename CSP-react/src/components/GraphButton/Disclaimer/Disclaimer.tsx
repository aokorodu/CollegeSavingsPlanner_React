import styles from './Disclaimer.module.css';
const Disclaimer = () => {
    return (
        <div className={styles.disclaimerContainer}>
            <div className={styles.disclaimerItem}>
                <span>*</span>
                <span>projected future cost is an estimate of the total annual cost of attendance for the first year of college, based on the information provided. This amount does not guarantee future results.</span>
            </div>
            <div className={styles.disclaimerItem}>
                <span>**</span>
                <span>projected future 529 savings is an estimate of the total amount you will have saved by the time college starts, based on the information provided. This amount does not guarantee future results.</span></div>
        </div>
    );
}

export default Disclaimer;