import React from 'react'
import SingleDay from './singleDay'
import { checkIsBetween } from './index'

export default ({ monthDaysData=[], setChosenDate, addChosenDates, selectedDates, selectedStartEnd }) => {
  const style = {
    // width: 36 * 7,
  }
  const { start, end } = selectedStartEnd
  return (
    <div style={ style }>
      {monthDaysData.map(data => (
        <SingleDay
          key={ data.dayId }
          mouseEnterFn={ addChosenDates && addChosenDates.bind(this, data.dayId) }
          clickFn={ setChosenDate && setChosenDate.bind(this, data.dayId) } 
          date={ data.date }
          isThisMonth={ data.isThisMonth }
          isStartOrEnd={ data.dayId === start || data.dayId === end  }
          isChosen={ checkIsBetween(selectedDates, data.dayId) } />
      ))}
    </div>
  )
}