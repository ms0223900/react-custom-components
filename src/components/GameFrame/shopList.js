/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_SHOP_LIST, apiUrl, UPDATE_USER_BUY_LIST, CREATE_USER_BUY_LIST, UPDATE_USER, CREATE_USER_EMOTE_LIST, QUERY_USER_EMOTES } from './API'
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
  cancelBuyFn 
}) => {
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
  const [createUserEmoteList] = useMutation(CREATE_USER_EMOTE_LIST, {
    refetchQueries: [{
      query: QUERY_USER_EMOTES,
      variables: {
        userWhere: {
          username
        }
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
    type,
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
    const { itemId, userbuylistId, itemCount, emoteId } = itemInfo
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
        .then(res => {
          if(emoteId) {
            createUserEmoteList({
              variables: {
                data: {
                  username,
                  emoteId,
                }
              }
            })
            return res
          } else {
            return res
          }
        })
        .then(() => cancelBuyFn())
        //if emotes
        
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
  const [selectedShopType, setType] = useState('consumables')
  const [popupItemInfo, setInfo] = useState(null)
  const classes = useStyles_shopList()
  const handleOpenConfirmBuy = itemInfo => {
    // console.log(itemInfo)
    setInfo(itemInfo)
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
          <Button onClick={ () => setType('consumables') }>{'consumables'}</Button>
          <Button onClick={ () => setType('emote') }>{'emote'}</Button>
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
          itemInfo={ popupItemInfo }
          userInfo={ userInfo }
          setUserInfo={ setUserInfo }
          cancelBuyFn={ () => setPopupConfirm(false) } />
      )}
    </Box>
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

