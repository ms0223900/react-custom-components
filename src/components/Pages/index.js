import React from 'react'
import { Typography } from '@material-ui/core'
import LoginButton from './LoginButton'
import protectedPage from './ProtectedPage'

const ProtectedPrivatePage = protectedPage(() => {
  return (
    <Typography>
      {':)))'}
    </Typography>
  )
})
export default () => {
  return (
    <>
      <LoginButton />
      <ProtectedPrivatePage />
    </>
  )
}