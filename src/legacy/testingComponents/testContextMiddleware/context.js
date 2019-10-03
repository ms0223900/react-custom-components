import React, { createContext, useReducer } from 'react'
import reducers from './reducers'
import applyMiddleware from './middleWare'
import allActions from './actions'

const state_init = {
  count: 10,
  users: [],
  data: null,
}

export const ContextStore = createContext({
  state: state_init,
  actions: allActions()
})
const ContextValue = () => {
  const [state, dispatch] = useReducer(reducers, state_init)
  const enhancedDispatch = applyMiddleware(dispatch)
  return ({
    state,
    dispatch: enhancedDispatch,
    actions: allActions(enhancedDispatch)
  })
}

const ContextWrapper = ({ children }) => {
  const value = ContextValue()
  
  return (
    <ContextStore.Provider value={ value }>
      { children }
    </ContextStore.Provider>
  )
}

export default ContextWrapper