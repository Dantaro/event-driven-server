const Publisher = (function(obj) {
    const subscriptions = {}
    
    obj.subscribe = (event, callback) => {
        if (!subscriptions[event]) {
            subscriptions[event] = {}
        }
        const symbol = Symbol()
        subscriptions[event][symbol] = callback
        return () => delete subscriptions[event][symbol]
    }
    
    obj.publish = (event, payload) => {
        const holder = subscriptions[event]
        if (holder) {
            Object.getOwnPropertySymbols(holder)
                .forEach(key => setTimeout(() => holder[key](payload)))
        }
    }
    
    return obj
})({})

export default Publisher