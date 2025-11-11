import styles from './Header.module.css';
import GraduationCapIcon from "../../../assets/babyWithCap_min.svg";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.titleHolder}>
                <h1 className={styles.title}>529 College Savings Calculator</h1>
                <p className={styles.subtitle}>Calculate how much to set aside for your child's education.</p>
            </div>

            <img src={GraduationCapIcon} alt="graduation cap" className={styles.icon} width={"80px"} height={"80px"} />
        </header>
    );
};

export default Header;