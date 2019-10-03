import React from 'react'

const defaultPage = Page => ({ ...props }) => {
  // const 
  return (
    <Page {...props} />
  )
}

export default defaultPage