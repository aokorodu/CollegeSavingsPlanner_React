import { forwardRef } from "react";

type KeyLegendProps = {
    label: string;
};

const KeyItem = forwardRef<SVGRectElement, KeyLegendProps>(({ label }: KeyLegendProps, ref) => (
    <div>
        <svg width={"100%"} height={"100%"} viewBox="0 0 400 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="key" >
                <rect ref={ref} x="0" y="0" width={50} height={50} fill="#ff0000ff" fillOpacity=".8" rx="20" ry="20" />
                <text x={60} y={30} fill='#fff' stroke="none" fontSize={40} textAnchor="start" dominantBaseline="middle">{label}</text>
            </g>
        </svg>
    </div>
));

export default KeyItem;