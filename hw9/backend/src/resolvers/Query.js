const  Query  = {
  async chats(parent,  args, { Message }, info) {
      if (!args.query) {
          return Message.find()
              .limit(100)
              .sort({ _id: 1 })
      }
      else {
          return Message.find({$or:[{name:args.query},{receiver:args.query}]})
              .limit(100)
              .sort({_id: 1})
      }
  }
}
export { Query as default }