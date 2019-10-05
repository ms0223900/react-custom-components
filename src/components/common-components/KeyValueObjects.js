import React from 'react'
import { Box, List, ListItemText } from '@material-ui/core'

const KeyValueObjComponent = ({ obj }) => {
  const values = Object.values(obj)
  const keyValues = Object.keys(obj).map((name, i) => ({
    name,
    value: values[i]
  }))
  return (
    <Box>
      <List>
        {keyValues.map(val => (
          <ListItemText primary={ `${val.name}: ${val.value}` } />
        ))}
      </List>
    </Box>
  )
}

export default KeyValueObjComponent