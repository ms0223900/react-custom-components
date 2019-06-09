import React, { useState, useCallback, useEffect, useReducer } from 'react'
import { makeStyles } from '@material-ui/styles'
import AllDays from './allDays'
import { getWholeMonthDates } from './functions'

const selectedStartEndInit = {
  start: null, end: null,
}

const useStyles = makeStyles({
  monthButton: {
    cursor: 'pointer',
    backgroundColor: '#aaa',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#111',
    }
  }
})


export default () => {
  const classes = useStyles()
  const style = {
    width: 36 * 7,
  }
  const today = new Date()
  const [isSingleOrMulti, setIsSingleOrMulti] = useState('single')
  const [thisMonth, setThisMonth] = useState(today.getMonth() + 1)
  const [selectedDates, setSelectedDates] = useState([])
  const [selectedStartEnd, setSelectedStartEnd] = useState(selectedStartEndInit)
  const [startEndDates, setStartEndDates] = useState(['', ''])
  const [dateDataState, dispatch] = useReducer(dates, getWholeMonthDates(2019, thisMonth))
  //
  const handleSetMonth = useCallback((addOrMinus) => {
    if(addOrMinus === 'add') {
      setThisMonth(thisMonth + 1)
    } else if(addOrMinus === 'minus') {
      setThisMonth(thisMonth - 1)
    }
  }, [thisMonth])
  //
  const handleStartEndDate = useCallback((selectedDates) => {
    const targetDate = (dayId) => dateDataState.days.filter(state => state.dayId === dayId)[0]
    const date = (dayId) => targetDate(dayId).month + ' / ' + targetDate(dayId).date
    const formatDate = selectedDates.map(date)
    const res = ['', ''].map((d, i) => i < selectedDates.length ? formatDate[i] : d)
    setStartEndDates(res)
  }, [dateDataState.days])
  //
  const handleChooseDate = useCallback((dayId) => {
    let res = []
    if(isSingleOrMulti === 'single') {
      res = selectedDates.indexOf(dayId) !== -1 ? [] : [dayId]
    } else if(isSingleOrMulti === 'multi') {
      if(selectedStartEnd.start !== null && selectedStartEnd.end === null) {
        res = selectedDates
        setSelectedStartEnd({
          ...selectedStartEnd, end: dayId,
        })
      } else {
        res = [dayId]
        setSelectedStartEnd({
          start: dayId, end: null,
        })
      }
    }
    setSelectedDates(res)
    // handleStartEndDate(res)
  }, [isSingleOrMulti, selectedDates, selectedStartEnd])
  //
  const handleChooseDatesFromMouseEnter = useCallback((dayId) => {
    // console.log(dayId)
    if(isSingleOrMulti === 'single') {
      setSelectedDates([dayId])
    } else if(isSingleOrMulti === 'multi') {
      const { start, end } = selectedStartEnd
      let res = []
      if(start !== null && end === null) {
        if(dayId < start) {
          res = [dayId, start]
        } else if(dayId > start) {
          res = [start, dayId]
        } else {
          res = [dayId]
        }
        setSelectedDates(res)
      }
    } 
    
  }, [isSingleOrMulti, selectedStartEnd])
  //
  useEffect(() => {
    console.log(selectedDates)
    // dispatch({ type: 'CHOOSE_DATE', selectedDates })
    handleStartEndDate(selectedDates)
  }, [handleStartEndDate, selectedDates])
  useEffect(() => {
    dispatch({ type: 'SET_ANOTHER_MONTH', month: thisMonth, })
    setSelectedDates([])
    setStartEndDates(['', ''])
    setSelectedStartEnd(selectedStartEndInit)
  }, [thisMonth, isSingleOrMulti])
  //
  return (
    <div style={ style }>
      <div style={{ textAlign: 'center', }}>
        <span 
          className={ classes.monthButton } 
          onClick={ () => handleSetMonth('minus') }>
          { ' < ' }
        </span>
        <span>{ dateDataState.month }</span>
        <span 
          className={ classes.monthButton } 
          onClick={ () => handleSetMonth('add') }>
          { ' > ' }
        </span>
      </div>
      
      <AllDays 
        monthDaysData={ dateDataState.days } 
        setChosenDate={ handleChooseDate }
        selectedDates={ selectedDates }
        selectedStartEnd={ isSingleOrMulti === 'multi' ? selectedStartEnd : selectedStartEndInit }
        // updateChoseneDate={ handleUpdateChosenDate }
        addChosenDates={ isSingleOrMulti === 'multi' ? handleChooseDatesFromMouseEnter : undefined } />
      <>
        <h5>
          { `start date: ${ startEndDates[0] }--> end date: ${ startEndDates[1] }` }
        </h5>
      </>
      <button 
        onClick={ 
          () => setIsSingleOrMulti(isSingleOrMulti === 'single' ? 'multi' : 'single')
        }>
        { isSingleOrMulti === 'single' ? 'single' : 'multi' }
      </button>
    </div>
    
  )
}
export const checkIsBetween = (numSelected=[], dayId=0) => {
  const LENGTH = numSelected.length
  if(LENGTH === 1) {
    if(numSelected[0] === dayId) return true
  } else if(LENGTH === 2) {
    if(dayId >= numSelected[0] && dayId <= numSelected[1]) return true
  } return false
}


export const dates = (state, action) => {
  const { type } = action
  switch (type) {
    case 'SET_ANOTHER_MONTH': {
      const { month } = action
      return getWholeMonthDates(2019, month)
    }
    // case 'CHOOSE_DATE': {
    //   const { selectedDates } = action
    //   const chosenDates = state.days.filter(day => checkIsBetween(selectedDates, day.dayId))
    //   if(chosenDates.length > 0) {
    //     const beforeChosenDayId = selectedDates[0]
    //     const afterChoseneDayId = chosenDates.length > 1 ? selectedDates[1] : selectedDates[0]
    //     const setIsChosenData = (trueOrFalse) => 
    //       trueOrFalse ? 
    //       (date) => ({ ...date, isChosen: true }) : 
    //       (date) => ({ ...date, isChosen: false })
    //     return ({
    //       ...state,
    //       days: [
    //         ...state.days.filter(day => day.dayId < beforeChosenDayId).map(setIsChosenData(false)),
    //         ...chosenDates.map(setIsChosenData(true)),
    //         ...state.days.filter(day => day.dayId > afterChoseneDayId).map(setIsChosenData(false)),
    //       ]
    //     })
    //   } else return state
    // }
    default:
      return state
  }
}