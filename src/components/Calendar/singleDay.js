import React from 'react'

export default ({ date=1, isThisMonth=true, isChosen=false, isStartOrEnd, clickFn, mouseEnterFn }) => {
  const backgroundColor = isStartOrEnd ? '#0da' : (isChosen ? '#03a' : '#eee')
  const color =  isChosen ? '#fff' : (isThisMonth ? '#111' : '#bbb')
  const style = {
    backgroundColor, color,
    width: 20, height: 20,
    // boxSizing: 'border-box',
    margin: 2,
    padding: 6,
    // lineHeight: 16,
    // border: '1px solid #000',
    display: 'inline-block',
    textAlign: 'center',
    borderRadius: 1000,
    cursor: 'pointer',
  }
  return (
    <div 
      style={ style } 
      className={'single-day'}
      onMouseEnter={ mouseEnterFn }
      onClick={ clickFn }>
      { date }
    </div>
  )
}

