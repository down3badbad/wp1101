import { useState } from "react";

const client = new WebSocket('ws://localhost:4000')
const sendData = async (data) => {
    console.log(data)
    await client.send(JSON.stringify(data));
};

const useChat = () => {
    const [messages, setMessages] = useState([])
    const [status, setStatus] = useState({})
    const sendMessage = (msg) => {sendData(["input",msg]);};
    const clearMessage = () => {
        sendData(["clear"]);
    }
    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);   
        switch(task) {
            case "output":
            {
                setMessages(() => [...messages, ...payload]);
                break;
            }
            case "status":
            {
                setStatus(payload);
                break;
            }
            case "init":
            {
                setMessages(() => payload);
                break;
            }
            case "cleared":
            {
                setMessages([]);
                break;
            }
            default: break;
        }
    }
    return {
        status,
        messages,
        sendMessage,
        clearMessage
    }
};

export default useChat;