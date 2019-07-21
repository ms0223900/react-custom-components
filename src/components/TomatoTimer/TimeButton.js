import React from 'react'
import { Button, Typography } from '@material-ui/core';
import { getMinSec } from './fn'

const TimeButton = ({ time, workOrBreak, setTimeFn }) => {
  return (
    <div>
      <Typography variant={ 'h5' }>{ workOrBreak + 'time set' }</Typography>
      <>
      <Button onClick={ setTimeFn.bind(this, workOrBreak, 'add') }>{ '+' }</Button>
      <Typography variant={ 'subtitle1' }>{ getMinSec(time).timeString }</Typography>
      <Button onClick={ setTimeFn.bind(this, workOrBreak, 'minus') }>{ '-' }</Button>
      </>
    </div>
  )
}

export default TimeButton