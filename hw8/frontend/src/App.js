import './App.css'
import { Button, Input, Tag, message } from 'antd'
import {useState, useEffect, useRef} from 'react';
import useChat from './useChat';
import { UserOutlined } from "@ant-design/icons";

const LOCALSTORAGE_KEY = "save-me";

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

  const { status, messages, sendMessage, clearMessage } = useChat();
  const [username, setUsername] = useState('');
  const [body, setBody] = useState(''); 
  const [signedIn, setSignedIn] = useState(false);
  const [me, setMe] = useState(savedMe || "");

  const bodyRef = useRef(null);

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
  }}}

  useEffect( () => {
    displayStatus(status);
  }, [status])

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);


  if (signedIn) {
    return (
      <div className="App">
        <div className="App-title">
          <h1>{me}'s Chat Room</h1>
          <Button type="primary" danger onClick={clearMessage} >
            Clear
          </Button>
        </div>

        <div className="App-messages">
          {messages.length === 0 ? (
            <p style={{ color: '#ccc' }}> No messages... </p>
          ) : (
            messages.map(({ name, body }, i) => (
              <p className="App-message" key={i}>
                <Tag color="blue">{name}</Tag> {body}
              </p>
            ))
          )}
        </div>

        <Input.Search
          ref={bodyRef}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          enterButton="Send"
          placeholder="Type a message here..."
          onSearch={(msg) => {
            if (!msg || !username) {
              displayStatus({
                type: 'error',
                msg: 'Please enter a username and a message body.'
              })
            }    
            sendMessage({ name: username, body: msg })
            setBody('')
          }}
        ></Input.Search>
      </div>
    )
  } 
  else return (
    <>
      <div className="App-title">
        <h1>My Chat Room</h1>
      </div>  
      <Input.Search
        classname="Input-username"
        prefix={<UserOutlined />}
        value={me} enterButton="Sign In"
        onChange={(e) => setMe(e.target.value)}
        placeholder="Enter your name"
        size="large" style={{ width: 300, margin: 50 }}
        onSearch={ (name) => {
          if (!name) {
              displayStatus({
                  type: "error",
                  msg: "Missing user name",
              });
          }
          else {
            setSignedIn(true);
            setUsername(me)
          }
        } }
      />
    </>
  )
}

export default App;
