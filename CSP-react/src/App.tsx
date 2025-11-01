
import './App.css'
import PieChart from './components/PieChart/PieChart';
import BarGraph from './components/BarGraph/BarGraph';
import React, { useEffect, useState } from 'react';
import { formatToDollarString, getDollarString, convertToDollarString } from './utils/Utils';
import { calculateAmountSaved, calculateFutureCost } from './data/calculator';
import SliderHolder from './components/SlideHolder/SlideHolder';
import InfoHolder from './components/InfoHolder/InfoHolder';
import { getCollegesByState2, stateNames } from './data/costData';


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
    contribution: 0,
    futureSaved: 0,
    futureCost: { futureCost: 0, yearlyCostByYear: [0, 0, 0, 0] },
  };

  const defaultColors = ["#98A1BC", "#555879"];
  const yearsOfCollege = 4;
  const initialColleges = getCollegesByState2("Average");
  const [colleges, setColleges] = useState<College[]>(initialColleges);
  let selectedState: string = 'Average';
  let selectedCollege: College | null = initialColleges[2] ?? null;
  let data = defaultData;

  // dropdowns refs
  const stateDropdownRef = React.useRef<HTMLSelectElement>(null);
  const collegeDropdownRef = React.useRef<HTMLSelectElement>(null);

  // slider refs
  const yearsToCollegeSliderRef = React.useRef<HTMLInputElement>(null);
  const annualCostSliderRef = React.useRef<HTMLInputElement>(null);
  const rateOfReturnSliderRef = React.useRef<HTMLInputElement>(null);
  const costIncreaseSliderRef = React.useRef<HTMLInputElement>(null);

  //
  const yearsToCollegeRef = React.useRef<HTMLSpanElement>(null);
  const annualCostRef = React.useRef<HTMLSpanElement>(null);
  const rateOfReturnRef = React.useRef<HTMLSpanElement>(null);
  const costIncreaseRef = React.useRef<HTMLSpanElement>(null);
  const contributionRef = React.useRef<HTMLSpanElement>(null);
  const initialContributionRef = React.useRef<HTMLInputElement>(null);
  const plannedContributionRef = React.useRef<HTMLInputElement>(null);

  // refs for future values
  const futureAmountSavedRef = React.useRef<HTMLSpanElement>(null);
  const futureCostRef = React.useRef<HTMLSpanElement>(null);
  const percentSavedRef = React.useRef<HTMLSpanElement>(null);

  useEffect(() => {
    init();
    calculateAmounts();
  }, []);

  const init = () => {
    // select menus
    console.log('selectedCollege: ', selectedCollege);
    if (collegeDropdownRef.current && selectedCollege) {
      collegeDropdownRef.current.value = JSON.stringify(selectedCollege);
    }
    // initialize sliders
    if (yearsToCollegeSliderRef.current) {
      yearsToCollegeSliderRef.current.value = data.yearsToCollege.toString();
    }
    if (annualCostSliderRef.current) {
      annualCostSliderRef.current.value = data.currentCost?.toString() || "0";
    }
    if (rateOfReturnSliderRef.current) {
      rateOfReturnSliderRef.current.value = data.annualRateOfReturn.toString();
    }

    if (costIncreaseSliderRef.current) {
      costIncreaseSliderRef.current.value = data.annalCostIncrease.toString();
    }
    if (plannedContributionRef.current) {
      plannedContributionRef.current.value = data.contribution.toString();
    }
    // initialize text refs
    if (yearsToCollegeRef.current) {
      yearsToCollegeRef.current.innerText = data.yearsToCollege.toString();
    }
    if (annualCostRef.current) {
      annualCostRef.current.innerText = getDollarString(data.currentCost || 0);
    }
    if (rateOfReturnRef.current) {
      rateOfReturnRef.current.innerText = `${data.annualRateOfReturn}%`;
    }
    if (costIncreaseRef.current) {
      costIncreaseRef.current.innerText = `${data.annalCostIncrease}%`;
    }
    if (contributionRef.current) {
      contributionRef.current.innerText = getDollarString(data.contribution);
    }
    if (initialContributionRef.current) {
      initialContributionRef.current.value = convertToDollarString(data.initialBalance);
    }
    if (futureCostRef.current) {
      futureCostRef.current.innerText = getDollarString(data.futureCost.futureCost);
    }
    if (futureAmountSavedRef.current) {
      futureAmountSavedRef.current.innerText = getDollarString(0);
    }
    if (percentSavedRef.current) {
      percentSavedRef.current.innerText = "0%";
    }
  }
  // college selected or cost changed
  const calculateAmounts = () => {
    data.currentCost = selectedCollege ? selectedCollege.cost : 0;

    const futureCostResult = calculateFutureCost({ yearlyCost: data.currentCost, annualCostIncrease: data.annalCostIncrease, yearsToCollege: data.yearsToCollege, yearsOfCollege });

    const futureSaved = calculateAmountSaved({ rateOfReturn: data.annualRateOfReturn, periods: data.periods, yearsToCollege: data.yearsToCollege, initialBalance: data.initialBalance, contribution: data.contribution });

    // assign returned object properties to data.futureCost
    data.futureCost.futureCost = futureCostResult.futureCost;
    data.futureCost.yearlyCostByYear = futureCostResult.yearlyCostByYear;
    data.futureSaved = futureSaved;
    console.log('calculated amounts', data);

    updateContent();
  }

  const updateContent = () => {
    if (futureAmountSavedRef.current) {
      futureAmountSavedRef.current.innerText = getDollarString(data.futureSaved);
    }
    if (futureCostRef.current) {
      console.log('data.futureCost.futureCost: ', data.futureCost.futureCost);
      futureCostRef.current.innerText = getDollarString(data.futureCost.futureCost);
    }
    if (percentSavedRef.current) {
      let percentage = data.futureSaved / data.futureCost.futureCost * 100;
      if (isNaN(percentage)) percentage = 0;
      percentSavedRef.current.innerText = `${percentage.toFixed(2)}%`;
    }

  }

  const getCollegeSelections = () => {
    console.log('getCollegeSelections');
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
    data.selectedCollege = newCollege;
    calculateAmounts();
  }

  const getPercentage = () => {
    let percentage = data.futureSaved / data.futureCost.futureCost * 100;
    if (isNaN(percentage)) percentage = 0;
    console.log('percentage: ', percentage);
    return percentage;
  }

  return (
    <>
      <h1>College Savings Planner</h1>
      <div className='contentHolder'>
        <div id="graphContainer">
          <PieChart colors={selectedCollege?.colors || defaultColors} percentage={getPercentage()} />
          <BarGraph colors={selectedCollege?.colors || defaultColors} amountSaved={data.futureSaved} yearlyCosts={data.futureCost.yearlyCostByYear} />
        </div>

        <div className="uiHolder">

          {/* select state and college */}
          <InfoHolder>
            <select ref={stateDropdownRef} onChange={(e) => {
              selectNewState(e.target.value as string);
            }}>
              {stateNames.map((state) => (
                <option key={String(state)} value={state}>{state}</option>
              ))}
            </select>
            <select ref={collegeDropdownRef} defaultValue={selectedCollege?.name} onChange={(e) => {

              selectNewCollege(JSON.parse(e.target.value) as College)
            }}>
              <option value="placeholder">
                Select an option...
              </option>
              {getCollegeSelections()}
            </select>
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
                data.yearsToCollege = yrs;
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
            <label htmlFor="annualCollegeCostSlider">annual cost</label>
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
                data.selectedCollege = selectedCollege;
                data.currentCost = cost;
                annualCostRef.current!.innerText = getDollarString(cost);
                calculateAmounts();
              }}
            />
            <span ref={annualCostRef}>$0</span>
          </SliderHolder>

          {/* select rate of return */}
          <SliderHolder>
            <label htmlFor="ROfRSlider">rate of return</label>
            <input
              ref={rateOfReturnSliderRef}
              type="range"
              min="0"
              max="10"
              step=".1"
              onChange={(e) => {
                const ror = parseFloat(e.target.value);
                data.annualRateOfReturn = ror;
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
            <label htmlFor="costIncreaseSlider">cost increase</label>
            <input
              ref={costIncreaseSliderRef}
              type="range"
              min="0"
              max="10"
              step=".1"
              onChange={(e) => {
                const ci = parseFloat(e.target.value);
                data.annalCostIncrease = ci;
                if (costIncreaseRef.current) {
                  costIncreaseRef.current.innerText = `${ci}%`;
                }

                calculateAmounts();
              }}
            />
            <span ref={costIncreaseRef}>{data.annalCostIncrease}%</span>
          </SliderHolder>

          {/* select contribution cadence */}
          <SliderHolder>
            <div>
              <select id="periodSelect" onChange={(e) => {
                data.periods = parseInt(e.target.value);
                calculateAmounts();
              }}>
                <option value="56">weekly contribution</option>
                <option value="26">bi-weekly contribution</option>
                <option value="24">bi-monthly contribution</option>
                <option value="12" selected>monthly contribution</option>
                <option value="4">quarterly contribution</option>
                <option value="1">yearly contribution</option>
              </select>
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
                data.contribution = contribution;
                calculateAmounts();
              }}
            />
            <span ref={contributionRef}>
              000
            </span>
          </SliderHolder>

          {/* input current amount saved */}
          <SliderHolder>
            <label htmlFor="startingAmountInput">current amount saved</label>
            <input type="text" ref={initialContributionRef} onChange={(e) => {


              let value = e.target.value.replace(/[^0-9.]/g, "");
              if (value === "") {
                initialContributionRef.current!.value = "";
                return;
              }
              let num = parseFloat(value);

              if (isNaN(num)) num = 0;
              data.initialBalance = num;
              initialContributionRef.current!.value = convertToDollarString(num);
              calculateAmounts();
            }} />
          </SliderHolder>


          <InfoHolder>
            <label>future amount saved</label>
            <span ref={futureAmountSavedRef}>$0</span>
          </InfoHolder>

          <InfoHolder>
            <label>future cost</label>
            <span ref={futureCostRef}>$0</span>
          </InfoHolder>
          <InfoHolder>
            <label>percent saved</label>
            <span ref={percentSavedRef}>0%</span>
          </InfoHolder>

        </div>
      </div>
    </>
  )
}

export default App
