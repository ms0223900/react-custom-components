import React from 'react'
import { Box, Typography } from '@material-ui/core';
import { StarPart } from './multiLevels'

const ResultContent = ({ content={} }) => {
  const { level, score, star, isPass, ...bonuses } = content
  const allBonuses = Object.keys(bonuses)
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
      <hr />
      <Box>
        {allBonuses.map(bonus => (
          <Typography variant={'subtitle1'}>
            { `${ bonus } +${ bonuses[bonus] }` }
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

export default ResultContent