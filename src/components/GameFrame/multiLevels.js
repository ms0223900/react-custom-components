/* eslint-disable no-unused-vars */
import React from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { StarRounded, StarBorderRounded } from '@material-ui/icons'
import { Box, Paper, Typography, Container, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  singleLevelItem: {
    display: 'inline-block',
    margin: 6,
    textAlign: 'center',
    '& a': {
      textDecoration: 'none',
    }
  }
})

const levelData_mockData = [
  {
    id: 0,
    level: 1,
    star: 0,
  },
  {
    id: 1,
    level: 2,
    star: 1,
  },
  {
    id: 2,
    level: 3,
    star: 2,
  },
  {
    id: 3,
    level: 4,
    star: 3,
  },
]

export const StarPart = ({ star }) => {
  const starArr = [...Array(star).keys()]
  const starOutlineArr = [...Array(3 - star).keys()]
  return (
    <>
      {starArr.map(st => (
        <StarRounded key={ st } />
      ))}
      {starOutlineArr.map(st => (
        <StarBorderRounded key={ st } />
      ))}
    </>
  )
}


const SingleLevelItem = ({ level, star, isComponentView=true }) => {
  const classes = useStyles()
  const MainItem = () => (
    <Paper>
      <Typography variant={'h4'}>{ level }</Typography>
      <Box>
        <StarPart star={ star } />
      </Box>
    </Paper>
  )
  return (
    <Box className={ classes.singleLevelItem }>
      {isComponentView ? (
        <MainItem />
      ) : (
        <Link to={ `/gameMode/multiLevel/level/${ level }` }>
          <MainItem />
        </Link>
      )}
    </Box>
  )
}

const MultiLevels = ({ levelData, isComponentView }) => {
  return (
    <Container>
      {levelData.map(data => (
        <SingleLevelItem 
          key={ data.id }
          isComponentView={ isComponentView } 
          {...data} />
      ))}
    </Container>
  )
}

export default MultiLevels