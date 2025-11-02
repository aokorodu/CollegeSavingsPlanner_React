import { useState } from "react";
import styles from './GraphButton.module.css';

type GraphButtonProps = {
    imageURL: string;
    altText: string;
    onClick: (active: boolean) => void;
    isActive?: boolean;
};

const GraphButton = ({ imageURL, altText, onClick, isActive = false }: GraphButtonProps) => {

    const [active, setActive] = useState(isActive);

    const handleClick = () => {
        if (active) return;
        const newActiveState = !active;
        setActive(newActiveState);
        onClick(newActiveState);
    };
    return (
        <>
            <img
                className={`${styles.icon} ${!active ? styles.iconDeselected : ''}`}
                src={imageURL}
                width={50}
                height={50}
                alt={altText}
                onClick={handleClick}
            /></>
    );
};

export default GraphButton;