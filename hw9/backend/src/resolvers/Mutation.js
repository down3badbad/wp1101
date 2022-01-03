const Mutation = {
  async createChat(parent, args, {Message, pubsub}, info) {
      const NewChat = {
          ...args.data
      }
      // console.log(args.data)
      const newMsg = new Message(NewChat);
      await  newMsg.save((err,doc)=>{
          if (err) return console.error(err);
          pubsub.publish(`chat ${args.data.receiver}`, {
              chat: {
                  mutation: 'output',
                  data: [NewChat]
              }
          })
          pubsub.publish(`chat ${args.data.name}`, {
              chat: {
                  mutation: 'output',
                  data: [NewChat]
              }
          })
          } );
      const status = {
          type: 'success',
          msg: 'you sent a message successfully'
      }
      return status;
  },
  async clearChat(parent, args, {Message, pubsub}, info) {
      await Message.deleteMany({name:args.name}, () => {
          pubsub.publish(`chat ${args.name}`, {
              chat: {
                  mutation:  'clear',
                  deletename: args.name
              }
          })
      }).catch((e)=>{console.log("delete")})
      const status =  {
          type: 'info', 
          msg: 'Message cache clear!!'
      };
      return status;
  }
}

export  {Mutation as default}