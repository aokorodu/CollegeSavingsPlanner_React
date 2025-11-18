import { forwardRef, useImperativeHandle } from "react";
import type { calcObject } from "../../../types/types";
import React from "react";
import { getDollarString } from "../../../utils/Utils";
import Disclaimer from "../../GraphButton/Disclaimer/Disclaimer";
import Card from "../Card/Card";

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
        const contribution = obj.contribution.toLocaleString();
        const futureSaved = Math.round(obj.futureSaved).toLocaleString();
        const futureCost = Math.round(obj.futureCost.futureCost).toLocaleString();
        const annualCostIncrease = obj.annalCostIncrease
        const initInvestString = obj.initialBalance > 0 ? `an initial investment of <b>$${obj.initialBalance.toLocaleString()}</b> plus ` : "";

        if (summaryRef.current) {
            if (obj.futureSaved >= obj.futureCost.futureCost) {
                summaryRef.current.innerHTML = `With ${initInvestString} a ${cadence} contribution of <b>$${contribution}</b> over <b>${obj.yearsToCollege}</b> years, you are projected to save <b>$${futureSaved}</b> towards a future college cost of <b>$${futureCost}</b>, fully covering the total amount needed. Congratulations! You have exceeded your college savings goal by <b>$${getDollarString(obj.futureSaved - obj.futureCost.futureCost)}</b>.`;
                return;
            } else {
                summaryRef.current.innerHTML = `With ${initInvestString} a ${cadence} contribution of <b>$${contribution}</b> over <b>${obj.yearsToCollege}</b> years, you are projected to save <b>$${futureSaved}</b> towards a future college cost of <b>$${futureCost}</b>, covering <b>${((obj.futureSaved / obj.futureCost.futureCost) * 100).toFixed(2)}%</b> of the total amount needed.  This means you will need to finance an additional <b>${getDollarString(obj.futureCost.futureCost - obj.futureSaved)}</b>.`;
            }
        };


        if (costProjectionRef.current) {
            const str = `The projected future cost of college is based on your selected institution, which has a current annual cost of <b>$${obj.currentCost!.toLocaleString()}</b>. Assuming an annual tuition inflation rate of <b>${annualCostIncrease}%</b>, the estimated cost when your child starts college in <b>${obj.yearsToCollege}</b> years is <b>$${futureCost}</b>.`;
            costProjectionRef.current.innerHTML = str;
        }

        if (assumptionsRef.current) {
            const str = `Assumptions used in this calculation include an average annual return rate of <b>${obj.annualRateOfReturn}%</b> on your investments, an annual tuition inflation rate of <b>${annualCostIncrease}%</b> and an expense ratio of <b>${obj.expenseRatio}%</b>.`;
            assumptionsRef.current.innerHTML = str;
        }
    }


    useImperativeHandle(ref, () => ({
        updateSummary
    }));


    return (
        <>

            <Card>
                {/* <HeroImage /> */}
                <h2>Summary</h2>
                <div ref={summaryRef}></div>
                <div ref={costProjectionRef}></div>
                <div ref={assumptionsRef}></div>

                <Disclaimer />
            </Card></>
    );
});

export default Summary;