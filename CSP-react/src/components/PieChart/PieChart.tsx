import styles from './PieChart.module.css';
import React, { forwardRef, useImperativeHandle } from 'react';
import GraduationCap from '../../assets/graduationCap';
import classNames from 'classnames';

const PieChart = forwardRef((props, ref) => {

    const dividerColor = "#212121";
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    const outlineRef = React.useRef<SVGCircleElement | null>(null);
    const bgRef = React.useRef<SVGCircleElement | null>(null);
    const arcRef = React.useRef<SVGCircleElement | null>(null);
    const dividerRef = React.useRef<SVGPathElement | null>(null);
    const percentTextRef = React.useRef<SVGTextElement | null>(null);
    const strokeWidth = 200;
    const radius = 350;

    const updatePercentage = (percentage: number) => {
        if (arcRef.current) {
            const offset = 100 - percentage < 0 ? 0 : 100 - percentage;
            arcRef.current.setAttribute("stroke-dashoffset", offset.toString());
            const angle = percentage > 100 ? 360 : (percentage / 100) * 360;
            dividerRef.current?.setAttribute("transform", `rotate(${angle})`);
            if (percentTextRef.current) {
                percentTextRef.current.textContent = `${Math.round(percentage)}%`;
            }
        }

        showExtra(percentage);
    };

    const updateColors = (colors: string[]) => {
        console.log("updating colors", colors);
        if (bgRef.current) {
            bgRef.current.setAttribute("stroke", colors[1]);
        }
        if (arcRef.current) {
            arcRef.current.setAttribute("stroke", colors[0]);
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
        updatePercentage,
        updateColors
    }));

    return (
        <div ref={containerRef} className={classNames(styles.pieChartContainer)}>
            <svg id="svg" width="100%" height="100%" viewBox="0 0 1000 1000">
                <defs>
                    <linearGradient
                        id="numberBackgroundGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="-80"
                        x2="0"
                        y2="0"
                    >
                        <stop offset="0%" stopColor="#000" stopOpacity="0%" />
                        <stop offset="100%" stopColor="#000" stopOpacity="25%" />
                    </linearGradient>
                    <g id="barGraphic">
                        <rect
                            x="5"
                            y="-2000"
                            width="245"
                            height="2000"
                            rx="10"
                            ry="10"
                        />
                        <rect
                            x="5"
                            y="-80"
                            width="245"
                            height="80"
                            rx="10"
                            ry="10"
                            fill="url(#numberBackgroundGradient)"
                            stroke="none"
                        />
                    </g>
                    <clipPath id="rectClip">
                        <rect x="0" y="0" width="1000" height="1000" />
                    </clipPath>
                    <clipPath id="axisClip">
                        <rect x="-100" y="0" width="1100" height="1000" />
                    </clipPath>
                </defs>
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
                            <path
                                ref={dividerRef}
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


            </svg>
        </div>
    );
});

export default PieChart;