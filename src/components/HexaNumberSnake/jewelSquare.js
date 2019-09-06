import React, { useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react'
import { Box } from '@material-ui/core'



const SingleJewel = ({ color, getPosFn }) => {
  const [offsetPosTop, setTop] = useState(0)
  const jewelRef = useRef()
  const getPos = useCallback(() => {
    console.log(jewelRef.current.offsetTop)
    getPosFn(jewelRef.current.offsetTop)
    offsetPosTop === 0 ? setTop(-20) : setTop(0)
  }, [offsetPosTop, getPosFn])
  return (
    <Box ref={ jewelRef } onClick={ getPos } style={{ backgroundColor: color, width: 50, height: 50, position: 'relative', top: offsetPosTop, transition: '0.3s' }}></Box>
  )
}

const jewelsData = [
  { id: 0 ,color: '#f00', },
  { id: 1 ,color: '#00f', },
  { id: 2 ,color: '#0fa', },
]

const Jewels = () => {
  const [twoJewelsPos, settwoJewelsPos] = useState(1000)
  const handleGetPos = useCallback(newPos => {
    console.log(twoJewelsPos, newPos)
    settwoJewelsPos(20)
  }, [twoJewelsPos])
  console.log(twoJewelsPos)
  return (
    <Box>
      {jewelsData.map(data => (
        <SingleJewel key={ data.id } {...data} getPosFn={ handleGetPos } />
      ))}
    </Box>
  )
}

export default Jewels