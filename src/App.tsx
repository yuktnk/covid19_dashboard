import React from 'react'
import './App.css'
import Cards from './features/covid/cards/Cards'
import Chart from './features/covid/chart/Chart'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Cards />
        <Chart />
      </header>
    </div>
  )
}

export default App
