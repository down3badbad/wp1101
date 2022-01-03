import mongoose from 'mongoose';
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name field is required.']
    },
    receiver: {
		type: String,
		required: [true, 'Receiver is required.']
	},
    body:{
        type: String,
        required: [true, 'Name field is required.']
    }
});

const Message = mongoose.model('message', MessageSchema);
export default Message;