
import './App.css'
import PieChart from './components/PieChart/PieChart';
import React, { useEffect, useState } from 'react';
import { stateNames, getCollegesByState } from './data/costData';
import { formatToDollarString } from './utils/Utils';


type College = {
  name: string;
  cost: number | null;
  colors: string[];
};

function App() {
  const defaultColors = ['#1086d5', '#00539B'];
  const schoolColors = defaultColors;
  const [percentage, setPercentage] = React.useState(0);
  const [selectedState, setSelectedState] = React.useState('Average');
  const [colleges, setColleges] = React.useState<College[]>(getCollegesByState("Average"));

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
    const amt = calculateAmountSaved()
    console.log('amount saved: ', amt);
    setFutureSaved(amt);
    let pct = futureSaved / futureCost * 100;
    if (pct > 100) pct = 100;
    setPercentage(pct)
  }, [yearsToCollege, yearlyCost, initialBalance, annualRateOfReturn, periods, contribution, futureSaved, futureCost])

  useEffect(() => {
    const cst = calculateFutureCost();
    setfutureCost(cst);
  }, [yearlyCost])

  const getCollegeSelections = () => {
    console.log('getCollegeSelections');
    const newArr = colleges.map((college) => {
      return <option key={college.name} selected={false} value={String(college.cost)}>{college.name}</option>
    });
    return newArr;
  }

  const selectNewCost = (cost: number) => {
    console.log('selectNewCost', cost);
    setYearlyCost(cost);
  }

  const setStartBalanceFromInput = (input: string) => {
    const cleanedInput = formatToDollarString(input);
    setInitialBalance(parseInt(cleanedInput));
  }

  function calculateAmountSaved() {
    const monthlyRateOfReturn = annualRateOfReturn / 100 / periods;

    const totalMonths = yearsToCollege * periods;

    let balance = initialBalance;
    console.log("balance: ", balance)
    for (let month = 0; month < totalMonths; month++) {
      balance += contribution;
      balance += balance * monthlyRateOfReturn;
    }

    return balance;
  }

  function calculateFutureCost() {
    yearlyCostByYear = [];
    const annualCollegeCostIncrease = 1 + annualCostIncrease / 100; // 5% increase per year
    let futureYearlyCost = yearlyCost;
    for (let i = 0; i < yearsToCollege; i++) {
      futureYearlyCost *= annualCollegeCostIncrease;
    }

    let futureCost = 0;
    for (let i = 0; i < yearsOfCollege; i++) {
      futureCost += futureYearlyCost;
      yearlyCostByYear.push(Math.round(futureYearlyCost));
      futureYearlyCost *= annualCollegeCostIncrease;
    }
    // console.log("fix this  yearlyCostByYear", yearlyCostByYear);
    return Math.round(futureCost);
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
          <select id="colleges" defaultValue={"placeholder"} onChange={(e) => { selectNewCost(parseInt(e.target.value)) }}>
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
