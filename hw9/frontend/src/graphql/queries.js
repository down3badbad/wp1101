import { gql } from '@apollo/client'

export const MSGS_QUERY = gql`
  query chats($name: String){
    chats(
        query: $name
    ) {
      name
      receiver
      body
    }
  }
`