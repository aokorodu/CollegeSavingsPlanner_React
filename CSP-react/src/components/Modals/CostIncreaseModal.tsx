import styles from './Modal.module.css';

const CostIncreaseModal = () => {
    return (

        <div className={styles.modalContent}>
            <h2>Cost Increase</h2>
            <p>The annual cost increase is the rate at which college tuition and fees are expected to rise each year.</p>
            <p>This percentage is used to project future college costs based on current prices.</p>
        </div>

    );
}

export default CostIncreaseModal;