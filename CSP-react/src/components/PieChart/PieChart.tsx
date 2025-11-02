import styles from './PieChart.module.css';
import React, { forwardRef, useImperativeHandle } from 'react';


const PieChart = forwardRef((props, ref) => {

    const outlineRef = React.useRef<SVGCircleElement | null>(null);
    const bgRef = React.useRef<SVGCircleElement | null>(null);
    const arcRef = React.useRef<SVGCircleElement | null>(null);
    const dividerRef = React.useRef<SVGPathElement | null>(null);
    const strokeWidth = 250;
    const radius = 300;

    const updatePercentage = (percentage: number) => {
        if (arcRef.current) {
            const offset = percentage > 100 ? -100 : -percentage;
            arcRef.current.setAttribute("stroke-dashoffset", offset.toString());
            const angle = percentage > 100 ? 360 : (percentage / 100) * 360;
            dividerRef.current?.setAttribute("transform", `rotate(${angle})`);
        }
    };

    const updateColors = (colors: string[]) => {
        console.log("updating colors", colors);
        if (bgRef.current) {
            bgRef.current.setAttribute("stroke", colors[0]);
        }
        if (arcRef.current) {
            arcRef.current.setAttribute("stroke", colors[1]);
        }
    }

    useImperativeHandle(ref, () => ({
        updatePercentage,
        updateColors
    }));

    return (
        <div className={styles.pieChartContainer}>
            <svg id="svg" width="500" height="500" viewBox="0 0 1000 1000">
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
                            stroke="#e0e0e0"
                            strokeOpacity="1"
                            strokeWidth={strokeWidth + 20}
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
                            strokeDashoffset=" -100 "
                        ></circle>

                        <g id="dividerPath">
                            <path
                                ref={dividerRef}
                                className={styles.savedPath}
                                d="M175 0 H425"
                                stroke="#fff"
                                strokeWidth="5"
                                strokeLinecap="inherit"
                                transform="rotate(0)"
                            ></path>
                        </g>
                    </g>
                </g>

            </svg>
        </div>
    );
});

export default PieChart;