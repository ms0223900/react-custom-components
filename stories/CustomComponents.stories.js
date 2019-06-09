import React from 'react'
import { storiesOf } from '@storybook/react'
import Calendar from '../src/components/Calendar'
import Calculator from '../src/components/Calculator'
import ComicViewer from '../src/components/ComicViewer'
import SUDOKU from '../src/components/SUDOKU'

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