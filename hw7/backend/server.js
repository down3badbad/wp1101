import express from 'express';  
import cors from 'cors' 
import router from './routes/index' 
import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.connection.on('connected', () => {
  console.log("mongoose db is connected.")
})

const app = express();

// init middleware 
app.use(cors()) 

// define routes 
app.use('', router) 

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);

  
