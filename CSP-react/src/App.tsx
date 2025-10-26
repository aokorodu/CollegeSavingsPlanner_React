
import './App.css'
import PieChart from './components/PieChart/PieChart';
import BarGraph from './components/BarGraph/BarGraph';
import React, { useEffect, useState } from 'react';
import { stateNames, getCollegesByState } from './data/costData';
import { formatToDollarString } from './utils/Utils';
import { calculateAmountSaved, calculateFutureCost } from './data/calculator';
import { Average } from './data/costData';


// ui
// import GraphButton from './components/GraphButton/graphButton';
// import { pieChartIconURL, barGraphIconURL } from './data/assetURLs';


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
  const [selectedState, setSelectedState] = React.useState('Average');
  const [colleges, setColleges] = React.useState<College[]>(getCollegesByState("Average"));
  const [selectedCollege, setSelectedCollege] = React.useState<College | null>(Average[2]);

  //
  const yearsOfCollege = 4;
  const [data, setData] = useState<calcObject>(defaultData);

  useEffect(() => {

    setData(defaultData);
  }, []);


  // useEffect for when state is selected to get colleges
  useEffect(() => {
    //const colleges: College[] = getCollegesByState(selectedState);
    setColleges(getCollegesByState(selectedState));
  }, [selectedState]);

  // useEffect for when college is selected and you have the cost
  useEffect(() => {
    console.log('useEffect college selected or cost changed');
    const cost = selectedCollege ? selectedCollege.cost : 0;
    const fc = calculateFutureCost({ yearlyCost: cost, annualCostIncrease: data.annalCostIncrease, yearsToCollege: data.yearsToCollege, yearsOfCollege });

    const amt = calculateAmountSaved({ rateOfReturn: data.annualRateOfReturn, periods: data.periods, yearsToCollege: data.yearsToCollege, initialBalance: data.initialBalance, contribution: data.contribution });

    setData((prevData) => ({
      ...prevData, // Copy all existing properties
      futureSaved: amt,
      futureCost: fc,
    }));
    let pct = getPercentage();
    if (pct > 100) pct = 100;
  }, [data])

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
    setData(prevData => ({
      ...prevData, // Copy all existing properties
      initialBalance: parseInt(cleanedInput)
    }));
  }

  const getPercentage = () => {

    let percentage = data.futureSaved / data.futureCost.futureCost * 100;

    if (isNaN(percentage)) percentage = 0;
    console.log('percentage: ', percentage);
    return percentage;
  }

  return (
    <>
      {/* <div>
        <GraphButton imageURL={pieChartIconURL} altText='College Savings Planner Banner' onClick={() => { console.log("clicked") }} />
        <GraphButton imageURL={barGraphIconURL} altText='College Savings Planner Banner' onClick={() => { console.log("clicked") }} />
      </div> */}

      <h1>College Savings Planner</h1>
      <div className='contentHolder'>
        <div id="graphContainer">
          <PieChart colors={selectedCollege?.colors || defaultColors} percentage={getPercentage()} />
          <BarGraph colors={selectedCollege?.colors || defaultColors} percentage={getPercentage()} yearlyCosts={data.futureCost.yearlyCostByYear} />
        </div>

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
            <select id="colleges" defaultValue={selectedCollege?.name} onChange={(e) => {

              selectNewCollege(JSON.parse(e.target.value) as College)
            }}>
              <option value="placeholder">
                Select an option...
              </option>
              {getCollegeSelections()}
            </select>
          </div>

          <div>
            <label htmlFor="yearsSlider">years until college: {data.yearsToCollege}</label>
            <input
              id="yearsSlider"
              type="range"
              value={data.yearsToCollege}
              min="1"
              max="30"
              step=".1"
              onChange={(e) => {
                setData(prevData => ({
                  ...prevData, // Copy all existing properties
                  yearsToCollege: parseInt(e.target.value)
                }));
              }}
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

              }}
            />
          </div>

          <div>
            <label htmlFor="ROfRSlider">rate of return: {data.annualRateOfReturn}%</label>
            <input
              id="ROfRSlider"
              type="range"
              min="0"
              max="10"
              value={data.annualRateOfReturn}
              step=".1"
              onChange={(e) => {
                setData(prevData => ({
                  ...prevData, // Copy all existing properties
                  annualRateOfReturn: parseInt(e.target.value)
                }));
              }}
            />
          </div>
          <div>
            <label htmlFor="costIncreaseSlider">cost increase: {data.annalCostIncrease}%</label>
            <input
              id="costIncreaseSlider"
              type="range"
              min="0"
              max="10"
              value={data.annalCostIncrease}
              step=".1"
              onChange={(e) => {
                setData(prevData => ({
                  ...prevData, // Copy all existing properties
                  annalCostIncrease: parseInt(e.target.value)
                }));
              }}
            />
          </div>
          <div>
            <div>
              <select id="periodSelect" onChange={(e) => {
                setData(prevData => ({
                  ...prevData, // Copy all existing properties
                  periods: parseInt(e.target.value)
                }));
              }}>
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
              value={data.contribution}
              step="25"
              onChange={(e) => {
                setData(prevData => ({
                  ...prevData, // Copy all existing properties
                  contribution: parseInt(e.target.value)
                }));
              }}
            />
            <div id="plannedContributionText">
              {`$${data.contribution.toLocaleString()}`}
            </div>
          </div>

          <div>
            <label htmlFor="startingAmountInput">current amount saved</label>
            <input type="text" id="startingAmountInput" value={`$${data.initialBalance.toLocaleString()}`} onChange={(e) => setStartBalanceFromInput(e.target.value)} />
          </div>

          <div>
            <label>future amount saved</label>{`$${data.futureSaved.toLocaleString()}`}
          </div>
          <div>
            <label>future cost</label>{`$${data.futureCost.futureCost.toLocaleString()}`}
          </div>
          <div>
            <label>percent saved</label>{`${Math.round(getPercentage())}%`}
          </div>

        </div>
      </div>
    </>
  )
}

export default App
