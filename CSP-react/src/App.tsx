
import './App.css'
import PieChart from './components/PieChart/PieChart';
import BarGraph from './components/BarGraph/BarGraph';
import React, { useEffect, useState } from 'react';
import { stateNames, getCollegesByState } from './data/costData';
import { formatToDollarString } from './utils/Utils';
import { calculateAmountSaved, calculateFutureCost } from './data/calculator';


type College = {
  name: string;
  cost: number;
  colors: string[];
};

type FCost = {
  futureCost: number,
  yearlyCostByYear: number[],
};

function App() {
  const defaultColors = ["#98A1BC", "#555879"];
  const [selectedState, setSelectedState] = React.useState('Average');
  const [colleges, setColleges] = React.useState<College[]>(getCollegesByState("Average"));
  const [selectedCollege, setSelectedCollege] = React.useState<College | null>(null);

  //
  const yearsOfCollege = 4;
  const defaultYearsToCollege = 17;
  const [yearsToCollege, setYearsToCollege] = useState(defaultYearsToCollege)
  const [initialBalance, setInitialBalance] = useState(0);
  const [annualRateOfReturn, setAnnualRateOfReturn] = useState(6);
  const [annualCostIncrease, setAnnualCostIncrease] = useState(4);
  const [periods, setPeriods] = useState(12);
  const [contribution, setContribution] = useState(0);
  const [futureSaved, setFutureSaved] = useState(0);
  const [futureCost, setfutureCost] = React.useState<FCost>({ futureCost: 0, yearlyCostByYear: [] });
  //
  let yearlyCostByYear = [];
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
    let pct = getPercentage();
    if (pct > 100) pct = 100;
  }, [yearsToCollege, selectedCollege, initialBalance, annualRateOfReturn, periods, contribution, futureSaved, futureCost])

  useEffect(() => {
    const cost = selectedCollege ? selectedCollege.cost : 0;
    const fc = calculateFutureCost({ yearlyCost: cost, annualCostIncrease, yearsToCollege, yearsOfCollege });
    setfutureCost(fc);
    yearlyCostByYear = futureCost.yearlyCostByYear;
  }, [annualCostIncrease, selectedCollege])

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

  const selectNewCollege = (newCollege: College) => {
    console.log('selectNewCollege', newCollege.cost);
    console.log('colors', newCollege.colors);
    //setYearlyCost(newCollege.cost !== null ? newCollege.cost : 0);
    setSelectedCollege(newCollege);
  }

  const setStartBalanceFromInput = (input: string) => {
    const cleanedInput = formatToDollarString(input);
    setInitialBalance(parseInt(cleanedInput));
  }

  const getPercentage = () => {
    let percentage = futureSaved / futureCost.futureCost * 100;

    if (isNaN(percentage)) percentage = 0;
    console.log('percentage: ', percentage);
    return percentage;
  }

  return (
    <>
      <img
        src="https://zuubadigital-bucket-test.s3.us-west-2.amazonaws.com/images/pieChartIcon.svg"
        width={50}
        height={50}
        alt="College Savings Planner Banner"
      />
      <h1>College Savings Planner</h1>
      <PieChart colors={selectedCollege?.colors || defaultColors} percentage={getPercentage()} />
      <BarGraph colors={selectedCollege?.colors || defaultColors} percentage={getPercentage()} yearlyCosts={futureCost.yearlyCostByYear} />
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
            <option value="placeholder">
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
          <label htmlFor="annualCollegeCostSlider">annual cost: ${selectedCollege?.cost.toLocaleString()}</label>
          <input
            id="annualCollegeCostSlider"
            type="range"
            value={selectedCollege?.cost}
            min="0"
            max="100000"
            step="100"
            onChange={(e) => {
              const college = selectedCollege;
              if (college) {
                const newCollegeData: College = {
                  name: college.name,
                  cost: parseInt(e.target.value),
                  colors: college.colors
                };
                setSelectedCollege(newCollegeData);
              }
              // setYearlyCost(parseInt(e.target.value))

            }}
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
          <label htmlFor="costIncreaseSlider">cost increase: {annualCostIncrease}%</label>
          <input
            id="costIncreaseSlider"
            type="range"
            min="0"
            max="10"
            value={annualCostIncrease}
            step=".1"
            onChange={(e) => setAnnualCostIncrease(parseFloat(e.target.value))}
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
            {`$${contribution.toLocaleString()}`}
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
          <label>future cost</label>{`$${futureCost.futureCost.toLocaleString()}`}
        </div>
        <div>
          <label>percent saved</label>{`${Math.round(getPercentage())}%`}
        </div>

      </div>
    </>
  )
}

export default App
