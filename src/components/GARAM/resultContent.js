import React from 'react'
import { Box, Typography } from '@material-ui/core';

const ResultContent = ({ content={} }) => {
  const { level, score } = content
  return (
    <Box>
      <Typography variant={'h4'}>{ '--Result--' }</Typography>
      <Typography>{ 'clear level: ' + level }</Typography>
      <Typography>{ 'score: ' + score }</Typography>
    </Box>
  )
}

export default ResultContent