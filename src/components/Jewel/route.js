import React, { useState, useCallback, useContext } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { HouseRounded, AllInboxRounded } from '@material-ui/icons'
import { Box, Typography, Button } from '@material-ui/core';
import JewelGame from '.'
import ResultContent from '../GameFrame/resultContent';
import GameFrame from '../GameFrame';
import JewelLevelEnter from './jewelLevelEnter'
import { 
  gameRequirements_mockData 
} from './config'
import MultiLevels from '../GameFrame/multiLevels';
import ContextStore, { ContextWrapper } from '../GameFrame/context'
import { GameStatsFrameWithCtx } from '../GameFrame/gameStats';
import { ShopListWithCtxWithoutDB } from '../GameFrame/shopList';
import { addStats } from '../GameFrame/actionsAndReducers/actions';
import { allStats } from '../GameFrame/gameStats/config';
import { jewelShopList_init } from './jewelShopList';

const levelData_init = gameRequirements_mockData.map((data, i) => ({
  id: i,
  level: i + 1,
  star: 0
}))

// const itemFn_potion = ({
// itemName: 'Potion',
// fn: () => {
//   window.alert(`your life increase ${1}!`)
//   dispatch && dispatch( addStats(allStats.life, 1) )
// }
// })

const itemFn_bomb = (gameRef) => ({
  itemName: 'Bomb',
  fn: () => {
    // window.alert(`bomb x ${1}!`)
    gameRef && gameRef.current.handleSetBomb(3)
  }
})

const itemFn_thunder = (gameRef) => ({
  itemName: 'Thunder',
  fn: () => {
    // window.alert(`bomb x ${1}!`)
    gameRef && gameRef.current.handleSetThunder(2)
  }
})

const GameMode_JewelsRequirement = ({ 
  match, 
  history,
  setLevelDataFn,
  gameRequirements=gameRequirements_mockData 
}) => {
  const { level } = match.params
  const LEVEL = parseInt(level) - 1
  //
  const handleNextLevel = () => {
    const nextLevel = parseInt(level) + 1
    if(nextLevel <= gameRequirements.length) {
      history.push(`/jewelGame/enter/${ parseInt(level) + 1 }`)
    }
  }
  const handleSetLevelData = ({ star, score }) => {
    setLevelDataFn(LEVEL, star, score)
  }
  const consumedItemFns = [
    itemFn_bomb,
    itemFn_thunder,
  ]
  return (
    <>
    <Typography>{ 'Level: ' + level }</Typography>
    <GameFrame 
      key={ LEVEL }
      GameComponent={ JewelGame }
      PopupComponent={ ResultContent }
      consumedItemFns={ consumedItemFns }
      resultNextFns={ [handleNextLevel] }
      gameOverFns={ [handleSetLevelData] }
      gameRequirements={ gameRequirements[LEVEL] } />
    </>
  )
}

const JewelMultiLevels = ({ levelData }) => {
  return (
    <>
      <MultiLevels 
        levelData={ levelData }
        isComponentView={ false }
        baseUrl={ '/jewelGame/enter/' } />
    </>
  )
}


const JewelGameRouter = () => {
  const { dispatch } = useContext(ContextStore)
  const [showShop, setShopShow] = useState(false)
  const [showItemList, setItemListShow] = useState(false)
  // const [showShop, setShow] = useState(false)
  const [levelData, setLevelData] = useState(levelData_init)
  const handleSetLevelData = useCallback((id, star, highScore) => {
    let newLevelData = [...levelData]
    newLevelData[id] = {
      ...newLevelData[id],
      star,
      highScore
    }
    setLevelData(newLevelData)
  }, [levelData])
  //
  const itemFn_potion = ({
    itemName: 'Potion',
    fn: () => {
      window.alert(`your life increase ${1}!`)
      dispatch && dispatch( addStats(allStats.life, 1) )
    }
  })
  //
  return (
    <Router>
      <Link to={'/jewelGame'}>
        {'jewel game'}
      </Link>
      <Box>
        <GameStatsFrameWithCtx />
        <Button onClick={ () => setShopShow(!showShop) }>
          <HouseRounded />
        </Button>
        <Button onClick={ () => setItemListShow(!showItemList) }>
          <AllInboxRounded />
        </Button>
        {showShop && (
          <ShopListWithCtxWithoutDB 
            isShop={ true }
            closeFn={ () => setShopShow(false) } />
        )}
        {showItemList && (
          <ShopListWithCtxWithoutDB 
            isShop={ false }
            consumedItemFns={ [itemFn_potion] }
            closeFn={ () => setItemListShow(false) } />
        )}
      </Box>
     
      <Route 
        path={ '/jewelGame' }
        exact
        render={ () => (
          <JewelMultiLevels levelData={ levelData } />
        ) } 
      />
      <Route 
        path={ '/jewelGame/enter/:level' }
        render={ props => (
          <JewelLevelEnter 
            {...props}
            gameEnterInfo={{ allgameRequirements: gameRequirements_mockData }} />
        ) }  
      />
      <Route 
        path={ '/jewelGame/level/:level' }
        render={ props => (
          <GameMode_JewelsRequirement 
            {...props}
            setLevelDataFn={ handleSetLevelData } />
        ) } />
    </Router>
  )
}

export default () => (
  <ContextWrapper customCtx={{
    shopList_custom: jewelShopList_init
  }}>
    <JewelGameRouter />
  </ContextWrapper>
)