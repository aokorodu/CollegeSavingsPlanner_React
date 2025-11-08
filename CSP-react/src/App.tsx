
import './App.css'
import PieChart from './components/PieChart/PieChart';
import BarGraph from './components/BarGraph/BarGraph';
import React, { useEffect, useRef, useState } from 'react';
import { getDollarString, convertToDollarString } from './utils/Utils';
import { calculateFutureValue, calculateFutureCost } from './data/calculator';
import SliderHolder from './components/SlideHolder/SlideHolder';
import InfoHolder from './components/uicomponents/InfoHolder/InfoHolder';
import { getCollegesByState2, stateNames } from './data/costData';
import GraphButton from './components/GraphButton/GraphButton';
import KeyItem from './components/KeyItem/KeyItem';
import ContentHolder from './components/uicomponents/ContentHolder/ContentHolder';
import Header from './components/uicomponents/Header/Header';
import WhatIs from './components/uicomponents/WhatIsSection/WhatIs';
import Modal from './components/Modals/Modal';
import Disclaimer from './components/GraphButton/Disclaimer/Disclaimer';

// material ui
import { Select, TextField, FormControl, FormHelperText } from '@mui/material';



type College = {
  name: string;
  cost: number;
  colors: string[];
};

type FCost = {
  futureCost: number,
  yearlyCostByYear: number[],
};

type calcObject = {
  selectedCollege?: College | null;
  currentCost?: number;
  yearsToCollege: number;
  initialBalance: number;
  annualRateOfReturn: number;
  annalCostIncrease: number;
  periods: number;
  contribution: number;
  futureSaved: number;
  futureCost: FCost;
  expenseRatio: number;
}

