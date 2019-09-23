import allActions, { ActionTypes, getUser } from './actions'
import { useLazyQuery } from '@apollo/react-hooks'
import { QUERY_USERS, apiUrl } from '../../GameFrame/API'

const timeoutPromise = (time=1000) => (
  new Promise(res => {
    setTimeout(() => {
      res('hi')
    }, time)
  })
)

const middleware_addUser = (action, dispatch) => {
  const { userData, mutationFn } = action
  // console.log(mutationFn)
  mutationFn ? 
    // mutationFn({
    //   variables: {
    //     data: {
    //       username: userData,
    //       email: 'abbacff' + userData
    //     }
    //   },
    // })
    timeoutPromise()
      .then(res => {
        window.alert('user added successful!' + userData)
        console.log(res)
      })
      .catch(err => console.log(err))
    : (
      window.alert('added without db!')
    )
  return
}

const middleware_getUser = (action, dispatch) => (
  fetch(apiUrl + 'users')
    .then(res => {
      return res.json()
    })
    .then(res => {
      dispatch( getUser(res) )
    })
)

const middleWares = (action, dispatch) => {
  switch (action.type) {
  case ActionTypes.ADD_COUNT: 
    // return middleware_getUser(action, dispatch)
    return
  case ActionTypes.ADD_USER: {
    return middleware_addUser(action, dispatch)
  }
  default:
    return null
  }
}

const applyMiddleware = dispatch => action => {
  dispatch(action) ||
  middleWares(action, dispatch)
}

export default applyMiddleware