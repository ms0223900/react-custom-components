/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { Typography, Box } from '@material-ui/core'
import protectedPage from './ProtectedPage'
import { ContextWrapper, ContextStore } from '../GameFrame/context'
import KeyValueObjComponent from '../common-components/KeyValueObjects'

const ProtectedPrivatePage = protectedPage(props => {
  const { userInfo } = useContext(ContextStore)
  return (
    <Box style={{ padding: 10, }}>
      {'you are logged in! :)'}
      <hr />
      <Typography variant={'h4'}>
        {'User Page'}
      </Typography>
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