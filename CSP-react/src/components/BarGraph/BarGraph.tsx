import Bar from './Bar';
import styles from './BarGraph.module.css';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import type { BarSizeProps } from './Bar';

const years = ['first year', 'sohpmore', 'junior', 'senior'];

type BarRef = {
    updateSize: ({ percentage, value }: BarSizeProps) => void;
    updateColors: (c: string) => void;
};

const BarGraph = forwardRef((props, ref) => {

    const defaultMax = 200000;
    // const totalCosts = yearlyCosts.reduce((a, b) => a + b, 0);
    // const percentageSaved = amountSaved / totalCosts;
    // const yearlySaved = yearlyCosts.map(cost => Math.round(cost * percentageSaved));
    // const maxYearlyCost = Math.max(...yearlyCosts);
    // const yearlyMax = Math.max(...yearlySaved, maxYearlyCost, defaultMax);

    const costBar1Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const costBar2Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const costBar3Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const costBar4Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const savedBar1Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const savedBar2Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const savedBar3Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const savedBar4Ref = React.useRef<{ updateSize: (p: number, v: number) => void; updateColors: (c: string) => void } | null>(null);
    const savedBarRefs = [savedBar1Ref, savedBar2Ref, savedBar3Ref, savedBar4Ref];
    const costBarRefs = [costBar1Ref, costBar2Ref, costBar3Ref, costBar4Ref];


    let totalCosts = 0;
    let yearlyCosts: number[] = [];
    let yearlySaved: number[] = [];
    let percentageSaved = 0;
    let maxYearlyCost = 0;
    let yearlyMax = 0;


    const vbHeight = 1000;
    const vbWidth = 1600;
    const barWidth = vbWidth / 8;

    const getHorizontalAxis = () => {
        return years.map((year, index) => {
            return (
                <text key={`yearLabel_${index}`} x={((index * vbWidth / 4) + vbWidth / 8)} y={vbHeight + 30} fill='#fff' stroke="none" fontSize={40} textAnchor="middle" dominantBaseline="hanging">{year}</text>
            );
        });
    };

    const updateBarValues = (futureSaved: number, yearlyCostsByYear: number[]) => {

        yearlyCosts = yearlyCostsByYear;
        totalCosts = yearlyCostsByYear.reduce((a, b) => a + b, 0);
        percentageSaved = futureSaved / totalCosts;
        yearlySaved = yearlyCostsByYear.map(cost => Math.round(cost * percentageSaved));
        maxYearlyCost = Math.max(...yearlyCostsByYear);
        yearlyMax = Math.max(...yearlySaved, maxYearlyCost, defaultMax);
        // iterate cost bars
        costBarRefs.forEach((barRef, index) => {
            if (!barRef.current) return;
            const percentage = (yearlyCosts[index] / yearlyMax) * 100;
            const value = yearlyCosts[index];
            barRef.current.updateSize(percentage, value);
        });
        // iterate saved bars
        savedBarRefs.forEach((barRef, index) => {
            if (!barRef.current) return;
            const percentage = (yearlySaved[index] / yearlyMax) * 100;
            const value = yearlySaved[index];
            barRef.current.updateSize(percentage, value);
        });
    }

    const updateaBarColors = (colors: string[]) => {
        // iterate saved bars
        savedBarRefs.forEach((barRef) => {
            const color = colors[0];
            if (color !== undefined) {
                barRef.current != null && barRef.current.updateColors(color);
            }
        });
        // iterate cost bars
        costBarRefs.forEach((barRef) => {
            const color = colors[1];
            if (color !== undefined) {
                barRef.current != null && barRef.current.updateColors(color);
            }
        });
    };

    useImperativeHandle(ref, () => ({
        updateBarValues,
        updateaBarColors
    }));

    return (
        <div className={styles.barGraphContainer}>
            <svg width="100%" height="100%" viewBox={`-100 -100 ${vbWidth + 200} ${vbHeight + 200}`}>
                <defs>
                    <clipPath id="barGraphClipPath">
                        <rect x="0" y="-40" width={vbWidth} height={vbHeight + 40} />
                    </clipPath>
                </defs>
                <g clipPath="url(#barGraphClipPath)">
                    <g id="costBars">
                        <Bar
                            ref={costBar1Ref}
                            key={`cbar_0`}
                            x={0 * vbWidth / 4}
                            width={barWidth}
                        />
                        <Bar
                            ref={costBar2Ref}
                            key={`cbar_1`}
                            x={1 * vbWidth / 4}
                            width={barWidth}
                        />
                        <Bar
                            ref={costBar3Ref}
                            key={`cbar_2`}
                            x={2 * vbWidth / 4}
                            width={barWidth}
                        />
                        <Bar
                            ref={costBar4Ref}
                            key={`cbar_3`}
                            x={3 * vbWidth / 4}
                            width={barWidth}
                        />
                    </g>
                    <g id="savedBars">
                        <Bar
                            ref={savedBar1Ref}
                            key={`sbar_${0}`}
                            x={0 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                        <Bar
                            ref={savedBar2Ref}
                            key={`sbar_${1}`}
                            x={1 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                        <Bar
                            ref={savedBar3Ref}
                            key={`sbar_${2}`}
                            x={2 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                        <Bar
                            ref={savedBar4Ref}
                            key={`sbar_${3}`}
                            x={3 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                    </g>
                </g>
                {getHorizontalAxis()}

                <path d={`M 0 ${0} V${vbHeight} H${vbWidth}`} stroke="#fff" strokeOpacity=".5" fill="none" strokeWidth={1} />
                <rect x="-100" y="-100" width={vbWidth + 200} height={vbHeight + 200} fill="#fff" fillOpacity=".025" rx="20" ry="20" stroke="none" strokeOpacity="1" strokeWidth={5} />
            </svg>
        </div>
    );
});

export default BarGraph;