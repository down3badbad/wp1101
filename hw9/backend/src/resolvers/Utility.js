const checkUser = (db, name, errFunc) => {
    if (!name) throw new Error("Missing user name for" + errFunc);
    console.log(db, name);
    return db.UserModel.find({name:name});
}

const newUser = (db, name) => {
    return new db.UserModel({name}).save();
}

const makeName = (name1, name2) => {
    return [name1,name2].sort().join("_");
}

const newChatBox = (db, chatBoxName) => {
    return new db.ChatboxModel({name: chatBoxName}).save();
}

const checkChatBox = (db, chatBoxName, errFunc) => {
    if(!chatBoxName) throw new Error ("Missing chatbox name for " + errFunc)
    return db.ChatboxModel.find({name: chatBoxName});
}

const newMessage = (db, sender, body) => {
    return new db.MessageModel({sender, body}).save();
}

const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = makeName(from, to);
    return{
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc),
    };
};

export {checkUser, newUser, makeName, newChatBox, checkChatBox, newMessage, checkMessage}
