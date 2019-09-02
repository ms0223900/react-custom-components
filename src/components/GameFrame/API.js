import gql from 'graphql-tag'
import Strapi from 'strapi-sdk-javascript/build/main'
import { client } from '../../../stories/API'

export const apiUrl = 
  process.env.NODE_ENV === 'production' ? 
  'https://intense-brushlands-46000.herokuapp.com' : 
  process.env.STORYBOOK_API || 'http://localhost:1337/' 

export const strapi = new Strapi(apiUrl)
export const signUp = (sameUsernames, registerRequest, setErr, setUserInfo) => {
  try {
    const { username, email, password } = registerRequest
    if(sameUsernames.length > 0) {
      throw {
        message: 'Username have been used!'
      }
    }
    return strapi
      .register(username, email, password)
      .then(res => {
        console.log(res)
        const { id, user } = res
        localStorage.setItem('username', user.username)
        localStorage.setItem('userId', id)
        setUserInfo({
          ...user,
          isLoggedIn: true,
        })
        return user
      })
      .catch(e => setErr(e.message)) 
  } catch (e) {
    setErr(e.message)
  }
}
const logIn = (username, pwd, setErr) => (
  strapi
    .login(username, pwd)
    .then(res => {
      console.log(res)
      const { id, user } = res
      localStorage.setItem('username', user.username)
      localStorage.setItem('userId', id)
      return user
      // location.reload()
    })
    .catch(e => {
      setErr && setErr(e.message)
    }) 
)

export const setUserInfoFromRes = (user, setFn) => {
  const { id, username, point, rank } = user
  setFn({
    id,
    username,
    point,
    rank,
    isLoggedIn: true,
  })
}

export const logInAndSetInfo = (username, pwd, setErrFn, setFn) => {
  logIn(username, pwd, setErrFn)
    .then(user => {
      // console.log(user)
      setUserInfoFromRes(user, setFn)
    })
}




export const QUERY_SHOP_LIST = gql`
  query shopLists($userWhere: JSON) {
    shoplists {
      id
      itemName
      itemPrice
      isOnlyOne
      itemImgSrc {
        url
      }
    }
    userbuylists(where: $userWhere, sort: "itemId") {
      id
      itemId
      itemCount
    }
    # users(where: $userWhere) {
    #   point
    # }
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
        id
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
        username
        id
        itemId
        itemCount
      }
    }
  }`

export const QUERY_USER = gql`
  query QUERY_USER($id: ID!) {
    user(id: $id) {
      username
      point
      rank
    }
  }`

export const QUERY_USERS = gql`
  query QUERY_USERS($userWhere: JSON) {
    users(where: $userWhere) {
      id
      username
      point
      rank
    }
  }`

export const UPDATE_USER = gql`
  mutation UPDATE_USER($id: ID!, $point: Int) {
    updateUser(input: {
      where: {
        id: $id
      },
      data: {
        point: $point
      }
    }) {
      user {
        id
        username
        point
        rank
      }
    }
  }`