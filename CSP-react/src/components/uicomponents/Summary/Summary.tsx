import { forwardRef, useImperativeHandle } from "react";
import type { calcObject } from "../../../App";
import InfoHolder from '../InfoHolder/InfoHolder';
import React from "react";
import { getDollarString } from "../../../utils/Utils";
import styles from './Summary.module.css';
import Disclaimer from "../../GraphButton/Disclaimer/Disclaimer";

const periodsMap: { [key: number]: string } = {
    1: "yearly",
    2: "semi-annually",
    4: "quarterly",
    12: "monthly",
    24: "semi-monthly",
    26: "bi-weekly",
    52: "weekly",
    365: "daily"
};

const Summary = forwardRef((_, ref) => {

    const contributionRef = React.useRef<HTMLSpanElement | null>(null);
    const futureAmountSavedRef = React.useRef<HTMLSpanElement | null>(null);
    const futureCostRef = React.useRef<HTMLSpanElement | null>(null);
    const futureAmountNeededRef = React.useRef<HTMLSpanElement | null>(null);
    const percentSavedRef = React.useRef<HTMLSpanElement | null>(null);

    const updateSummary = (obj: calcObject) => {
        console.log("periods:", obj.periods);
        const cadence = periodsMap[obj.periods];

        contributionRef.current!.textContent = `With a ${cadence} contribution of $${obj.contribution.toLocaleString()}:`;
        futureAmountSavedRef.current!.textContent = `$${obj.futureSaved.toLocaleString()} **`;

        futureCostRef.current!.textContent = `$${Math.round(obj.futureCost.futureCost).toLocaleString()} *`;

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
                <span ref={contributionRef}>$0</span>
            </InfoHolder>
            <InfoHolder>
                <label>projected future total cost:</label>
                <span ref={futureCostRef}>$0</span>
            </InfoHolder>
            <InfoHolder>
                <label>projected future 529 funds:</label>
                <span ref={futureAmountSavedRef}>$0</span>
            </InfoHolder>
            <InfoHolder>
                <label>total amount you'll need to finance</label>
                <span ref={futureAmountNeededRef}>$0</span>
            </InfoHolder>

            <InfoHolder>
                <label>percent saved</label>
                <span ref={percentSavedRef}>0%</span>
            </InfoHolder>

            <Disclaimer />
        </div>
    );
});

export default Summary;