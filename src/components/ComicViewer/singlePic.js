/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  picContainer: {
    maxWidth: 400,
    // maxHeight: 300,
    resize: 'vertical'
  },
  picImg: {
    // width: '100%',
    height: '100%',
  },
  rootBorder: {
    // width: '100%',
    height: 10,
    borderBottom: '3px solid #aaa',
    '&:hover': {
      cursor: 'ns-resize',
      borderBottom: '3px solid #a00',
    }
  }
})

export default ({ imgSrc, picHeight }) => {
  const classes = useStyles()
  //
  return (
    <div style={{ height: picHeight }}>
      <img className={ classes.picImg } src={ 'data/' + imgSrc } />
    </div>
  )
}