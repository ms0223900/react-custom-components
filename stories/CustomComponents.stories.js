import React from 'react'
import { storiesOf } from '@storybook/react'
import Calendar from '../src/components/Calendar'
import Calculator from '../src/legacy/Calculator'
import ComicViewer from '../src/legacy/ComicViewer'
import SUDOKU from '../src/components/SUDOKU'
import WeatherAPI from '../src/components/WeatherAPI'
import FreeCellGame from '../src/components/FreeCellGame'
import Gomoku from '../src/components/Gomoku'
import '../src/styles/style.scss'
import GARAMGameRouter from '../src/components/GARAM/route';
import JewelGameRouter from '../src/components/Jewel/route'
import { ApolloProviderWrapper } from './API'

storiesOf('custom-components', module)
  .add('calendar', () => (
    <Calendar />
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
  .add('Jewel Game', () => (
    <ApolloProviderWrapper>
      <JewelGameRouter />
    </ApolloProviderWrapper>
  ))