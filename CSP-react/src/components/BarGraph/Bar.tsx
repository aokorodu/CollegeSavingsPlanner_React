type BarProps = {
    x: number;
    percentage: number;
    color: string;
    value: number;
};

const Bar = ({ x, percentage, color, value }: BarProps) => {
    return (
        <>
            <g transform={`translate(${x} 1000) scale(1 -1)`}>
                <rect x={0} y={0} width={250} height={percentage * 10} stroke="#000" fill={color} />
                <text transform={`scale(1 -1)`} x={125} y={-percentage * 10 + 20} fill='#fff' stroke="none" fontSize={40} textAnchor="middle" dominantBaseline="hanging">{`$${value.toLocaleString()}`}</text>
            </g>
        </>);
};

export default Bar;