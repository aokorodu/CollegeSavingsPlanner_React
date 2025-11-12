import { useRef, useImperativeHandle, forwardRef } from 'react';
import styles from './Spinnertext.module.css';

const Spinnertext = forwardRef((_, ref) => {

    const spinnerRef = useRef<SVGGElement | null>(null);
    const spinnerTextRef = useRef<SVGTextElement | null>(null);
    const spinnerBGRef = useRef<SVGRectElement | null>(null);
    const lineRef = useRef<SVGLineElement | null>(null);

    const updateText = (percentage: number, value: number) => {
        let prefix = "";

        let angle = percentage > 100 ? 360 : (percentage / 100) * 360;
        let val = Math.round(percentage / 100 * value);
        let adjustedAngle = angle / 2 - 180;
        if (val < 0) {
            angle = 0;
            val = -val;
            adjustedAngle = -180;

            prefix = "extra ";
        }
        spinnerRef.current?.setAttribute("transform", `rotate(${adjustedAngle} 500 500)`);
        spinnerTextRef.current!.setAttribute("transform", `rotate(${-adjustedAngle})`);
        spinnerBGRef.current!.setAttribute("transform", `rotate(${-adjustedAngle})`);
        spinnerTextRef.current!.textContent = `${prefix}$${val.toLocaleString()}`;
    }

    useImperativeHandle(ref, () => ({
        updateText
    }));

    return (
        <g id="spinner" ref={spinnerRef} transform="rotate(-90 500 500)">
            <g transform="translate(500 500)">

                <g transform="translate(0 570)">
                    <line ref={lineRef} x1="0" y1="-50" x2="0" y2="-90" stroke="#212121" strokeWidth="2" />
                    <g>
                        <rect ref={spinnerBGRef} x="-100" y="-25" width="200" height="50" fill="#f5f5f5" />
                        <text className={styles.spinnerText} ref={spinnerTextRef} x="0" y="0" fill='#ffffff' stroke="none" textAnchor="middle" dominantBaseline="middle">$2,000,000</text>

                    </g>
                </g>
            </g>
        </g>
    );
});

export default Spinnertext;