// import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QUERY_SHOP_LIST, CREATE_USER_BUY_LIST, UPDATE_USER_BUY_LIST, CREATE_USER_EMOTE_LIST, QUERY_USER_EMOTES } from './API'

export const useCreateUserBuyList = (username) => {
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
  return createUserBuyList
}

export const useUpdateUserBuyList = () => {
  const [updateUserBuyList] = useMutation(UPDATE_USER_BUY_LIST)
  return updateUserBuyList
}

export const useCreateUserEmoteList = (username) => {
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
  return createUserEmoteList
}