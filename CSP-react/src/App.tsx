
import './App.css'
import PieChart from './components/PieChart/PieChart';
import React, { useEffect, useState } from 'react';
import { stateNames, getCollegesByState } from './data/costData';
import { formatToDollarString } from './utils/Utils';
import { calculateAmountSaved, calculateFutureCost } from './data/calculator';


type College = {
  name: string;
  cost: number | null;
  colors: string[];
};

type collegeData = {
  cost: number;
  colors: string[];
}

function App() {
  const defaultColors = ['#1086d5', '#00539B'];
  const schoolColors = defaultColors;
  const [percentage, setPercentage] = React.useState(0);
  const [selectedState, setSelectedState] = React.useState('Average');
  const [colleges, setColleges] = React.useState<College[]>(getCollegesByState("Average"));
  const [selectedCollege, setSelectedCollege] = React.useState<College | null>(null);

  //
  const yearsOfCollege = 4;
  const defaultYearsToCollege = 17;
  const [yearsToCollege, setYearsToCollege] = useState(defaultYearsToCollege)
  const [yearlyCost, setYearlyCost] = useState(0);
  const [initialBalance, setInitialBalance] = useState(0);
  const [annualRateOfReturn, setAnnualRateOfReturn] = useState(6);
  const [annualCostIncrease, setAnnualCostIncrease] = useState(5);
  const [periods, setPeriods] = useState(12);
  const [contribution, setContribution] = useState(0);
  const [futureSaved, setFutureSaved] = useState(0);
  const [futureCost, setfutureCost] = useState(0)
  //
  let yearlyCostByYear = [];
  let yearlySavedByYear = [];
  let maxYearlyCollegeCost = 0;
  let percentageSaved = 0;
  let percentages = [];
  //

  useEffect(() => {
    //const colleges: College[] = getCollegesByState(selectedState);
    setColleges(getCollegesByState(selectedState));
  }, [selectedState]);

  // useEffect for when college is selected and you have the cost
  useEffect(() => {
    const amt = calculateAmountSaved({ rateOfReturn: annualRateOfReturn, periods, yearsToCollege, initialBalance, contribution });
    console.log('amount saved: ', amt);
    setFutureSaved(amt);
    let pct = futureSaved / futureCost * 100;
    if (pct > 100) pct = 100;
    setPercentage(pct)
  }, [yearsToCollege, yearlyCost, initialBalance, annualRateOfReturn, periods, contribution, futureSaved, futureCost])

  useEffect(() => {
    const cst = calculateFutureCost({ yearlyCost, annualCostIncrease, yearsToCollege, yearsOfCollege });
    setfutureCost(cst.futureCost);
    yearlyCostByYear = cst.yearlyCostByYear;
  }, [yearlyCost])

  const getCollegeSelections = () => {
    console.log('getCollegeSelections');
    const newArr = colleges.map((college) => {
      return (
        <option
          key={college.name}
          selected={false}
          value={JSON.stringify(college)}
        >
          {college.name}
        </option>
      );
    });
    return newArr;
  }

  const selectNewCollege = ({ cost, colors }: College) => {
    console.log('selectNewCollege', cost);
    console.log('colors', colors);
    setYearlyCost(cost !== null ? cost : 0);
  }

  const setStartBalanceFromInput = (input: string) => {
    const cleanedInput = formatToDollarString(input);
    setInitialBalance(parseInt(cleanedInput));
  }

  return (
    <>
      <h1>College Savings Planner</h1>
      <PieChart colors={schoolColors} percentage={percentage} />
      {/* <div>
        Yearly Cost: {yearlyCost}
      </div> */}
      <div className="uiHolder">

        <div>
          <select onChange={(e) => {
            setSelectedState(e.target.value as string);
            //setColleges(getCollegesByState(selectedState));
          }}>
            {stateNames.map((state) => (
              <option key={String(state)} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div>
          {/* select college */}
          <select id="colleges" defaultValue={"placeholder"} onChange={(e) => {

            selectNewCollege(JSON.parse(e.target.value) as College)
          }}>
            <option value="placeholder" selected>
              Select an option...
            </option>
            {getCollegeSelections()}
          </select>
        </div>

        <div>
          <label htmlFor="yearsSlider">years until college: {yearsToCollege}</label>
          <input
            id="yearsSlider"
            type="range"
            value={yearsToCollege}
            min="1"
            max="30"
            step=".1"
            onChange={(e) => setYearsToCollege(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="annualCollegeCostSlider">annual cost: {yearlyCost}</label>
          <input
            id="annualCollegeCostSlider"
            type="range"
            value={yearlyCost}
            min="0"
            max="100000"
            step="100"
            onChange={(e) => setYearlyCost(parseInt(e.target.value))}
          />
        </div>

        <div>
          <label htmlFor="ROfRSlider">rate of return: {annualRateOfReturn}%</label>
          <input
            id="ROfRSlider"
            type="range"
            min="0"
            max="10"
            value={annualRateOfReturn}
            step=".1"
            onChange={(e) => setAnnualRateOfReturn(parseInt(e.target.value))}
          />
        </div>

        <div>
          <div>
            <select id="periodSelect" onChange={(e) => setPeriods(parseInt(e.target.value))}>
              <option value="56">weekly</option>
              <option value="26">bi-weekly</option>
              <option value="24">bi-monthly</option>
              <option value="12" selected>monthly</option>
              <option value="4">quarterly</option>
              <option value="1">yearly</option>
            </select>
            <label htmlFor="plannedContributionSlider">contribution</label>
          </div>

          <input
            type="range"
            id="plannedContributionSlider"
            min="0"
            max="3000"
            value={contribution}
            step="25"
            onChange={(e) => setContribution(parseInt(e.target.value))}
          />
          <div id="plannedContributionText">
            {contribution}
          </div>
        </div>

        <div>
          <label htmlFor="startingAmountInput">current amount saved</label>
          <input type="text" id="startingAmountInput" value={`$${initialBalance.toLocaleString()}`} onChange={(e) => setStartBalanceFromInput(e.target.value)} />
        </div>

        <div>
          <label>future amount saved</label>{`$${futureSaved.toLocaleString()}`}
        </div>
        <div>
          <label>future cost</label>{`$${futureCost.toLocaleString()}`}
        </div>
        <div>
          <label>percent saved</label>{`${Math.round(futureSaved / futureCost * 100)}%`}
        </div>

      </div>
    </>
  )
}

export default App
