export const ActionTypes = {
  ADD_COUNT: 'ADD_COUNT',
  MINUS_COUNT: 'MINUS_COUNT',
  //
  GET_USER: 'GET_USER',
  ADD_USER: 'ADD_USER',
}

export const addCount = () => ({
  type: ActionTypes.ADD_COUNT,
})
export const minusCount = () => ({
  type: ActionTypes.MINUS_COUNT,
})

export const getUser = (userData) => ({
  type: ActionTypes.GET_USER,
  userData,
})
export const addUser = (userData, mutationFn) => ({
  type: ActionTypes.ADD_USER,
  userData,
  mutationFn
})

const allActions = (dispatch) => ({
  addCount_action: () => dispatch( addCount() ),
  minusCount_action: () => dispatch( minusCount() ),
  getUser_action: (userData) => dispatch( getUser(userData) ),
  addUser_action: (userData, mutationFn) => dispatch( addUser(userData, mutationFn) ),
})

export default allActions