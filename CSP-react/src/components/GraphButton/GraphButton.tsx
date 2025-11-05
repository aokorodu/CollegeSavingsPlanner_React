import { useState } from "react";
import styles from './GraphButton.module.css';

type GraphButtonProps = {
    imageURL: string;
    altText: string;
    onClick: () => void;
    isActive: boolean;
};

const GraphButton = ({ imageURL, altText, onClick, isActive }: GraphButtonProps) => {


    const handleClick = () => {
        if (isActive) return;
        onClick();
    };
    return (
        <>
            <img
                className={`${styles.icon} ${!isActive ? styles.iconDeselected : ''}`}
                src={imageURL}
                alt={altText}
                onClick={handleClick}
            /></>
    );
};

export default GraphButton;