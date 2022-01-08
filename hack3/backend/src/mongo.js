import mongoose from "mongoose";
import { dataInit } from "./upload.js";
import "dotenv-defaults/config.js";

const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

async function connect() {
  // TODO 1.1 Connect your MongoDB
  mongoose.connect(
    process.env.MONGO_URL, 
    dboptions
  )
  mongoose.connection.on('connected', () => {
    console.log("mongoose is connected.")
  })
  dataInit();
} 

export default { connect };