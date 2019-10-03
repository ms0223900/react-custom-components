/* eslint-disable no-unused-vars */
import React, { useCallback, useRef, useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import SinglePic from './singlePic'

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

export default ({ pics, picNow, ...props }) => {
  const isResize = useRef('no click')
  const clientY = useRef()
  const [ picHeight, setPicHeight ] = useState(400)
  const classes = useStyles()

  const mearsureRef = useCallback((el) => {
    if(el !== null) {
      setPicHeight(el.getBoundingClientRect().height)
      console.log('ref')
    }
  })

  const handleResizeStart = useCallback((e) => {
    isResize.current = 'clicked'
    clientY.current = e.clientY
    window.addEventListener('mousemove', handleResize)
    // console.log(isResize)
  })
  const handleResize = useCallback((e) => {
    if(isResize.current === 'clicked') {
      // console.log(picHeight, clientY.current, e.clientY)
      const newHeight = picHeight + e.clientY - clientY.current
      setPicHeight(newHeight)
    }
  }, [picHeight])
  const handleResizeOver = useCallback(() => {
    isResize.current = 'no click'
    window.removeEventListener('mousemove', handleResize)
    // clientY.current = 
  })
  useEffect(() => {
    console.log(picHeight)
    window.addEventListener('mouseup', handleResizeOver)
  }, [])
  const resisis = isResize.current
  return (
    <div 
      // ref={ mearsureRef } 
      className={ classes.picContainer }
    >
      <SinglePic imgSrc={ pics[picNow] } picHeight={ picHeight } />
      { props.children }
      <span>{ picHeight }</span>
      <div 
        className={ classes.rootBorder }
        onMouseDown={ handleResizeStart }
        />
    </div>
  )
}