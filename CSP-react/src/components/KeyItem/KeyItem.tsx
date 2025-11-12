import { forwardRef } from "react";
import styles from './KeyItem.module.css';

type KeyLegendProps = {
    label: string;
};
const size = "20px";

const KeyItem = forwardRef<SVGRectElement, KeyLegendProps>(({ label }: KeyLegendProps, ref) => (
    <div className={styles.holder}>
        <svg width={size} height={size} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect ref={ref} x="0" y="0" width={50} height={50} fill="#ff0000ff" stroke="#212121" strokeWidth={3} strokeOpacity={0.6} rx="10" ry="10" />
        </svg>
        <text>{label}</text>
    </div>
));

export default KeyItem;