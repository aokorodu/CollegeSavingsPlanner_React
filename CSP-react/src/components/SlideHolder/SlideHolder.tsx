import React from 'react';
import styles from './SliderHolder.module.css';

const SliderHolder = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className={styles.sliderHolder}>
            {children}
        </div>
    )
};

export default SliderHolder;