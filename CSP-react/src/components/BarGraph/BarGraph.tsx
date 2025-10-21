import React from 'react';
import Bar from './Bar';

interface BarGraphProps {
    colors: string[];
    percentage: number;
    yearlyCosts: number[];
    maxYearlyCost: number;
}

const BarGraph = ({
    colors,
    percentage,
    yearlyCosts = [],
    maxYearlyCost

}: BarGraphProps) => {

    const vbHeight = 1000;
    const vbWidth = 1000;
    return (
        <svg width="300" height="300" viewBox={`0 0 ${vbWidth} ${vbHeight}`}>
            <rect x={0} y={0} width={vbWidth} height={vbHeight} stroke="#ccc" fill="none" />
            <text x={100} y={100} fill='#fff' stroke="none" fontSize={20}>{colors}{percentage}{yearlyCosts}{maxYearlyCost}</text>
            <Bar value={100} x={0} percentage={20} color='#FF0000' />
            <Bar value={100} x={250} percentage={40} color='#FF0000' />
            <Bar value={100} x={500} percentage={60} color='#FF0000' />
            <Bar value={100} x={750} percentage={80} color='#FF0000' />

            <Bar value={100} x={0} percentage={10} color='#00ff00' />
            <Bar value={100} x={250} percentage={20} color='#00ff00' />
            <Bar value={100} x={500} percentage={30} color='#00ff00' />
            <Bar value={100} x={750} percentage={40} color='#00ff00' />
        </svg>
    );
};

export default BarGraph;