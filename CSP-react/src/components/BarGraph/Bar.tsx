import styles from './Bar.module.css';
import React, { forwardRef, useImperativeHandle } from 'react';


type BarProps = {
    x: number;
    width: number;
};

export type BarSizeProps = {
    percentage: number;
    value: number;
};



const Bar = forwardRef(({ x, width }: BarProps, ref) => {
    const xpos = x;
    const barWidth = width;
    const barSpacing = 10;
    const barHeight = 1000;
    const barY = barHeight;
    const barRef = React.useRef<SVGRectElement | null>(null);
    const rectRef = React.useRef<SVGRectElement | null>(null);
    const textRef = React.useRef<SVGTextElement | null>(null);

    const updateSize = (percentage: number, value: number) => {
        console.log('bar: updating bar size:', { percentage, value });
        if (barRef.current) {

            const height = (percentage / 100) * barHeight;
            const ypos = barHeight - height;
            const transformString = `translate(${xpos} ${ypos})`;
            console.log('bar:', { percentage, barHeight, transformString });
            barRef.current!.setAttribute("transform", transformString);
            //textRef.current!.textContent = `$${value.toLocaleString()}`;
        }
    }

    const updateColors = (color: string) => {
        if (rectRef.current) {
            rectRef.current.setAttribute("fill", color);
        }
    }

    useImperativeHandle(ref, () => ({
        updateSize,
        updateColors
    }));

    return (
        <>
            <g ref={barRef} className={styles.barHolder} transform={`translate(${x} ${barY})`}>
                <rect className={styles.barRect} x={barSpacing / 2} y="0" width={barWidth - barSpacing} height={barHeight + 20} stroke="#eaeaea" strokeWidth={5} strokeOpacity={.2} fill="red" />
                <text x={barWidth / 2} y={-40} fill='#fff' stroke="none" fontSize={40} textAnchor="middle" dominantBaseline="hanging">$123.45</text>
            </g>
        </>);
})

export default Bar;