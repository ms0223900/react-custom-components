import React from 'react'
import { storiesOf } from '@storybook/react'
import Calendar from '../src/components/Calendar'
import Calculator from '../src/components/Calculator'
import ComicViewer from '../src/components/ComicViewer'
import SUDOKU from '../src/components/SUDOKU'
import WeatherAPI from '../src/components/WeatherAPI'
import FreeCellGame from '../src/components/FreeCellGame'
import Gomoku from '../src/components/Gomoku'
import '../src/styles/style.scss'
import GARAMGameRouter from '../src/components/GARAM/route';

storiesOf('custom-components', module)
  .add('calendar', () => (
    <Calendar />
  ))
  .add('caculator', () => (
    <Calculator />
  ))
  .add('comicViewer', () => (
    <ComicViewer />
  ))
  .add('SUDOKU', () => (
    <SUDOKU />
  ))
  .add('WeatherAPI', () => (
    <WeatherAPI />
  ))
  .add('FreeCellGame', () => (
    <FreeCellGame />
  ))
  .add('Gomoku', () => (
    <Gomoku />
  ))
  .add('GARAM', () => (
    <GARAMGameRouter />
  ))