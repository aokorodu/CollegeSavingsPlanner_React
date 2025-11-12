import React from 'react';
import styles from './Card.module.css';
const Card = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.holder}>
            {children}
        </div>
    );
};

export default Card;