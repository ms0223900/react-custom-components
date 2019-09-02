/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_SHOP_LIST, apiUrl, UPDATE_USER_BUY_LIST, CREATE_USER_BUY_LIST, UPDATE_USER } from './API'
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

export const username_mockData = 'aaa'

export const mergeItemCountShopLists = (shoplists, userbuylists) => {
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


const SingleShopItem = ({ isShop=true, itemInfo, buyFn, }) => {
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
    if(!isBought && isShop) {
      buyFn({
        ...itemInfo,
        itemId: id,
        itemMaxCount: isOnlyOne ? 1 : 99
      })
    }
  }
  const BuyButton = () => isBought ? (
      <Button disabled>
        { 'bought' }
      </Button>
    ) : (
      <Button variant='contained'>
      { 'C ' + itemPrice }
    </Button>
    )
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
      {isShop && <BuyButton />}
    </Paper>
  )
}

const ShopHeader = ({ gameCoin=0, closeFn }) => {
  return (
    <Box display='flex'>
      <Typography>{ `Coin x ${ gameCoin }` }</Typography>
      <Button variant={'contained'} onClick={ closeFn }>{ 'X' }</Button>
    </Box>
  )
}

const ConfirmPopup = ({ 
  itemInfo, 
  userInfo, 
  setUserInfo, 
  cancelBuyFn }) => {
  const username = userInfo ? userInfo.username : username_mockData
  const [updateUserBuyList] = useMutation(UPDATE_USER_BUY_LIST)
  const [createUserBuyList] = useMutation(CREATE_USER_BUY_LIST, {
    update(cache, { data: { createUserbuylist } }) {
      console.log(createUserbuylist)
      const originData = cache.readQuery({ 
        query: QUERY_SHOP_LIST, 
        variables: {
          userWhere: {
            username
          }
        } 
      })
      // console.log(caaa)
      cache.writeQuery({
        query: QUERY_SHOP_LIST,
        variables: {
          userWhere: {
            username
          }
        },
        data: {
          ...originData, 
          userbuylists: [
            ...originData.userbuylists,
            createUserbuylist.userbuylist,
          ]
        }
      })
    },
    refetchQueries: [{
      query: QUERY_SHOP_LIST,
      variables: {
        username
      }
    }]
  })
  const [updateUser] = useMutation(UPDATE_USER)
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
    const numCount = parseInt(count)
    const { itemId, userbuylistId, itemCount } = itemInfo
    const updateList = () => {
      if(userbuylistId) {
        //update
        updateUserBuyList({
          variables: {
            id: userbuylistId,
            itemCount: itemCount + numCount,
          }
        })
        .then(() => cancelBuyFn())
      } else {
        //create
        createUserBuyList({
          variables: {
            data: {
              username,
              itemId,
              itemCount: numCount,
            }
          }
        })
        .then(() => cancelBuyFn())
      }
    }
    // updateList()
    const remainPoints = parseInt(userInfo.point) - parseInt(totalPrice)
    if(remainPoints >= 0) {
      //set user coin
      updateUser({
        variables: {
          id: userInfo.id,
          point: parseInt(userInfo.point) - parseInt(totalPrice)
        }
      })
      .then(res => {
        // console.log(res)
        setUserInfo({
          ...userInfo,
          point: res.data.updateUser.user.point
        })
      })
      //set user bought list
      //id, count
      console.log(itemInfo)
      updateList()
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

export const ShopList = ({ 
  isShop,
  shopData=shopData_mockData, 
  userInfo, 
  setUserInfo, 
  closeFn 
}) => {
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
        <ShopHeader 
          gameCoin={ userInfo && userInfo.point }
          closeFn={ closeFn } />
        <Box
          // display={ 'flex' } 
          className={ classes.container }
        >
          {shopData.map(data => (
            <SingleShopItem 
              key={ data.id }
              isShop={ isShop }
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
          userInfo={ userInfo }
          setUserInfo={ setUserInfo }
          cancelBuyFn={ () => setPopupConfirm(false) } />
      )}
    </Box>
  )
}

export default ({ userInfo, setUserInfo }) => {
  const username = userInfo ? userInfo.username : username_mockData
  const { loading, error, data } = useQuery(QUERY_SHOP_LIST, {
    variables: {
      userWhere: {
        username
      }
    }
  })
  if(loading) {
    return 'loading...'
  } else {
    if(userInfo && !userInfo.isLoggedIn) {
      return 'please log in first~'
    } else {
      const { shoplists, userbuylists } = data
      console.log(data)
      const mergedShopListsData = mergeItemCountShopLists(shoplists, userbuylists)
      console.log(mergedShopListsData)
      return (
        <ShopList 
          userInfo={ userInfo }
          setUserInfo={ setUserInfo }
          shopData={ mergedShopListsData } />
      ) 
    }
  }
}

