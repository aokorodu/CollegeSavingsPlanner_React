import { forwardRef } from "react";

type KeyLegendProps = {
    label: string;
};

const KeyItem = forwardRef<SVGRectElement, KeyLegendProps>(({ label }: KeyLegendProps, ref) => (
    <div>
        <svg width={"100%"} height={"100%"} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="key" >
                <rect ref={ref} x="5" y="0" width={50} height={50} fill="#ff0000ff" stroke="#212121" strokeWidth={3} strokeOpacity={0.6} rx="10" ry="10" />
                <text x={70} y={30} fill='#000000' stroke="none" fontSize={40} textAnchor="start" dominantBaseline="middle">{label}</text>
            </g>
        </svg>
    </div>
));

export default KeyItem;