function App() {
  const defaultData: calcObject = {
    selectedCollege: null,
    currentCost: 0,
    yearsToCollege: 17,
    initialBalance: 0,
    annualRateOfReturn: 6,
    annalCostIncrease: 4,
    periods: 12,
    contribution: 100,
    futureSaved: 0,
    futureCost: { futureCost: 0, yearlyCostByYear: [0, 0, 0, 0] },
    expenseRatio: 0.48,
  };

  const defaultColors = ["#4ACCFF", "#eaeaea"];
  const yearsOfCollege = 4;
  const initialColleges = getCollegesByState2("The Average State");
  const [colleges, setColleges] = useState<College[]>(initialColleges);
  const [pieChartActive, setPieChartActive] = useState(true);
  let selectedState: string = 'The Average State';
  let selectedCollege: College | null = initialColleges[2] ?? null;
  let data = useRef<calcObject>(defaultData);

  // graph refs
  const pieChartRef = React.useRef<{ updatePercentage: (p: number) => void; updateColors: (c: string[]) => void } | null>(null);
  const barGraphRef = React.useRef<{ updateBarValues: (f: number, c: number[]) => void; updateaBarColors: (c: string[]) => void } | null>(null);
  const costKeyRectRef = React.useRef<SVGRectElement | null>(null);
  const savedKeyRectRef = React.useRef<SVGRectElement | null>(null);

  // dropdowns refs
  const stateDropdownRef = React.useRef<HTMLSelectElement>(null);
  const collegeDropdownRef = React.useRef<HTMLSelectElement>(null);

  // slider refs
  const yearsToCollegeSliderRef = React.useRef<HTMLInputElement>(null);
  const annualCostSliderRef = React.useRef<HTMLInputElement>(null);
  const rateOfReturnSliderRef = React.useRef<HTMLInputElement>(null);
  const costIncreaseSliderRef = React.useRef<HTMLInputElement>(null);
  const plannedContributionRef = React.useRef<HTMLInputElement>(null);
  const expenseRatioSliderRef = React.useRef<HTMLInputElement>(null);

  // text refs
  const yearsToCollegeRef = React.useRef<HTMLSpanElement>(null);
  const annualCostRef = React.useRef<HTMLSpanElement>(null);
  const rateOfReturnRef = React.useRef<HTMLSpanElement>(null);
  const costIncreaseRef = React.useRef<HTMLSpanElement>(null);
  const contributionRef = React.useRef<HTMLSpanElement>(null);
  const initialContributionRef = React.useRef<HTMLInputElement>(null);
  const expenseRatioRef = React.useRef<HTMLSpanElement>(null);


  // refs for future values
  const futureAmountSavedRef = React.useRef<HTMLSpanElement>(null);
  const futureCostRef = React.useRef<HTMLSpanElement>(null);
  const futureAmountNeededRef = React.useRef<HTMLSpanElement>(null);
  const percentSavedRef = React.useRef<HTMLSpanElement>(null);

  // modal props
  type ModalState = {
    type: "none" | "expense_ratio" | "cost_increase" | "ror";
  }

  const [showModal, setShowModal] = useState<ModalState>({ type: "none" });

  useEffect(() => {
    init();
    calculateAmounts();
  }, []);

  const init = () => {
    data.current.currentCost = selectedCollege ? selectedCollege.cost : 0;
    // select menus

    if (collegeDropdownRef.current && selectedCollege) {
      collegeDropdownRef.current.value = JSON.stringify(selectedCollege);
    }
    // initialize sliders
    if (yearsToCollegeSliderRef.current) {
      yearsToCollegeSliderRef.current.value = data.current.yearsToCollege.toString();
    }
    if (annualCostSliderRef.current) {
      annualCostSliderRef.current.value = data.current.currentCost?.toString() || "0";
    }
    if (rateOfReturnSliderRef.current) {
      rateOfReturnSliderRef.current.value = data.current.annualRateOfReturn.toString();
    }

    if (costIncreaseSliderRef.current) {
      costIncreaseSliderRef.current.value = data.current.annalCostIncrease.toString();
    }
    if (plannedContributionRef.current) {
      plannedContributionRef.current.value = data.current.contribution.toString();
    }
    // initialize text refs
    if (yearsToCollegeRef.current) {
      yearsToCollegeRef.current.innerText = data.current.yearsToCollege.toString();
    }
    if (annualCostRef.current) {
      annualCostRef.current.innerText = getDollarString(data.current.currentCost || 0);
    }
    if (rateOfReturnRef.current) {
      rateOfReturnRef.current.innerText = `${data.current.annualRateOfReturn}%`;
    }
    if (costIncreaseRef.current) {
      costIncreaseRef.current.innerText = `${data.current.annalCostIncrease}%`;
    }
    if (contributionRef.current) {
      contributionRef.current.innerText = getDollarString(data.current.contribution);
    }
    if (initialContributionRef.current) {
      initialContributionRef.current.value = convertToDollarString(data.current.initialBalance);
    }
    if (futureCostRef.current) {
      futureCostRef.current.innerText = getDollarString(data.current.futureCost.futureCost);
    }
    if (futureAmountSavedRef.current) {
      futureAmountSavedRef.current.innerText = getDollarString(0);
    }

    if (futureAmountNeededRef.current) {
      futureAmountNeededRef.current.innerText = getDollarString(data.current.futureCost.futureCost - data.current.futureSaved);
    }
    if (percentSavedRef.current) {
      percentSavedRef.current.innerText = "0%";
    }
  }
  // college selected or cost changed
  const calculateAmounts = () => {
    //data.current.contribution = parseInt(plannedContributionRef.current?.value || "0"); // retain contribution value
    //data.current.currentCost = parseInt(annualCostSliderRef.current?.value || "0"); // selectedCollege ? selectedCollege.cost : 0;

    const futureCostResult = calculateFutureCost({ yearlyCost: data.current.currentCost || 0, annualCostIncrease: data.current.annalCostIncrease, yearsToCollege: data.current.yearsToCollege, yearsOfCollege });

    const futureSaved = calculateFutureValue({ annualRateOfReturn: data.current.annualRateOfReturn, expenseRatio: data.current.expenseRatio, periodsPerYear: data.current.periods, years: data.current.yearsToCollege, initialInvestment: data.current.initialBalance, periodicContribution: data.current.contribution });

    // assign returned object properties to data.current.futureCost
    data.current.futureCost.futureCost = futureCostResult.futureCost;
    data.current.futureCost.yearlyCostByYear = futureCostResult.yearlyCostByYear;
    data.current.futureSaved = futureSaved;

    updateContent();
    updateGraphs();
  }

  const updateContent = () => {
    if (futureAmountSavedRef.current) {
      futureAmountSavedRef.current.innerText = getDollarString(data.current.futureSaved);
    }
    if (futureCostRef.current) {
      futureCostRef.current.innerText = getDollarString(data.current.futureCost.futureCost);
    }
    if (futureAmountNeededRef.current) {
      const amountNeeded = data.current.futureCost.futureCost - data.current.futureSaved;
      futureAmountNeededRef.current.innerText = getDollarString(amountNeeded < 0 ? 0 : amountNeeded);
    }
    if (percentSavedRef.current) {
      let percentage = data.current.futureSaved / data.current.futureCost.futureCost * 100;
      if (isNaN(percentage)) percentage = 0;
      percentSavedRef.current.innerText = `${percentage.toFixed(2)}%`;
    }

  }

  const updateGraphs = () => {
    const percentage = data.current.futureSaved / data.current.futureCost.futureCost * 100;
    let colors = collegeDropdownRef.current?.value ? JSON.parse(collegeDropdownRef.current.value).colors : defaultColors;
    if (colors.length === 0) {
      colors = defaultColors;
    }
    if (pieChartRef.current) {
      pieChartRef.current?.updatePercentage(percentage);
      pieChartRef.current.updateColors(colors);
    }

    if (barGraphRef.current) {
      barGraphRef.current.updateBarValues(data.current.futureSaved, data.current.futureCost.yearlyCostByYear);
      barGraphRef.current.updateaBarColors(colors);
    }
    costKeyRectRef.current?.setAttribute("fill", colors[1]);
    savedKeyRectRef.current?.setAttribute("fill", colors[0]);
  }

  const getCollegeSelections = () => {
    const newArr = colleges.map((college, index) => {
      return (
        <option
          key={`${college.name}_${index}`}
          selected={false}
          value={JSON.stringify(college)}
        >
          {college.name}
        </option>
      );
    });
    return newArr;
  }

  const selectNewState = (newState: string) => {
    selectedState = newState;
    const collegeArray = getCollegesByState2(selectedState);
    setColleges(collegeArray);
    selectedCollege = collegeArray[0] || null;
  }

  const selectNewCollege = (newCollege: College) => {
    selectedCollege = newCollege;
    data.current.selectedCollege = newCollege;
    data.current.currentCost = newCollege.cost;
    if (annualCostRef.current) {
      annualCostRef.current.innerText = getDollarString(newCollege.cost);
    }
    if (annualCostSliderRef.current) {
      annualCostSliderRef.current.value = newCollege.cost.toString();
    }


    calculateAmounts();
  }

  return (
    <>
      <ContentHolder>
        <div>
          <Header />
          <WhatIs />

          <div id="graphContainer">

            <div className="keyContainer">
              <KeyItem label='future cost' ref={costKeyRectRef} />
              <KeyItem label='future savings' ref={savedKeyRectRef} />
            </div>
            <div className={`chartContainer ${pieChartActive ? '' : 'chartContainerHiddenLeft'}`}>
              <PieChart ref={pieChartRef} />
            </div>
            <div className={`chartContainer ${pieChartActive ? 'chartContainerHiddenRight' : ''}`}>
              <BarGraph ref={barGraphRef} />
            </div>

            <div className="graphButtonHolder">
              {/* pie chart button */}
              <GraphButton isActive={pieChartActive} imageURL="https://zuubadigital-bucket-test.s3.us-west-2.amazonaws.com/images/pieChartIcon.svg" altText="Change Graph Type" onClick={() => {
                console.log("change graphs clicked");
                setPieChartActive(true);
              }} />
              {/* bar graph button */}
              <GraphButton isActive={!pieChartActive} imageURL="https://zuubadigital-bucket-test.s3.us-west-2.amazonaws.com/images/barGraphIcon.svg" altText="Reset Graphs" onClick={() => {
                console.log("change graphs clicked");
                setPieChartActive(false);
              }} />
            </div>
          </div>

          <div id="controlsContainer">
            {/* select state and college */}
            <InfoHolder>
              <FormControl>
                <FormHelperText>select state</FormHelperText>
                <Select
                  native
                  inputRef={stateDropdownRef}
                  defaultValue={selectedState}
                  onChange={(e) => {
                    selectNewState(e.target.value as string);
                  }}
                >
                  {stateNames.map((state) => (
                    <option key={String(state)} value={state}>
                      {state}
                    </option>
                  ))}
                </Select>

              </FormControl>
              <FormControl fullWidth={true}>
                <FormHelperText>select college</FormHelperText>
                <Select
                  fullWidth={true}
                  native
                  inputRef={collegeDropdownRef}
                  className="collegeDropdown"
                  defaultValue={selectedCollege ? JSON.stringify(selectedCollege) : "placeholder"}
                  onChange={(e) => {
                    const val = e.target.value as string;
                    if (val === "placeholder") return;
                    selectNewCollege(JSON.parse(val) as College);
                  }}
                >
                  <option value="placeholder">Select an option...</option>
                  {getCollegeSelections()}
                </Select>
              </FormControl>
            </InfoHolder>

            {/* select years until college */}
            <SliderHolder>
              <label htmlFor="yearsSlider">years until college</label>
              <input
                ref={yearsToCollegeSliderRef}
                type="range"
                min="1"
                max="30"
                step=".1"
                onChange={(e) => {
                  const yrs = parseInt(e.target.value);
                  data.current.yearsToCollege = yrs;
                  if (yearsToCollegeRef.current) {
                    yearsToCollegeRef.current.innerText = yrs.toString();
                  }

                  calculateAmounts();
                }}
              />
              <span ref={yearsToCollegeRef}>17</span>
            </SliderHolder>

            {/* select annual const */}
            <SliderHolder>
              <label htmlFor="annualCollegeCostSlider">current cost</label>
              <input
                ref={annualCostSliderRef}
                type="range"
                min="0"
                max="100000"
                step="100"
                onChange={(e) => {
                  const cost = parseInt(e.target.value);
                  selectedCollege = {
                    name: "Custom College",
                    cost: cost,
                    colors: defaultColors,
                  };
                  data.current.selectedCollege = selectedCollege;
                  data.current.currentCost = cost;
                  annualCostRef.current!.innerText = getDollarString(cost);
                  calculateAmounts();
                }}
              />
              <span ref={annualCostRef}>$0</span>
            </SliderHolder>

            {/* select rate of return */}
            <SliderHolder>
              <label className='helpLabel' htmlFor="ROfRSlider" onClick={() => { setShowModal({ type: "ror" }) }}>rate of return</label>
              <input
                ref={rateOfReturnSliderRef}
                type="range"
                min="0"
                max="10"
                step=".1"
                onChange={(e) => {
                  const ror = parseFloat(e.target.value);
                  data.current.annualRateOfReturn = ror;
                  if (rateOfReturnRef.current) {
                    rateOfReturnRef.current.innerText = `${ror}%`;
                  }

                  calculateAmounts();
                }}
              />
              <span ref={rateOfReturnRef}>0%</span>
            </SliderHolder>

            {/* select yearly cost increase */}
            <SliderHolder>
              <label className='helpLabel' htmlFor="costIncreaseSlider" onClick={() => { setShowModal({ type: "cost_increase" }) }}>cost increase</label>
              <input
                ref={costIncreaseSliderRef}
                type="range"
                min="0"
                max="10"
                step=".1"
                onChange={(e) => {
                  const ci = parseFloat(e.target.value);
                  data.current.annalCostIncrease = ci;
                  if (costIncreaseRef.current) {
                    costIncreaseRef.current.innerText = `${ci}%`;
                  }

                  calculateAmounts();
                }}
              />
              <span ref={costIncreaseRef}>{data.current.annalCostIncrease}%</span>
            </SliderHolder>

            {/* select expense ratio */}
            <SliderHolder>
              <label className='helpLabel' htmlFor="expenseRatioSlider" onClick={() => { setShowModal({ type: "expense_ratio" }) }}>expense ratio</label>
              <input
                ref={expenseRatioSliderRef}
                type="range"
                min="0.1"
                max="1.0"
                step="0.01"
                onChange={(e) => {
                  const er = parseFloat(e.target.value);
                  data.current.expenseRatio = er;
                  if (expenseRatioRef.current) {
                    expenseRatioRef.current.innerText = `${er}%`;
                  }

                  calculateAmounts();
                }}
              />
              <span ref={expenseRatioRef}>{data.current.expenseRatio}%</span>
            </SliderHolder>

            {/* select contribution cadence */}
            <SliderHolder>
              <div>
                <Select
                  variant="standard"
                  native
                  defaultValue={"12"}
                  onChange={(e) => {
                    data.current.periods = parseInt(e.target.value as string);
                    calculateAmounts();
                  }}
                >
                  <option value="56">weekly contribution</option>
                  <option value="26">bi-weekly contribution</option>
                  <option value="24">bi-monthly contribution</option>
                  <option value="12">monthly contribution</option>
                  <option value="4">quarterly contribution</option>
                  <option value="1">yearly contribution</option>
                </Select>
              </div>

              <input
                type="range"
                ref={plannedContributionRef}
                min="0"
                max="3000"
                step="25"
                onChange={(e) => {
                  const contribution = parseInt(e.target.value);
                  contributionRef.current!.innerText = getDollarString(contribution);
                  data.current.contribution = contribution;
                  calculateAmounts();
                }}
              />
              <span ref={contributionRef}>
                000
              </span>
            </SliderHolder>

            {/* input current amount saved */}
            <InfoHolder>
              <label htmlFor="startingAmountInput">current amount saved</label>
              <TextField
                id="startingAmountInput"
                inputRef={initialContributionRef}

                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  let value = e.target.value.replace(/[^0-9.]/g, "");
                  if (value === "") {
                    if (initialContributionRef.current) initialContributionRef.current.value = "";
                    data.current.initialBalance = 0;
                    calculateAmounts();
                    return;
                  }
                  let num = parseFloat(value);
                  if (isNaN(num)) num = 0;
                  data.current.initialBalance = num;
                  if (initialContributionRef.current) initialContributionRef.current.value = convertToDollarString(num);
                  calculateAmounts();
                }}
              />
            </InfoHolder>
          </div>



        </div>









      </ContentHolder>
      <div id="resultsContainer" className='resultsContainer'>
        <h2>SUMMARY:</h2>
        <InfoHolder>
          <label>projected future savings *</label>
          <span ref={futureAmountSavedRef}>$0</span>
        </InfoHolder>

        <InfoHolder>
          <label>projected future cost **</label>
          <span ref={futureCostRef}>$0</span>
        </InfoHolder>

        <InfoHolder>
          <label>amount for which you'll need funding</label>
          <span ref={futureAmountNeededRef}>$0</span>
        </InfoHolder>

        <InfoHolder>
          <label>percent saved</label>
          <span ref={percentSavedRef}>0%</span>
        </InfoHolder>
      </div>

      <Disclaimer />
      {showModal.type !== "none" &&
        <Modal type={showModal.type} onClose={() => setShowModal({ type: "none" })}>
        </Modal>}
    </>
  )
}

export default App;
