import React from 'react'
import { Box, Typography } from '@material-ui/core';
import { StarPart } from './multiLevels'

const ResultContent = ({ content={} }) => {
  const { level, score, star, isPass } = content
  //
  return (
    <Box>
      <Typography variant={'h4'}>{ '--Result--' }</Typography>
      {level && (
        <Typography variant={'subtitle1'}>{ 'clear level: ' + level }</Typography>
      )}
      <Typography variant={'subtitle1'}>{ 'score: ' + score }</Typography>
      {!isPass && (
        <Typography>
          { 'failed... :(' }
        </Typography>
      )}
      <Box>
        {isPass && typeof(star) === 'number' && (
          <StarPart star={ star } />
        )}
      </Box>
    </Box>
  )
}

export default ResultContent