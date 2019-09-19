/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect, useContext } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_SHOP_LIST, apiUrl, UPDATE_USER, updateUserBuyListFn, createUserBuyListFn, updateUserFn } from './API'
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
import { mergeItemCountShopLists } from './fn'
import { 
  useCreateUserBuyList,
  useUpdateUserBuyList,
  useCreateUserEmoteList 
} from './customHooks';
import ContextStore, { ContextWrapper } from './context';
import { buyItem, consumeItem } from './actionsAndReducers/actions';

export const username_mockData = 'aaa'


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
    //shop
    if(!isBought && isShop) {
      buyFn({
        ...itemInfo,
        itemId: id,
        itemMaxCount: isOnlyOne ? 1 : 99
      })
    } else {
      //item list
      buyFn(itemInfo)
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
  isOnlyCtx,
  itemInfo, 
  userInfo, 
  setUserInfo, 
  cancelBuyFn 
}) => {
  const {
    itemName='aaa', 
    itemPrice=99, 
    itemImgSrc=diceImgSrc, 
    itemMaxCount=5,
    type,
  } = itemInfo
  const { dispatch } = useContext(ContextStore)
  const username = userInfo ? userInfo.username : username_mockData
  const classes = useStyles_confirmBuyPopup()

  const updateUserBuyList = useUpdateUserBuyList()
  const createUserBuyList = useCreateUserBuyList(username)
  const createUserEmoteList = useCreateUserEmoteList(username)
  const [updateUser] = useMutation(UPDATE_USER)
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
    const { itemId, userbuylistId, itemCount, emoteId } = itemInfo
    const remainPoints = parseInt(userInfo.point) - parseInt(totalPrice)
    if(isOnlyCtx) {
      const { id } = itemInfo
      dispatch && dispatch( buyItem(id, numCount) )
      cancelBuyFn()
    } else {
      //db
      const updateList = () => {
        if(userbuylistId) {
          //update
          updateUserBuyListFn(updateUserBuyList, cancelBuyFn, {
            userbuylistId, itemCount, numCount
          })
        } else {
          //create
          createUserBuyListFn(createUserBuyList, createUserEmoteList, cancelBuyFn, {
            username, itemId, numCount, emoteId
          })
        }
      }
      if(remainPoints >= 0) {
        //set user coin...
        updateUserFn(updateUser, setUserInfo, {
          userInfo, remainPoints
        })
        //set user bought list
        //id, count
        console.log(itemInfo)
        updateList()
      }
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
  isOnlyCtx=true,
  shopData=shopData_mockData, 
  userInfo, 
  setUserInfo, 
  consumedItemFns=[],
  closeFn 
}) => {
  const { dispatch } = useContext(ContextStore)
  const [popupConfirm, setPopupConfirm] = useState(false)
  const [selectedShopType, setType] = useState('consumables')
  const [popupItemInfo, setInfo] = useState(null)
  const classes = useStyles_shopList()
  
  const handleOpenConfirmBuy = itemInfo => {
    // console.log(itemInfo)
    if(isShop) {
      setInfo(itemInfo)
    } else {
      //consume item
      const { id, itemName } = itemInfo
      //item effect
      consumedItemFns.length > 0 && consumedItemFns.forEach(obj => {
        obj.itemName === itemName && obj.fn()
      })
      dispatch && dispatch( consumeItem(id, 1) )
    }
  }
  useEffect(() => {
    popupItemInfo && setPopupConfirm(true)
  }, [popupItemInfo])
  console.log(shopData)

  const ShopListFromData = ({ type='consumables', shopData }) => (
    <>
      {shopData
        .filter(data => data.type === type)
        .map(data => {
          const itemImgSrc = () => {
            let url
            if(type === 'emote') {
              url = data.emote.emoteImg.url
            } else {
              url = data.itemImgSrc.url
            }
            return url.includes('http') ? url : apiUrl + url
          }
          return (
            <SingleShopItem 
              key={ data.id }
              isShop={ isShop }
              itemInfo={ {
                ...data,
                itemImgSrc: itemImgSrc(),
              } }
              buyFn={ handleOpenConfirmBuy }  
            />
          )
        })
      }
    </>
  )

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
          <Button 
            color={ selectedShopType === 'consumables' ? 'primary': 'default' }
            onClick={ () => setType('consumables') }>{'consumables'}</Button>
          <Button 
            color={ selectedShopType === 'emote' ? 'primary': 'default' }
            onClick={ () => setType('emote') }>{'emote'}</Button>
          <hr />
          {selectedShopType === 'consumables' && (
            <ShopListFromData 
              type={ 'consumables' }
              shopData={ shopData } />
          )}
          {selectedShopType === 'emote' && (
            <ShopListFromData 
              type={ 'emote' }
              shopData={ shopData } />
          )}
        </Box>
      </Paper>
      {popupConfirm && (
        <ConfirmPopup 
          isOnlyCtx={ isOnlyCtx }
          itemInfo={ popupItemInfo }
          userInfo={ userInfo }
          setUserInfo={ setUserInfo }
          cancelBuyFn={ () => setPopupConfirm(false) } />
      )}
    </Box>
  )
}

export const ShopListWithCtxWithoutDB = props => {
  const contextProps = useContext(ContextStore)
  return (
    <ShopList 
      {...props} 
      {...contextProps}
      isOnlyCtx={ true }
      shopData={ contextProps.shopList } />
  )
}

export const shopOrItemList = (isShop) => ({ userInfo, setUserInfo }) => {
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
      let mergedShopListsData
      if(data) {
        // console.log(data)
        mergedShopListsData = mergeItemCountShopLists(data)
        if(!isShop) {
          mergedShopListsData = mergedShopListsData.filter(data => data.itemCount > 0)
        }
        console.log(mergedShopListsData)
      }
      const shopListProps = {
        isShop,
        userInfo,
        setUserInfo
      }
      return (
        <>
          <ShopList 
            {...shopListProps}
            shopData={ mergedShopListsData } />
        </>
      ) 
    }
  }
}

export default shopOrItemList(true)

