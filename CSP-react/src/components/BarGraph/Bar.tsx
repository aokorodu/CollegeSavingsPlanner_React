import styles from './Bar.module.css';

type BarProps = {
    x: number;
    width?: number;
    percentage: number;
    color: string;
    value: number;
};



const Bar = ({ x, width = 200, percentage, color, value }: BarProps) => {
    const barWidth = width;
    const barSpacing = 10;
    const barHeight = 1000;
    const barY = barHeight - (percentage * 10);

    return (
        <>
            <g transform={`translate(${x} ${barY})`}>
                <rect className={styles.barRect} x={barSpacing / 2} y={0} width={barWidth - barSpacing} height={barHeight + 20} stroke="#eaeaea" strokeWidth={5} strokeOpacity={.2} fill={color} />
                <text x={barWidth / 2} y={-40} fill='#fff' stroke="none" fontSize={40} textAnchor="middle" dominantBaseline="hanging">{`$${value.toLocaleString()}`}</text>
            </g>
        </>);
};

export default Bar;