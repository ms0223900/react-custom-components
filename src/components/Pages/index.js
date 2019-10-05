/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Typography, Box } from '@material-ui/core'
import protectedPage from './ProtectedPage'
import { ContextWrapper, ContextStore } from '../GameFrame/context'
import KeyValueObjComponent from '../common-components/KeyValueObjects'

const ProtectedPrivatePage = protectedPage(props => {
  const { userInfo } = useContext(ContextStore)
  return (
    <Box>
      {'you are logged in! :)'}
      <hr />
      <KeyValueObjComponent obj={userInfo} />
    </Box>
  )
})
export default () => {
  return (
    <>
      <ContextWrapper>
        <ProtectedPrivatePage />
      </ContextWrapper>
    </>
  )
}