/* eslint-disable no-unused-vars */
import React, { 
  useEffect, 
  useState 
} from 'react'
import SinglePic from './singlePic'

const filePath = '../../../public/data'
const fileFormat = /\.(jpe?g|png|gif|svg)$/i

export default () => {
  const [ pics, setPics ] = useState([])
  const [ picNow, setPicNow ] = useState(0)
  useEffect(() => {
    const req = require.context('../../../public/data', false, /\.(jpe?g|png|gif|svg)$/i)
    // console.log(pics)
    setPics(req.keys())
  }, [])
  return (
    <div>
      {pics.length > 0 ? (
        <SinglePic imgSrc={ pics[picNow] } />
      ) : ('loading...')}
    </div>
  )
}