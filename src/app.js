/* eslint-disable no-unused-vars */
import React from 'react'
import Calendar from './components/Calendar'
import Calculator from './components/Calculator'
import ComicViewer from './components/ComicViewer'
import SUDOKU from './components/SUDOKU'
import WeatherAPI from './components/WeatherAPI'
import TomatoTimer from './components/TomatoTimer'
import GARAMGameRouter from './components/GARAM/route';
import { LittleTimer } from './components/Timer'

export default () => {

  return (
    <div>
      {/* <Calendar /> */}
      {/* <Calculator /> */}
      {/* <ComicViewer /> */}
      {/* <SUDOKU /> */}
      {/* <WeatherAPI /> */}
      {/* <TomatoTimer /> */}
      <GARAMGameRouter />
      <LittleTimer />
    </div>
  )
}