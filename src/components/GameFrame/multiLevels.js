/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from 'react'
import { BrowserRouter as Router, Link } from 'react-router-dom'
import { 
  StarRounded, 
  StarBorderRounded,
  NavigateBeforeRounded,
  NavigateNextRounded 
} from '@material-ui/icons'
import { Box, Paper, Button, Typography, Container, makeStyles } from '@material-ui/core';

const singleLevelItem_width = 80
const singleLevelItem_margin = 6
const singleRowAmount = 4
const singleColumnAmount = 3
const allLevelPages = (levelData) => {
  const levels = levelData.length
  const pages = Math.ceil(levels / (singleRowAmount * singleColumnAmount))
  return [...Array(pages).keys()]
}

const useStyles = makeStyles({
  rootPaper: {
    display: 'inline-block',
  }, 
  singleLevelItem: {
    width: singleLevelItem_width,
    height: singleLevelItem_width,
    // display: 'inline-block',
    margin: singleLevelItem_margin,
    textAlign: 'center',
    '&:hover': {
      backgroundColor: '#eee',
    }
  },
  multiLevelContainer: {
    width: props => (props.singleRowAmount || 4) * (singleLevelItem_width + singleLevelItem_margin * 2),
    minHeight: singleColumnAmount * (singleLevelItem_width + singleLevelItem_margin * 2),
    backgroundColor: '#eee',
    flexWrap: 'wrap',
  },
  pageDot: {
    width: 10,
    height: 10,
    margin: 4,
    borderRadius: 1000,
    cursor: 'pointer',
    backgroundColor: props => props.isActive ? '#a00' : '#aaa',
    '&:hover': {
      backgroundColor: '#a00',
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

const SingleLevelItem = ({ 
  level, 
  star, 
  baseUrl='/gameMode/multiLevel/level/',
  isComponentView=true 
}) => {
  const classes = useStyles()
  const MainItem = ({ classes }) => (
    <Paper className={ classes.singleLevelItem }>
      <Typography variant={'h4'}>{ level }</Typography>
      <Box>
        <StarPart star={ star } />
      </Box>
    </Paper>
  )
  return (
    <>
      {isComponentView ? (
        <MainItem classes={ classes } />
      ) : (
        <Link to={ baseUrl + level }>
          <MainItem classes={ classes } />
        </Link>
      )}
    </>
  )
}

const PageDot = ({ isActive, clickFn }) => {
  const classes = useStyles({ isActive })
  return (
    <Box  
      className={ classes.pageDot }
      onClick={ clickFn } 
    />
  )
}

const MultiLevels = ({ 
  baseUrl,
  levelData=levelData_mockData, 
  isComponentView 
}) => {
  const classes = useStyles({ singleRowAmount })
  const [pageNow, setPage] = useState(0)

  const amountPerPage = singleRowAmount * singleColumnAmount
  const levleDataThisPage = levelData.slice(amountPerPage * pageNow, amountPerPage * (pageNow + 1))
  const pages = allLevelPages(levelData)

  const handleChangePage = useCallback((isNext, page) => {
    const maxPage = pages.length - 1
    if(typeof(page) !== 'number') {
      if(!isNext) {
        setPage(page => (page - 1 >= 0 ? page - 1 : maxPage))
      } else {
        setPage(page => (page + 1 <= maxPage ? page + 1 : 0))
      }
    } else {
      setPage(page)
    }
  }, [pageNow])
  //
  return (
    <Container>
      <Paper className={ classes.rootPaper }>
        <Box display={ 'inline-flex' } alignItems={'center'}>
          <Box>
            <Button onClick={ () => handleChangePage(false) }>
              <NavigateBeforeRounded />
            </Button>
          </Box>
          <Box>
            <Box 
              display={ 'flex' } 
              justifyContent={'flex-start'}
              className={ classes.multiLevelContainer }
            >
              {levleDataThisPage.map(data => (
                <SingleLevelItem 
                  key={ data.id }
                  baseUrl={ baseUrl }
                  isComponentView={ isComponentView } 
                  {...data} />
              ))}
            </Box>
            <Box display={'flex'} justifyContent={'center'}>
              {pages.map((page, i) => (
                <PageDot 
                  key={ i }
                  isActive={ pageNow === i }
                  clickFn={ () => handleChangePage(null, i) } />
              ))}
            </Box>
          </Box>
          <Box>
            <Button onClick={ () => handleChangePage(true) }>
              <NavigateNextRounded />
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}

export default MultiLevels