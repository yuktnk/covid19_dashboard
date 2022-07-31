import React from 'react'
import './App.css'
import Cards from './features/covid/cards/Cards'
import Chart from './features/covid/chart/Chart'
import PieChart from './features/covid/piechart/PieChart'
import SwitchCountry from './features/covid/switchcountry/SwitchCountry'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cards />
        <Chart />
        <PieChart />
        <SwitchCountry />
      </header>
    </div>
  )
}

export default App
