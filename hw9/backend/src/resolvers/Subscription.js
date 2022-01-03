const Subscription = {
    chat: {
      subscribe(parent, {name}, { pubsub }, info) {
        return pubsub.asyncIterator(`chat ${name}`)
      }
    }
}
  
export { Subscription as default }