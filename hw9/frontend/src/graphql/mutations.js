import { gql } from '@apollo/client'

export const CREATE_MSG_MUTATION = gql`
  mutation myCreate(
    $name: String!
    $receiver: String!
    $body: String!
  ) {
    createChat(
      data: {
        name: $name
        receiver: $receiver
        body: $body
      }
    ) {
      type
      msg
    }
  }
`

export const CLEAR_MSG_MUTATION = gql`
  mutation mydelete($name: String!) {
    clearChat(name: $name) {
      type
      msg
    }
  }
`