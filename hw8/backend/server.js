import mongoose from 'mongoose';
import WebSocket from "ws";
import dotenv from "dotenv-defaults";
import cors from 'cors';
import http from 'http';
import express from 'express';
import {sendData, sendStatus, initData} from './wssConnect.js';
import Message from './models/message.js';

dotenv.config();
mongoose.connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.on('connected', () => {
    console.log("mongoose is connected.")
})

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const db = mongoose.connection;

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
      sendData(data, client);
      sendStatus(status, client);
    });
};

app.use(cors())

db.once('open', () => {
    wss.on('connection', (ws) => {
        initData(ws)
        ws.onmessage = async (byteString) => {
            const {data} = byteString
            const [task, payload] = JSON.parse(data)
            console.log(task, payload)
            switch(task) {
                case "input": 
                {
                    const {name, body} = payload;
                    const message = new Message({ name, body })
                    console.log(name);
                    try
                    {
                        await message.save();
                    }
                    catch(e)
                    {
                        throw new Error ("Messages DB save error: " + e)
                    }
                    broadcastMessage(['output', [payload]], {type: 'success',msg: 'Message sent'})
                    break;
                }
                case "clear":
                {
                    Message.deleteMany({}, () => {
                        broadcastMessage(['cleared'], {type: 'info',msg: 'Message cache cleared.'})
                    })
                    break;
                }

                default: break
            }
        }    
    })
    const PORT = process.env.port || 4000
    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`)
    })
})


