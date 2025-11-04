import styles from './ContentHolder.module.css';
import React from 'react';
const ContentHolder: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.holder}>
            {children}
        </div>
    );
};

export default ContentHolder;