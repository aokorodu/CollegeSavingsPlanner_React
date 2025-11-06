import styles from './Header.module.css';
import GraduationCapIcon from "../../../assets/graduationCap.svg";

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.titleHolder}>
                <h1 className={styles.title}>529 College Savings Planner</h1>
                <img src={GraduationCapIcon} alt="graduation cap" className={styles.icon} width={50} height={50} />
            </div>

            <p className={styles.subtitle}>Figure out how much you need to save for college.</p>
        </header>
    );
};

export default Header;