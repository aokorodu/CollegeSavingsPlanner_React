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

    const summaryRef = React.useRef<HTMLDivElement | null>(null);
    const costProjectionRef = React.useRef<HTMLDivElement | null>(null);
    const assumptionsRef = React.useRef<HTMLDivElement | null>(null);

    const updateSummary = (obj: calcObject) => {
        console.log("periods:", obj.periods);
        const cadence = periodsMap[obj.periods];
        const initInvestString = obj.initialBalance > 0 ? `an initial investment of <b>$${obj.initialBalance.toLocaleString()}</b> plus ` : "";

        if (summaryRef.current) {
            summaryRef.current.innerHTML = `With ${initInvestString} a ${cadence} contribution of <b>$${obj.contribution.toLocaleString()}</b> over <b>${obj.yearsToCollege}</b> years, you are projected to save <b>$${obj.futureSaved.toLocaleString()}</b> towards a future college cost of <b>$${Math.round(obj.futureCost.futureCost).toLocaleString()}</b>, covering <b>${((obj.futureSaved / obj.futureCost.futureCost) * 100).toFixed(2)}%</b> of the total amount needed.  This means you will need to finance an additional <b>$${getDollarString(obj.futureCost.futureCost - obj.futureSaved)}</b>.`;
        };


        if (costProjectionRef.current) {
            const college = obj.selectedCollege ? ` (${obj.selectedCollege})` : "";
            const str = `The projected future cost of college is based on your selected institution, which has a current annual cost of <b>$${obj.currentCost!.toLocaleString()}</b>. Assuming an annual tuition inflation rate of <b>${obj.annalCostIncrease}%</b>, the estimated cost when your child starts college in <b>${obj.yearsToCollege}</b> years is <b>$${Math.round(obj.futureCost.futureCost).toLocaleString()}</b>.`;
            costProjectionRef.current.innerHTML = str;
        }

        if (assumptionsRef.current) {
            const str = `Assumptions used in this calculation include an average annual return rate of ${obj.annualRateOfReturn}% on your investments, an annual tuition inflation rate of ${obj.annalCostIncrease}%, and an expense ratio of ${obj.expenseRatio}%.`;
            assumptionsRef.current.innerHTML = str;
        }
    }


    useImperativeHandle(ref, () => ({
        updateSummary
    }));


    return (
        <div id="resultsContainer" className={styles.resultsContainer}>
            <h2>SUMMARY:</h2>
            <div ref={summaryRef}></div>
            <div ref={costProjectionRef}></div>
            <div ref={assumptionsRef}></div>

            <Disclaimer />
        </div>
    );
});

export default Summary;