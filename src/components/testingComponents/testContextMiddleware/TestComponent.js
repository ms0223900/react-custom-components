import React, { useContext, useState, useCallback, useEffect } from 'react'
import { Button, Box, Typography, TextField } from '@material-ui/core'
import { ContextStore } from './context'
import { useMutation, useLazyQuery, useQuery } from '@apollo/react-hooks'
import { ADD_USER } from './api'
import { QUERY_USERS, QUERY_USER } from '../../GameFrame/API'

const useMutationDB = (useDB=true) => {
  const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [
      {
        query: QUERY_USERS,
      }
    ]
  })
  return useDB ? {
    addUser,
  } : {}
}


const TestComponent = () => {
  const [useDB, setUseDB] = useState(false)
  const { addUser } = useMutationDB(useDB)
  const { data } = useQuery(QUERY_USERS)
  const [userValue, setValue] = useState('')
  const { actions, state } = useContext(ContextStore)
  const handleAction = () => {
    actions.addCount_action()
  }
  const handleChange = e => {
    setValue(e.target.value)
  }
  const handleAddUser = useCallback(() => {
    actions.addUser_action(userValue, addUser)
    setValue('')
  }, [userValue])

  useEffect(() => {
    data && actions.getUser_action(data.users)
  }, [data])
  // console.log(state)
  const { count, users } = state
  return (
    <>
      <Button onClick={ handleAction }>
        { 'add: ' + count }
      </Button>
      <Button onClick={ actions.minusCount_action }>
        { 'minus: ' + count }
      </Button>
      { users.length == 0 && 'click to fetch users' }
      {users.slice(0, count).map(user => {
        return (
          <Box key={ user.id }>{ user.username }</Box>
        )
      })}
      <hr />
    <Button onClick={ () => setUseDB(!useDB) }>
      { useDB ? 'online' : 'offline test' }
    </Button>
      <Typography>{ 'Add a user!' }</Typography>
      <TextField value={ userValue } onChange={ handleChange } />
      <Button onClick={ handleAddUser }>{ 'add user' }</Button>
    </>
  )
}

export default TestComponent