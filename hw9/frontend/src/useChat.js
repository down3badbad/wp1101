import { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import {
  MSGS_QUERY,
  CREATE_MSG_MUTATION,
  CLEAR_MSG_MUTATION,
  MSGS_SUBSCRIPTION
} from './graphql'

const useChat = (username) => {
  const [messages, setMessages] = useState([])
  const [status, setStatus] = useState({})
  const [opened, setOpened] = useState(false)

  const { loading, error, data, subscribeToMore } = useQuery(MSGS_QUERY,{variables:{name:username}})
  const [addMessage] = useMutation(CREATE_MSG_MUTATION)
  const [deleteMessages] = useMutation(CLEAR_MSG_MUTATION)

  useEffect(() => {
    subscribeToMore({
      document: MSGS_SUBSCRIPTION,
      variables: { name: username },
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev
        const {mutation,deletename,data:newchats} = subscriptionData.data.chat
        switch (mutation) {
          case 'output': {
            return {
              ...prev,
              chats: [...prev.chats,...newchats]
            };
          }
          case 'clear': {
            return {
              ...prev,
              chats: prev.chats.filter((e)=>e.name!==deletename)
            }
          }
          default : {
            break;
          }
        }
        return prev;
      }
    })
  }, [subscribeToMore,username])

  useEffect(() => {
    setOpened((loading || error)?false:true)
  }, [loading, error])
  
  
  useEffect(()=>{
    if (data) {
      setMessages(data.chats)
    }
    else {
      setMessages([])
    }
  },[data])
  
  
  const sendMessage = async (senddata) => {
    if (!opened){
      setStatus({
        type: 'danger',
        msg: 'Server is not connected'
      })
      return
    }
    if (senddata.receiver === username) {
      setStatus({
        type: 'danger',
        msg:  'You cannot send to yourself!!'
      })
      return
    }
    const {data:{createChat}} = await addMessage({
      variables: senddata
    })
    setStatus(createChat);
  }

  const clearMessages = async (name) => {
    if (!opened){
      setStatus({
        type: 'danger',
        msg: 'Server is not connected'
      })
    }
    const {data:{clearChat}} = await deleteMessages({
      variables: {name:username}
    })
    console.log(clearChat.type)
    console.log(clearChat.msg)
    setStatus(clearChat);
  }

  return {
    status,
    opened,
    messages,
    sendMessage,
    clearMessages
  }
}

export default useChat

