import { forwardRef } from "react";

type GraphLabelProps = {
    label: string
};

const GraphLabel = forwardRef<SVGRectElement, GraphLabelProps>(({ label }, ref) => {
    return (
        <g ref={ref}>
            <line x1="0" y1="0" x2="1600" y2="0" stroke="#212121" strokeWidth="1" strokeOpacity="0.5" />
            <text x={-10} y={0} fill='#212121' stroke="none" fontSize={30} textAnchor="end" dominantBaseline="middle">{label}</text>

        </g>
    );
})

export default GraphLabel;