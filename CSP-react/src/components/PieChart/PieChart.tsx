import styles from './PieChart.module.css';
import React, { forwardRef, useImperativeHandle } from 'react';
import GraduationCap from '../../assets/graduationCap';
import classNames from 'classnames';
// x
import KeyItem from '../KeyItem/KeyItem';
// types
import type { calcObject } from '../../types/types';

const PieChart = forwardRef((_, ref) => {

    const dividerColor = "#212121";
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const outlineRef = React.useRef<SVGCircleElement | null>(null);
    const bgRef = React.useRef<SVGCircleElement | null>(null);
    const arcRef = React.useRef<SVGCircleElement | null>(null);
    const percentTextRef = React.useRef<SVGTextElement | null>(null);

    // key
    const constKeyRef = React.useRef<SVGRectElement | null>(null);
    const savedKeyRef = React.useRef<SVGRectElement | null>(null);

    const strokeWidth = 200;
    const radius = 350;

    // textRefs
    const contributionsLabelRef = React.useRef<SVGTextElement | null>(null);
    const contributionsRef = React.useRef<SVGTextElement | null>(null);
    const projectedSavingsLabelRef = React.useRef<SVGTextElement | null>(null);
    const projectedSavingsRef = React.useRef<SVGTextElement | null>(null);
    const amountNeededRef = React.useRef<SVGTextElement | null>(null);
    const amountNeededLabelRef = React.useRef<SVGTextElement | null>(null);
    const totalCostRef = React.useRef<SVGTextElement | null>(null);

    // dimensions
    const vbHeight = 1000;
    const vbWidth = 1600;
    const vbMargin = 0;


    const updateChart = (calcData: calcObject) => {
        const { futureCost, futureSaved } = calcData;
        const percentage = (futureSaved / futureCost.futureCost) * 100;
        if (arcRef.current) {
            const offset = 100 - percentage < 0 ? 0 : 100 - percentage;
            arcRef.current.setAttribute("stroke-dashoffset", offset.toString());
            if (percentTextRef.current) {
                percentTextRef.current.textContent = `${Math.round(percentage)}%`;
            }
        }

        const futureSavings = futureCost.futureCost * (percentage / 100);
        let amountNeeded = futureCost.futureCost - futureSavings;

        if (projectedSavingsLabelRef.current) {
            projectedSavingsLabelRef.current.textContent = `projected savings over ${calcData.yearsToCollege} years`;
        }

        if (projectedSavingsRef.current) {
            projectedSavingsRef.current.textContent = `$${futureSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
        }
        if (amountNeededRef.current) {

            if (amountNeeded < 0) {
                amountNeeded *= -1;
                amountNeededLabelRef.current!.textContent = "excess savings *";
            } else {
                amountNeededLabelRef.current!.textContent = "amount needed";
            }
            amountNeededRef.current.textContent = `$${amountNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
        }
        if (totalCostRef.current) {
            totalCostRef.current.textContent = `$${futureCost.futureCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
        }

        if (contributionsLabelRef.current) {
            const prefix = getPrefix(calcData.periods);
            contributionsLabelRef.current.textContent = `with ${prefix} contributions of`;
        }

        if (contributionsRef.current) {
            contributionsRef.current.textContent = `$${calcData.contribution.toLocaleString()}`;
        }

        showExtra(percentage);
    }

    const getPrefix = (num: number): string => {
        let pre = "";
        switch (num) {
            case 1:
                pre = "annual ";
                break;
            case 4:
                pre = "quarterly ";
                break;
            case 12:
                pre = "monthly ";
                break;
            case 24:
                pre = "bi-monthly ";
                break;
            case 26:
                pre = "bi-weekly ";
                break;
            case 52:
                pre = "weekly ";
                break;
            default:
                pre = "";
        }
        return pre;
    }

    const updateColors = (colors: string[]) => {
        console.log("updating colors", colors);
        if (bgRef.current) {
            bgRef.current.setAttribute("stroke", colors[1]);
        }
        if (arcRef.current) {
            arcRef.current.setAttribute("stroke", colors[0]);
        }
        if (constKeyRef.current) {
            constKeyRef.current.setAttribute("fill", colors[0]);
        }
        if (savedKeyRef.current) {
            savedKeyRef.current.setAttribute("fill", colors[1]);
        }
    }

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
        updateChart,
        updateColors
    }));

    return (
        <>
            <div className={styles.keyContainer}>
                <KeyItem ref={constKeyRef} label="projected savings" />
                <KeyItem ref={savedKeyRef} label="projected amount needed" />
            </div>
            <div ref={containerRef} className={classNames(styles.pieChartContainer)}>

                <svg width="100%" height="100%" viewBox={`${-vbMargin} ${-vbMargin} ${vbWidth + vbMargin * 2} ${vbHeight + vbMargin * 2}`} preserveAspectRatio="xMidYMid meet" >

                    <g id="pieChart" className="graph">
                        <g transform="translate(500 500) rotate(-90)">
                            <circle
                                ref={outlineRef}
                                cx="0"
                                cy="0"
                                r={radius}
                                fill="none"
                                stroke={dividerColor}
                                strokeOpacity="1"
                                strokeWidth={strokeWidth + 4}
                            ></circle>

                            <circle
                                ref={bgRef}
                                cx="0"
                                cy="0"
                                r={radius}
                                fill="none"
                                stroke="#555879"
                                strokeOpacity="1"
                                strokeWidth={strokeWidth}
                            ></circle>

                            <circle
                                ref={arcRef}
                                className={styles.savedPath}
                                cx="0"
                                cy="0"
                                r={radius}
                                fill="none"
                                stroke="#98A1BC"
                                strokeWidth={strokeWidth}
                                strokeLinecap="inherit"
                                pathLength="100"
                                strokeDasharray="100 100"
                                strokeDashoffset=" -100"
                            ></circle>

                            <g id="dividerPath">
                                <path
                                    id="staticDivider"
                                    className={styles.savedPath}
                                    d={`M${radius - strokeWidth / 2} 0 H${radius + strokeWidth / 2}`}
                                    stroke={dividerColor}
                                    strokeWidth="2"
                                    strokeLinecap="inherit"
                                    transform="rotate(0)"
                                ></path>
                            </g>
                        </g>
                    </g>

                    <g transform="translate(370 290)">
                        <GraduationCap />
                    </g>
                    <text ref={percentTextRef} x={500} y={550} fill='#000000' stroke="none" fontSize={120} fontWeight="bold" textAnchor="middle" dominantBaseline="middle">%</text>
                    <text x={500} y={620} fill='#000000' stroke="none" fontSize={30} textAnchor="middle" dominantBaseline="middle">projected future Savings</text>

                    <g id="summaryText" transform="translate(1025 175)">
                        <text ref={contributionsLabelRef} className={styles.labelStyle} x={0} y={0} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">contributions</text>
                        <text ref={contributionsRef} className={styles.dollarStyle} x={0} y={70} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">$20,999</text>


                        <text ref={projectedSavingsLabelRef} className={styles.labelStyle} x={0} y={200} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">projected 529 savings</text>
                        <text ref={projectedSavingsRef} className={styles.dollarStyle} x={0} y={270} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">$20,999</text>

                        <text ref={amountNeededLabelRef} className={styles.labelStyle} x={0} y={400} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">additional amount needed</text>
                        <text ref={amountNeededRef} className={styles.dollarStyle} x={0} y={470} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">$20,999</text>

                        <text x={0} y={600} className={styles.labelStyle} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">total cost</text>
                        <text ref={totalCostRef} className={styles.dollarStyle} x={0} y={670} fill='#000000' stroke="none" textAnchor="start" dominantBaseline="middle">$20,999</text>
                    </g>
                </svg>
            </div></>
    );
});

export default PieChart;