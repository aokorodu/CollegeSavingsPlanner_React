import styles from './Header.module.css';
const Header = () => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>529 College Savings Planner</h1>
            <p className={styles.subtitle}>Figure out how much you need to save for college.</p>
        </header>
    );
};

export default Header;