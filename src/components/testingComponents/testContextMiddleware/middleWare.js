import allActions, { ActionTypes, getUser, minusCount } from './actions'
import { useLazyQuery } from '@apollo/react-hooks'
import { QUERY_USERS, apiUrl } from '../../GameFrame/API'
import { match } from './fn'

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
  return mutationFn ? 
    // mutationFn({
    //   variables: {
    //     data: {
    //       username: userData,
    //       email: 'abbacff' + userData
    //     }
    //   },
    // })
    timeoutPromise(2000)
      .then(res => {
        window.alert('user added successful!' + userData)
        console.log(res)
      })
      .catch(err => console.log(err))
    : (
      window.alert('added without db!')
    )
  
}

const middleware_getUser = (action, dispatch) => {
  return (
    fetch(apiUrl + 'users')
      .then(res => {
        return res.json()
      })
      .then(res => {
        dispatch( getUser(res) )
      })
      .catch(err => window.alert(err))
  )
}

const middleWares = (action, dispatch) => {
  return (
    match(action.type)
      .equals(ActionTypes.ADD_USER)
      .then( () => middleware_addUser(action, dispatch) )
      .equals(ActionTypes.ADD_COUNT)
      .then( () => middleware_getUser(action, dispatch) )
      .equals(ActionTypes.MINUS_COUNT)
      .then()
      .else('')
  )
}

const applyMiddleware = dispatch => action => {
  middleWares(action, dispatch)
    .then(res => {
      dispatch(action)
    })
  
}

export default applyMiddleware