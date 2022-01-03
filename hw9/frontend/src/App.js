import './App.css'
import React, { useEffect, useRef, useState } from 'react'
import useChat from './useChat'
import { Button, Input, message, Tag } from 'antd'


function App({username}) {
  const { status, opened, messages, sendMessage, clearMessages } = useChat(username)
  const [receiver, setReceiver] = useState('');
  const [body, setBody] = useState('');
  const bodyRef = useRef(null)

  const displayStatus = (s) => {
    if (s.msg) {
      const { type, msg } = s
      const content = {
        content: msg,
        duration: 0.5
      }

      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'info':
          message.info(content)
          break
        case 'danger':
        default:
          message.error(content)
          break
      }
    }
  }

  useEffect(() => {
    displayStatus(status)
  }, [status])

  return (
    
    <div className="App">
      <div className="App-title">
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </div>
      <div className="App-messages">
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}>
            {opened? 'No messages...' : 'Loading...'}
          </p>
        ) : (
          messages.map(({ name, receiver, body }, i) => {
            if (name!==username){ 
              return (
                <p className="App-message" key={i}>
                  <Tag color="blue">{name}</Tag> {body}
                </p>
            )} else {
              return (
                <p className="App-message" key={i}>
                  <Tag color="red">{receiver}</Tag> {body}
                </p>
              )
            }
          })
        )}
      </div>
      <Input
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Tab') {
            bodyRef.current.focus()
          }
        }}
      ></Input>
      <Input.Search
        rows={4}
        value={body}
        ref={bodyRef}
        enterButton="Send"
        onChange={(e) => setBody(e.target.value)}
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if (!msg || !username) {
            displayStatus({
              type: 'error',
              msg: 'Please enter a username and a message body.'
            })
            return
          }
          sendMessage({
            name: username,
            receiver: receiver,
            body: msg
          });
          setBody('')
        }}
      ></Input.Search>
    </div>
  )
}
function Main() {
  const [username, setUsername] = useState('');
  return (
    (username === '')?
    <div className='App'>
    <Input.Search
      rows={1}
      enterButton="Login"
      placeholder="Your name"
      onSearch={(username) => {
        if (!username) {
          return
        }
        setUsername(username)
      }}
    ></Input.Search></div>
      :
    <App username={username}/>
  )
}

export default Main
