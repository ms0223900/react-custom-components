import { ActionTypes } from './actions'

const composeReducers = (...reducers) => (state, action) => {
  let newState = state
  reducers.forEach(reducer => {
    newState = reducer(newState, action)
    console.log(newState)
  })
  return newState
}

export const count = (state, action) => {
  const { type } = action
  switch (type) {
  case ActionTypes.ADD_COUNT:  
    return ({
      ...state,
      count: state.count + 1
    })
  case ActionTypes.MINUS_COUNT:  
    return ({
      ...state,
      count: state.count - 1
    })
  default:
    return state
  }
}

export const user = (state, action) => {
  const { type, userData } = action
  switch (type) {
  case ActionTypes.GET_USER:
    return ({
      ...state,
      users: state.users.length > 0 ? state.users : userData,
    })
  case ActionTypes.ADD_USER:
    return ({
      ...state,
      users: [
        ...state.users,
        {
          id: parseInt(state.users[state.users.length - 1].id) + 1,
          username: userData,
        }
      ]
    })
  default:
    return state
  }
}

export default composeReducers(
  count,
  user,
)