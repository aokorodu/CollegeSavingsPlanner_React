
import './App.css'
import PieChart from './components/PieChart/PieChart';
import React from 'react';

function App() {
  const defaultColors = ['#1086d5', '#00539B'];
  const schoolColors = defaultColors;
  const pieRef = React.createRef();
  return (
    <>
      <h1>College Savings Planner</h1>
      <PieChart colors={schoolColors} />
    </>
  )
}

export default App
