import React, {  } from 'react'
import PageButton from './pageButton'

const mockPageCount = 20

const reverseArr = (arr) => {
  let res = []
  for (let i = 0; i < arr.length; i++) {
    res = [ ...res, arr[arr.length - 1 - i] ]
  }
  return res
}


const pages = (pageCount, pageNow) => {
  if(pageCount > 9) {
    if(pageNow < 5) {
      return [...Array(8).keys(), '...', pageCount - 1]
    } else if(pageNow >= pageCount - 5 - 1) {
      console.log(reverseArr([ ...Array(8).keys() ]))
      const otherPages = reverseArr([ ...Array(8).keys() ]).map(k => k = pageCount - 1 - k)
      return [0, '...', ...otherPages]
    } else {
      const otherPages = [ ...Array(6).keys() ].map(k => k = k + (pageNow - 3))
      return [0, '...', ...otherPages, '...', pageCount - 1]
    }
  } else {
    return [...Array(7).keys()]
  }
}

const GetPage = ({ txt, pageNow, toOtherPage }) => {
  if(txt === '...') {
    return (
      <span>{ '...' }</span>
    )
  } else {
    return (
      <PageButton 
        key={ txt }
        pageText={ txt }
        pageNow={ txt === pageNow }
        clickFn={ toOtherPage && toOtherPage.bind(this, txt) } />
    )
  }
}

//pageNow start from 0
export default ({ pageCount=mockPageCount, pageNow=10, toOtherPage }) => {
  const PAGEs = pages(pageCount, pageNow)
  console.log(pageCount, pageNow)
  return (
    <div>
      {PAGEs.map((p, i) => (
        <GetPage
          key={ i } 
          txt={p}
          pageNow={pageNow}
          pageCount={pageCount}
          toOtherPage={toOtherPage}  />
      ))}
    </div>
  )
}
