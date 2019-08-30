/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_SHOP_LIST, apiUrl, UPDATE_USER_BUY_LIST, CREATE_USER_BUY_LIST } from './API'
import { Paper, Box, Typography, Button } from '@material-ui/core';
import { 
  shopData_mockData,
  diceImgSrc, 
} from './config'
import { makeStyles } from '@material-ui/styles';
import {
  useStyles_shopList,
  useStyles_singleShopItem,
  useStyles_confirmBuyPopup,
} from './styles'

const username_mockData = 'aaa'

const mergeItemCountShopLists = (shoplists, userbuylists) => {
  const newShopLists = [...shoplists]
  for (let i = 0; i < userbuylists.length; i++) {
    const { id, itemId, itemCount } = userbuylists[i]
    newShopLists[itemId - 1] = {
      ...newShopLists[itemId - 1],
      itemCount,
      userbuylistId: id,
    }
  }
  return newShopLists
}


const SingleShopItem = ({ itemInfo, buyFn, }) => {
  const {
    id,
    itemName, 
    itemPrice, 
    itemImgSrc,
    itemCount, 
    isOnlyOne
  } = itemInfo
  const classes = useStyles_singleShopItem()
  const isBought = itemCount > 0 && isOnlyOne
  const handleBuy = () => {
    if(!isBought) {
      buyFn({
        ...itemInfo,
        itemId: id,
        itemMaxCount: isOnlyOne ? 1 : 99
      })
    }
  }
  return (
    <Paper
      className={ classes.root } 
      onClick={ handleBuy }
    >
      <Typography variant='h6'>
        { itemName }
      </Typography>
      <Box>
        <img
          className={ classes.img } 
          src={ itemImgSrc } 
          alt={ 'itemPic' } />
      </Box>
      {!isOnlyOne && (
        <Typography className={ classes.countNumber }>
          { `x ${ itemCount || 0 }` }
        </Typography>
      )}
      {isBought ? (
        <Button disabled>
          { 'bought' }
        </Button>
      ) : (
        <Button variant='contained'>
        { 'C ' + itemPrice }
      </Button>
      )}
    </Paper>
  )
}

const ShopHeader = ({ gameCoin=10000, closeFn }) => {
  return (
    <Box display='flex'>
      <Typography>{ `Coin x ${ gameCoin }` }</Typography>
      <Button onClick={ closeFn }>{ 'X' }</Button>
    </Box>
  )
}

const ConfirmPopup = ({ itemInfo, confirmBuyFn, cancelBuyFn }) => {
  const [updateUserBuyList] = useMutation(UPDATE_USER_BUY_LIST, {
    update(cache, { data }) {
      console.log(data)
    }
  })
  const [createUserBuyList] = useMutation(CREATE_USER_BUY_LIST)
  const classes = useStyles_confirmBuyPopup()
  const {
    itemName='aaa', 
    itemPrice=99, 
    itemImgSrc=diceImgSrc, 
    itemMaxCount=5,
  } = itemInfo
  const [count, setCount] = useState(1)
  const totalPrice = itemPrice * count

  const handleChangeCount = useCallback(e => {
    const { value } = e.target
    if(value <= itemMaxCount && value >= 1) {
      setCount(value)
    }
    console.log(value)
  }, [count])

  const handleConfirmBuy = useCallback(() => {
    const { itemId, userbuylistId, itemCount } = itemInfo
    //set user coin

    //set user bought list
    //id, count
    console.log(itemInfo)
    if(userbuylistId) {
      //update
      updateUserBuyList({
        variables: {
          id: userbuylistId,
          itemCount: itemCount + parseInt(count),
        }
      })
      .then(() => cancelBuyFn())
    } else {
      //create
      createUserBuyList({
        variables: {
          data: {
            username: username_mockData,
            itemId,
            itemCount: count,
          }
        }
      })
      .then(() => cancelBuyFn())
    }
  }, [count, totalPrice, itemInfo])
  return (
    <Box>
      <Paper className={ classes.root }>
        <Typography>{ itemName }</Typography>
        <img src={ itemImgSrc } alt={ 'itemImage' } />
        <Box>
          <input 
            type={'number'} 
            value={ count } 
            onChange={ handleChangeCount } />
        </Box>
        <Typography>
          { totalPrice }
        </Typography>
        <Box>
          <Button onClick={ handleConfirmBuy }>{ 'confirm' }</Button>
          <Button onClick={ cancelBuyFn }>{ 'cancel' }</Button>
        </Box>
      </Paper>
    </Box>
  )
}

const ShopList = ({ shopData=shopData_mockData }) => {
  const [popupConfirm, setPopupConfirm] = useState(false)
  const [popupItemInfo, setInfo] = useState(null)
  const classes = useStyles_shopList()
  const handleOpenConfirmBuy = itemInfo => {
    // console.log(itemInfo)
    setInfo(itemInfo)
  }
  useEffect(() => {
    popupItemInfo && setPopupConfirm(true)
  }, [popupItemInfo])
  return (
    <Box className={ classes.root }>
      <Box className={ classes.back } />
      <Paper className={ classes.shopList }>
        <ShopHeader />
        <Box
          // display={ 'flex' } 
          className={ classes.container }
        >
          {shopData.map(data => (
            <SingleShopItem 
              key={ data.id }
              itemInfo={ {
                ...data,
                itemImgSrc: apiUrl + data.itemImgSrc.url,
              } }
              buyFn={ handleOpenConfirmBuy }  
            />
          ))}
        </Box>
      </Paper>
      {popupConfirm && (
        <ConfirmPopup 
          itemInfo={ popupItemInfo }
          cancelBuyFn={ () => setPopupConfirm(false) }  />
      )}
    </Box>
  )
}

export default () => {
  const { loading, error, data } = useQuery(QUERY_SHOP_LIST, {
    variables: {
      username: username_mockData
    }
  })
  if(loading) {
    return 'loading...'
  } else {
    const { shoplists, userbuylists } = data
    console.log(data)
    const mergedShopListsData = mergeItemCountShopLists(shoplists, userbuylists)
    console.log(mergedShopListsData)
    return (
      <ShopList shopData={ mergedShopListsData } />
    ) 
  }
  
}