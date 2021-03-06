/* eslint-disable no-unused-vars */
import React, { 
  useEffect, 
  useState,
  useCallback 
} from 'react'
import PicContainer from './picContainer'
import SinglePic from './singlePic'
import PageButtonList from './pageButtonList'

const filePath = '../../../public/data'
const fileFormat = /\.(jpe?g|png|gif|svg)$/i

export default () => {
  const [ pics, setPics ] = useState([])
  const [ picNow, setPicNow ] = useState(0)
  //
  useEffect(() => {
    const req = require.context('../../../public/data', false, /\.(jpe?g|png|gif|svg)$/i)
    // console.log(pics)
    setPics(req.keys())
  }, [])
  //
  const handlePage = useCallback(
    (page) => {
      if(page === 'prev') {
        if(picNow >= 1)
          setPicNow(picNow - 1)
      } else if(page === 'next') {
        if(picNow <= pics.length - 2)
          setPicNow(picNow + 1)
      } else {
        setPicNow(page)
      }
    },
    [picNow, pics],
  )
  return (
    <div>
      {pics.length > 0 ? (
        <PicContainer pics={ pics } picNow={ picNow }>
          <PageButtonList 
            pageCount={ pics.length } 
            pageNow={ picNow } 
            toOtherPage={ handlePage }
          />
        </PicContainer>
      ) : ('loading...')}
    </div>
  )
}