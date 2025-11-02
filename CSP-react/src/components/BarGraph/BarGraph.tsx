import Bar from './Bar';
import styles from './BarGraph.module.css';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const years = ['first year', 'sohpmore', 'junior', 'senior'];

// type BarRef = {
//     updateSize: ({ percentage, value }: BarSizeProps) => void;
//     updateColors: (c: string) => void;
// };

const BarGraph = forwardRef((props, ref) => {

    const defaultMax = 200000;

    type BarRef = {
        updateSize: (percentage: number, value: number) => void;
        updateColors: (color: string) => void;
    } | null;

    const makeBarRef = () => React.useRef<BarRef>(null);

    const costBar1Ref = makeBarRef();
    const costBar2Ref = makeBarRef();
    const costBar3Ref = makeBarRef();
    const costBar4Ref = makeBarRef();

    const savedBar1Ref = makeBarRef();
    const savedBar2Ref = makeBarRef();
    const savedBar3Ref = makeBarRef();
    const savedBar4Ref = makeBarRef();
    const savedBarRefs = [savedBar1Ref, savedBar2Ref, savedBar3Ref, savedBar4Ref];
    const costBarRefs = [costBar1Ref, costBar2Ref, costBar3Ref, costBar4Ref];

    const savedKeyRectRef = useRef<SVGRectElement | null>(null);
    const costKeyRectRef = useRef<SVGRectElement | null>(null);


    let totalCosts = 0;
    let yearlyCosts: number[] = [];
    let yearlySaved: number[] = [];
    let percentageSaved = 0;
    let maxYearlyCost = 0;
    let yearlyMax = 0;


    const vbHeight = 1000;
    const vbWidth = 1600;
    const vbMargin = 150;
    const barWidth = vbWidth / 8;

    const getHorizontalAxis = () => {
        return years.map((year, index) => {
            return (
                <text key={`yearLabel_${index}`} x={((index * vbWidth / 4) + vbWidth / 8)} y={vbHeight + 30} fill='#fff' stroke="none" fontSize={40} textAnchor="middle" dominantBaseline="hanging">{year}</text>
            );
        });
    };

    const updateBarValues = (futureSaved: number, yearlyCostsByYear: number[]) => {

        yearlyCosts = yearlyCostsByYear;
        totalCosts = yearlyCostsByYear.reduce((a, b) => a + b, 0);
        percentageSaved = futureSaved / totalCosts;
        yearlySaved = yearlyCostsByYear.map(cost => Math.round(cost * percentageSaved));
        maxYearlyCost = Math.max(...yearlyCostsByYear);
        yearlyMax = Math.max(...yearlySaved, maxYearlyCost, defaultMax);
        // iterate cost bars
        costBarRefs.forEach((barRef, index) => {
            if (!barRef.current) return;
            const percentage = (yearlyCosts[index] / yearlyMax) * 100;
            const value = yearlyCosts[index];
            barRef.current.updateSize(percentage, value);
        });
        // iterate saved bars
        savedBarRefs.forEach((barRef, index) => {
            if (!barRef.current) return;
            const percentage = (yearlySaved[index] / yearlyMax) * 100;
            const value = yearlySaved[index];
            barRef.current.updateSize(percentage, value);
        });
    }

    const updateaBarColors = (colors: string[]) => {
        // iterate saved bars
        savedBarRefs.forEach((barRef) => {
            const color = colors[0];
            if (color !== undefined) {
                barRef.current != null && barRef.current.updateColors(color);
            }
        });
        // iterate cost bars
        costBarRefs.forEach((barRef) => {
            const color = colors[1];
            if (color !== undefined) {
                barRef.current != null && barRef.current.updateColors(color);
            }
        });

        // update key colors
        if (savedKeyRectRef.current) {
            const color = colors[0];
            if (color !== undefined) {
                savedKeyRectRef.current.setAttribute("fill", color);
            }
        }
        if (costKeyRectRef.current) {
            const color = colors[1];
            if (color !== undefined) {
                costKeyRectRef.current.setAttribute("fill", color);
            }
        }
    };

    useImperativeHandle(ref, () => ({
        updateBarValues,
        updateaBarColors
    }));

    return (
        <div className={styles.barGraphContainer}>
            <svg width="100%" height="100%" viewBox={`${-vbMargin} ${-vbMargin} ${vbWidth + vbMargin * 2} ${vbHeight + vbMargin * 2}`} preserveAspectRatio="xMidYMid meet" >
                <defs>
                    <clipPath id="barGraphClipPath">
                        <rect x="0" y="-40" width={vbWidth} height={vbHeight + 40} />
                    </clipPath>
                </defs>

                {/* <g id="key" transform='translate(490 -135)'>
                    <rect ref={costKeyRectRef} x="0" y="0" width={50} height={50} fill="#ff0000ff" fillOpacity=".8" rx="20" ry="20" />
                    <text x={60} y={30} fill='#fff' stroke="none" fontSize={40} textAnchor="start" dominantBaseline="middle">Yearly Cost</text>
                    <rect ref={savedKeyRectRef} x="300" y="0" width={50} height={50} fill="#00ff00ff" fillOpacity=".8" rx="20" ry="20" />
                    <text x={360} y={30} fill='#fff' stroke="none" fontSize={40} textAnchor="start" dominantBaseline="middle">Yearly Saved</text>

                </g> */}


                <g id="background">
                    <rect x="-150" y="-150" width={vbWidth + 300} height={vbHeight + vbMargin * 2} fill="#fff" fillOpacity=".025" rx="20" ry="20" stroke="none" strokeOpacity="1" strokeWidth={5} />
                </g>
                <g clipPath="url(#barGraphClipPath)">
                    <g id="costBars">
                        <Bar
                            ref={costBar1Ref}
                            key={`cbar_0`}
                            x={0 * vbWidth / 4}
                            width={barWidth}
                        />
                        <Bar
                            ref={costBar2Ref}
                            key={`cbar_1`}
                            x={1 * vbWidth / 4}
                            width={barWidth}
                        />
                        <Bar
                            ref={costBar3Ref}
                            key={`cbar_2`}
                            x={2 * vbWidth / 4}
                            width={barWidth}
                        />
                        <Bar
                            ref={costBar4Ref}
                            key={`cbar_3`}
                            x={3 * vbWidth / 4}
                            width={barWidth}
                        />
                    </g>
                    <g id="savedBars">
                        <Bar
                            ref={savedBar1Ref}
                            key={`sbar_${0}`}
                            x={0 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                        <Bar
                            ref={savedBar2Ref}
                            key={`sbar_${1}`}
                            x={1 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                        <Bar
                            ref={savedBar3Ref}
                            key={`sbar_${2}`}
                            x={2 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                        <Bar
                            ref={savedBar4Ref}
                            key={`sbar_${3}`}
                            x={3 * vbWidth / 4 + 200}
                            width={barWidth}
                        />
                    </g>
                </g>
                {getHorizontalAxis()}

                <path d={`M 0 ${0} V${vbHeight} H${vbWidth}`} stroke="#fff" strokeOpacity=".5" fill="none" strokeWidth={1} />

            </svg>
        </div>
    );
});

export default BarGraph;