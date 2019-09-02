/* eslint-disable no-unused-vars */
import React from 'react'
import { ShopList, username_mockData, mergeItemCountShopLists } from './shopList'
import { useQuery } from '@apollo/react-hooks';
import { QUERY_SHOP_LIST } from './API';

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
      // console.log(mergedShopListsData)
      const itemListsData = mergedShopListsData.filter(data => data.itemCount > 0)
      return (
        <ShopList 
          isShop={ false }
          userInfo={ userInfo }
          setUserInfo={ setUserInfo }
          shopData={ itemListsData } />
      ) 
    }
  }
}
