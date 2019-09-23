import gql from 'graphql-tag'

export const ADD_USER = gql`
  mutation ADD_USER($data: UserInput!) {
    createUser(input: {
      data: $data
    }) {
      user {
        username
      }
    }
  }`