import React from 'react';
import Bar from './Bar';

interface BarGraphProps {
    colors: string[];
    percentage: number;
    yearlyCosts: number[];
}

const years = ['first year', 'sohpmore', 'junior', 'senior'];

const BarGraph = ({
    colors,
    percentage,
    yearlyCosts = [],

}: BarGraphProps) => {

    const defaultMax = 200000;
    const maxYearlyCost = Math.max(...yearlyCosts);
    const yearlySaved = yearlyCosts.map((cost) => {
        return Math.round(cost * (percentage / 100));
    });
    const yearlyMax = Math.max(...yearlySaved, maxYearlyCost, defaultMax);

    const vbHeight = 1000;
    const vbWidth = 1000;

    const getCostBars = () => {
        return yearlyCosts.map((cost, index) => {
            const barHeightPercentage = yearlyCosts[index] / yearlyMax * 100;
            console.log("barheightpercentage: ", barHeightPercentage); {/*(cost / maxYearlyCost) * 100*/ };
            return (
                <Bar
                    key={`bar_${index}`}
                    x={index * 250}
                    percentage={barHeightPercentage}
                    color={colors[0]}
                    value={cost}
                />
            );
        });
    };

    const getSavedBars = () => {
        return yearlySaved.map((cost, index) => {
            const barHeightPercentage = yearlySaved[index] / yearlyMax * 100;
            return (
                <Bar
                    key={`bar_${index}`}
                    x={(index * 250) + 125}
                    percentage={barHeightPercentage}
                    color={colors[1]}
                    value={cost}
                />
            );
        });
    };

    const getHorizontalAxis = () => {
        return years.map((year, index) => {
            return (
                <text key={`yearLabel_${index}`} x={((index * 250) + 125)} y={vbHeight + 20} fill='#fff' stroke="none" fontSize={40} textAnchor="middle" dominantBaseline="hanging">{year}</text>
            );
        });
    };


    return (
        <svg width="500" height="500" viewBox={`-100 -100 ${vbWidth + 200} ${vbHeight + 200}`}>
            {getCostBars()}
            {getSavedBars()}
            {getHorizontalAxis()}
            <path d={`M 0 ${0} V${vbHeight} H${vbWidth}`} stroke="#fff" fill="none" strokeWidth={2} />
        </svg>
    );
};

export default BarGraph;