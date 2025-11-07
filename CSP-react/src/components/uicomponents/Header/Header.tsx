import styles from './Header.module.css';
import GraduationCapIcon from "../../../assets/graduationCap.svg";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.titleHolder}>
                <h1 className={styles.title}>529 College Savings Calculator</h1>
                <img src={GraduationCapIcon} alt="graduation cap" className={styles.icon} width={50} height={50} />
            </div>

            <p className={styles.subtitle}>Calculate how much to set aside for your child's education.</p>
        </header>
    );
};

export default Header;