
import './App.css'
import PieChart from './components/PieChart/PieChart';
import React, { useEffect } from 'react';
import { stateNames, getCollegesByState } from './data/costData';


type College = {
  name: string;
  cost: number | null;
  colors: string[];
};

function App() {
  const defaultColors = ['#1086d5', '#00539B'];
  const schoolColors = defaultColors;
  const [percentage, setPercentage] = React.useState(33);
  const [selectedState, setSelectedState] = React.useState('Average');
  const [colleges, setColleges] = React.useState<College[]>(getCollegesByState("Average"));

  useEffect(() => {
    //const colleges: College[] = getCollegesByState(selectedState);
    setColleges(getCollegesByState(selectedState));
  }, [selectedState]);

  const getCollegeSelections = () => {
    console.log('getCollegeSelections');
    const newArr = colleges.map((college) => {
      return <option key={college.name} selected={false} value={String(college.cost)}>{college.name}</option>
    });
    return newArr;
  }
  return (
    <>
      <h1>College Savings Planner</h1>
      <PieChart colors={schoolColors} percentage={percentage} />
      <div>
        <select onChange={(e) => {
          setSelectedState(e.target.value as string);
          //setColleges(getCollegesByState(selectedState));
        }}>
          {stateNames.map((state) => (
            <option key={String(state)} value={state}>{state}</option>
          ))}
        </select>
        <div>
          <select id="colleges" defaultValue={"placeholder"} onChange={(e) => { console.log('selected college cost', e.target.value) }}>
            <option value="placeholder" selected>
              Select an option...
            </option>
            {getCollegeSelections()}</select>
        </div>

      </div>
    </>
  )
}

export default App
