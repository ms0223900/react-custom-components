import React from 'react'
import Button from '@material-ui/core/Button'

export default ({ btnText='0', btnFn }) => {
  return (
    <Button onClick={ btnFn }>
      { btnText }
    </Button>
  )
}