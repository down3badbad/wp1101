import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

export default () => {
    dotenv.config();
    mongoose.connect(
        process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    mongoose.connection.on('connected', () => {
        console.log("mongoose is connected.")
    })

    const db = mongoose.connection;

    db.once("open", () => {
        console.log("DB connected");
    })
}