import React from 'react'
import { storiesOf } from '@storybook/react'
import Calendar from '../src/components/Calendar'
import SUDOKU from '../src/components/SUDOKU'
import WeatherAPI from '../src/components/WeatherAPI'
import FreeCellGame from '../src/components/FreeCellGame'
import Gomoku from '../src/components/Gomoku'
import '../src/styles/style.scss'
import GARAMGameRouter from '../src/components/GARAM/route';
import JewelGameRouter from '../src/components/Jewel/route'
import { ApolloProviderWrapper } from './API'
import { MemoryRouter } from 'react-router-dom'

storiesOf('custom-components', module)
  // .add('calendar', () => (
  //   <Calendar />
  // ))
  // .add('SUDOKU', () => (
  //   <SUDOKU />
  // ))
  // .add('FreeCellGame', () => (
  //   <FreeCellGame />
  // ))
  .add('WeatherAPI', () => (
    // <MemoryRouter initialEntries={['/weather']}>
    <WeatherAPI />
    // </MemoryRouter>
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