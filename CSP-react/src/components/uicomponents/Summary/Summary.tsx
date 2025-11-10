import { forwardRef, useImperativeHandle } from "react";
import type { calcObject } from "../../../App";
import InfoHolder from '../InfoHolder/InfoHolder';
import React from "react";
import { getDollarString } from "../../../utils/Utils";
import styles from './Summary.module.css';

const Summary = forwardRef((_, ref) => {

    const futureAmountSavedRef = React.useRef<HTMLSpanElement | null>(null);
    const futureCostRef = React.useRef<HTMLSpanElement | null>(null);
    const futureAmountNeededRef = React.useRef<HTMLSpanElement | null>(null);
    const percentSavedRef = React.useRef<HTMLSpanElement | null>(null);

    const updateSummary = (obj: calcObject) => {
        futureAmountSavedRef.current!.textContent = `$${obj.futureSaved.toLocaleString()}`;

        futureCostRef.current!.textContent = `$${obj.futureCost.futureCost.toLocaleString()}`;

        futureAmountNeededRef.current!.innerText = getDollarString(obj.futureCost.futureCost - obj.futureSaved);

        if (percentSavedRef.current) {
            let percentage = obj.futureSaved / obj.futureCost.futureCost * 100;
            if (isNaN(percentage)) percentage = 0;
            percentSavedRef.current.innerText = `${percentage.toFixed(2)}%`;
        }

    };


    useImperativeHandle(ref, () => ({
        updateSummary
    }));


    return (
        <div id="resultsContainer" className={styles.resultsContainer}>
            <h2>SUMMARY:</h2>
            <InfoHolder>
                <label>projected future savings *</label>
                <span ref={futureAmountSavedRef}>$0</span>
            </InfoHolder>

            <InfoHolder>
                <label>projected future cost **</label>
                <span ref={futureCostRef}>$0</span>
            </InfoHolder>

            <InfoHolder>
                <label>amount for which you'll need funding</label>
                <span ref={futureAmountNeededRef}>$0</span>
            </InfoHolder>

            <InfoHolder>
                <label>percent saved</label>
                <span ref={percentSavedRef}>0%</span>
            </InfoHolder>
        </div>
    );
});

export default Summary;