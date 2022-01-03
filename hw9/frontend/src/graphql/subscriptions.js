import { gql } from '@apollo/client'

export const MSGS_SUBSCRIPTION = gql`
  subscription chat(
    $name: String!
    ){
    chat(
      name: $name
    ) {
      mutation
      deletename
      data {
        name
        receiver
        body
      }
    }
  }
`