import styles from './PieChart.module.css';
import React from 'react';
import { useEffect } from 'react';

interface PieChartProps {
    colors: string[];
    percentage: number;
}

const PieChart = ({ colors, percentage }: PieChartProps) => {
    console.log('PieChart render - percentage: ', percentage);
    const savedPath = React.createRef<SVGCircleElement>();

    return (
        <div>
            <svg id="svg" width="300" height="300" viewBox="0 0 1000 1000">
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
                            id="circleOutline"
                            cx="0"
                            cy="0"
                            r="300"
                            fill="none"
                            stroke="#f0f0f0"
                            strokeOpacity="1"
                            strokeWidth="270"
                        ></circle>

                        <circle
                            id="circleBG"
                            cx="0"
                            cy="0"
                            r="300"
                            fill="none"
                            stroke={colors[0]}
                            strokeOpacity="1"
                            strokeWidth="250"
                        ></circle>

                        <circle
                            ref={savedPath}
                            className={styles.savedPath}
                            cx="0"
                            cy="0"
                            r="300"
                            fill="none"
                            stroke={colors[1]}
                            strokeWidth="250"
                            strokeLinecap="none"
                            pathLength="100"
                            strokeDasharray="100 100"
                            strokeDashoffset={percentage > 100 ? 100 : -percentage}
                        ></circle>

                        <g id="dividerPath">
                            <path
                                d="M175 0 H425"
                                stroke="#fff"
                                strokeWidth="5"
                                strokeLinecap="none"
                            ></path>
                        </g>
                    </g>
                </g>

            </svg>
        </div>
    );
};

export default PieChart;