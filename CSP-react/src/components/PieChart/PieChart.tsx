import styles from './PieChart.module.css';
import React from 'react';

interface PieChartProps {
    colors: string[];
}

const PieChart = (props: PieChartProps) => {
    //const colors = props.colors || ['#1086d5', '#f0f0f0'];
    const colors = props.colors || ['#1086d5', '#00539B'];
    const savedPath = React.createRef<SVGCircleElement>();

    React.useEffect(() => {
        test();
    }, []);

    const test = () => {
        console.log('savedPath.current', savedPath.current);
        savedPath.current?.setAttribute('stroke-dashoffset', '-25');
        setTimeout(() => {
            savedPath.current?.setAttribute('stroke-dashoffset', '0');
        }, 5000);
    }
    return (
        <div>
            <svg id="svg" width="500" height="500" viewBox="-100 -100 1200 1200">
                <defs>
                    <linearGradient
                        id="numberBackgroundGradient"
                        gradientUnits="userSpaceOnUse"
                        x1="0"
                        y1="-80"
                        x2="0"
                        y2="0"
                    >
                        <stop offset="0%" stop-color="#000" stop-opacity="0%" />
                        <stop offset="100%" stop-color="#000" stop-opacity="25%" />
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
                            stroke-opacity="1"
                            stroke-width="270"
                        ></circle>

                        <circle
                            id="circleBG"
                            cx="0"
                            cy="0"
                            r="300"
                            fill="none"
                            stroke={colors[0]}
                            stroke-opacity="1"
                            stroke-width="250"
                        ></circle>

                        <circle
                            ref={savedPath}
                            className={styles.savedPath}
                            cx="0"
                            cy="0"
                            r="300"
                            fill="none"
                            stroke={colors[1]}
                            stroke-width="250"
                            stroke-linecap="none"
                            pathLength="100"
                            stroke-dasharray="100 100"
                            stroke-dashoffset={50}
                        ></circle>

                        <g id="dividerPath">
                            <path
                                d="M175 0 H425"
                                stroke="#fff"
                                stroke-width="5"
                                stroke-linecap="none"
                            ></path>
                        </g>
                    </g>
                </g>

            </svg>
        </div>
    );
};

export default PieChart;