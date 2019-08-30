import gql from 'graphql-tag'

export const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
  'https://intense-brushlands-46000.herokuapp.com' : 
  process.env.STORYBOOK_API || 'http://localhost:1337/' 

export const getShopList = gql`
  query shopLists($username: String!) {
  shoplists {
    id
    itemName
    itemPrice
    isOnlyOne
    itemImgSrc {
      url
    }
  }
  userbuylists(where: {
    username: $username
  }, sort: "itemId") {
    id
    itemId
    itemCount
  }
}`

export const UPDATE_USER_BUY_LIST = gql`
  mutation updateUserBuyList($id: ID!, $itemCount: Int!) {
    updateUserbuylist(input: {
      where: {
        id: $id
      },
      data: {
        itemCount: $itemCount
      }
    }) {
      userbuylist {
        itemId
        itemCount
      }
    }
  }`

export const CREATE_USER_BUY_LIST = gql`
  mutation createUserBuyList($data: UserbuylistInput) {
    createUserbuylist(input: {
      data: $data
    }) {
      userbuylist {
        id
        itemId
      }
    }
  }`