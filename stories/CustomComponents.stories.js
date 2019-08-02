import React from 'react'
import { storiesOf } from '@storybook/react'
import Calendar from '../src/components/Calendar'
import Calculator from '../src/components/Calculator'
import ComicViewer from '../src/components/ComicViewer'
import SUDOKU from '../src/components/SUDOKU'
import WeatherAPI from '../src/components/WeatherAPI'
import FreeCellGame from '../src/components/FreeCellGame'
import '../src/styles/style.scss'

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