import Bar from './Bar';
import styles from './BarGraph.module.css';
import classNames from 'classnames';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import GraphLabel from './GraphLabel';
import KeyItem from '../KeyItem/KeyItem';

const years = ['freshman', 'sohpmore', 'junior', 'senior'];

// type BarRef = {
//     updateSize: ({ percentage, value }: BarSizeProps) => void;
//     updateColors: (c: string) => void;
// };

const BarGraph = forwardRef((_, ref) => {

    const defaultMax = 50000;

    type BarRef = {
        updateSize: (percentage: number, value: number) => void;
        updateColors: (color: string) => void;
    } | null;

    const makeBarRef = () => React.useRef<BarRef>(null);
    const containerRef = React.useRef<HTMLDivElement | null>(null);

    const costBar1Ref = makeBarRef();
    const costBar2Ref = makeBarRef();
    const costBar3Ref = makeBarRef();
    const costBar4Ref = makeBarRef();

    const savedBar1Ref = makeBarRef();
    const savedBar2Ref = makeBarRef();
    const savedBar3Ref = makeBarRef();
    const savedBar4Ref = makeBarRef();
    const savedBarRefs = [savedBar1Ref, savedBar2Ref, savedBar3Ref, savedBar4Ref];
    const costBarRefs = [costBar1Ref, costBar2Ref, costBar3Ref, costBar4Ref];

    const savedKeyRectRef = useRef<SVGRectElement | null>(null);
    const costKeyRectRef = useRef<SVGRectElement | null>(null);

    const graphLabelRefs: Element[] = [];


    let totalCosts = 0;
    let yearlyCosts: number[] = [];
    let yearlySaved: number[] = [];
    let percentageSaved = 0;
    let maxYearlyCost = 0;
    let yearlyMax = 0;


    const vbHeight = 1000;
    const vbWidth = 1600;
    const vbMargin = 150;
    const yearGap = 40;
    const barWidth = vbWidth / 8 - yearGap;

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

        organizeGraphLabels();
        showExtra(percentageSaved * 100);
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

        // update key colors
        if (savedKeyRectRef.current) {
            const color = colors[0];
            if (color !== undefined) {
                savedKeyRectRef.current.setAttribute("fill", color);
            }
        }
        if (costKeyRectRef.current) {
            const color = colors[1];
            if (color !== undefined) {
                costKeyRectRef.current.setAttribute("fill", color);
            }
        }
    };

    const showExtra = (percentage: number) => {
        console.log("show extra called with percentage:", percentage);
        if (percentage > 100) {
            if (!containerRef.current?.classList.contains(styles.shrunk)) {
                containerRef.current?.classList.add(styles.shrunk);
            }

        } else {
            if (containerRef.current?.classList.contains(styles.shrunk)) {
                containerRef.current?.classList.remove(styles.shrunk);
            }
        }

    }

    useImperativeHandle(ref, () => ({
        updateBarValues,
        updateaBarColors
    }));

    const addToRefs = (el: SVGRectElement) => {
        if (el && !graphLabelRefs.includes(el)) {
            graphLabelRefs.push(el);
        }
    };


    const getGraphLabels = () => {
        const lines = [];
        const numLines = 40;
        for (let i = 1; i <= numLines; i++) {
            const labelValue = 50 * i;
            lines.push(
                <GraphLabel ref={addToRefs} key={`GraphLabel_${i}`} label={`${labelValue}k`} />
            );
        }
        return lines;
    }

    useEffect(() => {
        organizeGraphLabels();
    }, []);

    const organizeGraphLabels = () => {
        graphLabelRefs.forEach((labelRef, index) => {
            const value = (index + 1) * 50;
            const percentage = value * 1000 / yearlyMax;
            const yPos = vbHeight - (percentage * vbHeight);
            const transformString = `translate(0 ${yPos})`;
            labelRef.setAttribute("transform", transformString);
        });
    }

    return (
        <>
            <div className={styles.keyContainer}>
                <KeyItem label='projected future cost' ref={costKeyRectRef} />
                <KeyItem label='projected savings' ref={savedKeyRectRef} />
            </div>
            <div ref={containerRef} className={classNames(styles.barGraphContainer)}>
                <svg width="100%" height="100%" viewBox={`${-vbMargin} ${-vbMargin} ${vbWidth + vbMargin * 2} ${vbHeight + vbMargin * 2}`} preserveAspectRatio="xMidYMid meet" >
                    <defs>
                        <clipPath id="barGraphClipPath">
                            <rect x="0" y="-40" width={vbWidth} height={vbHeight + 40} />
                        </clipPath>
                    </defs>


                    <g id="background">
                        <rect x="-150" y="-150" width={vbWidth + 300} height={vbHeight + vbMargin * 2} fill="#212121" fillOpacity=".025" rx="20" ry="20" stroke="none" strokeOpacity="1" strokeWidth={5} />
                    </g>
                    <g id="graphLabels">
                        {getGraphLabels()}
                    </g>
                    <g clipPath="url(#barGraphClipPath)">
                        <g id="costBars">
                            <Bar
                                ref={costBar1Ref}
                                key={`cbar_0`}
                                x={0 * vbWidth / 4 + yearGap / 2}
                                width={barWidth}
                            />
                            <Bar
                                ref={costBar2Ref}
                                key={`cbar_1`}
                                x={1 * vbWidth / 4 + yearGap / 2}
                                width={barWidth}
                            />
                            <Bar
                                ref={costBar3Ref}
                                key={`cbar_2`}
                                x={2 * vbWidth / 4 + yearGap / 2}
                                width={barWidth}
                            />
                            <Bar
                                ref={costBar4Ref}
                                key={`cbar_3`}
                                x={3 * vbWidth / 4 + yearGap / 2}
                                width={barWidth}
                            />
                        </g>
                        <g id="savedBars">
                            <Bar
                                ref={savedBar1Ref}
                                key={`sbar_${0}`}
                                x={0 * vbWidth / 4 + 200 - yearGap / 2}
                                width={barWidth}
                            />
                            <Bar
                                ref={savedBar2Ref}
                                key={`sbar_${1}`}
                                x={1 * vbWidth / 4 + 200 - yearGap / 2}
                                width={barWidth}
                            />
                            <Bar
                                ref={savedBar3Ref}
                                key={`sbar_${2}`}
                                x={2 * vbWidth / 4 + 200 - yearGap / 2}
                                width={barWidth}
                            />
                            <Bar
                                ref={savedBar4Ref}
                                key={`sbar_${3}`}
                                x={3 * vbWidth / 4 + 200 - yearGap / 2}
                                width={barWidth}
                            />
                        </g>
                    </g>
                    {getHorizontalAxis()}

                    <path d={`M 0 ${0} V${vbHeight} H${vbWidth}`} stroke="#212121" strokeOpacity=".5" fill="none" strokeWidth={1} />

                </svg>
            </div></>
    );
});

export default BarGraph;