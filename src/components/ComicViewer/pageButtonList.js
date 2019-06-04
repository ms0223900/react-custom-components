import React from 'react'
import PageButton from './pageButton'

export default ({ pageCount, pageNow, toOtherPage }) => {
  return (
    <div>
      {[...Array(pageCount).keys()].map(p => (
        <PageButton 
          key={ p }
          pageText={ p }
          pageNow={ p === pageNow }
          clickFn={ toOtherPage && toOtherPage.bind(this, p) } />
      ))}
    </div>
  )
}