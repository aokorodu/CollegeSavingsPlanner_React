import styles from './InfoHolder.module.css';

const InfoHolder = ({ children }: { children: React.ReactNode }) => {
    return <div className={styles.infoHolder}>{children}</div>;
};

export default InfoHolder;