const UserEventDriver = (function(obj) {
    const users = {}
    obj.addUser = (userId, res) => {
        users[userId] = (eventId, data) => {
            res.write(`id: ${eventId}\n`)
            res.write(`data: ${JSON.stringify(data)}\n\n`) 
        }
        return () => { 
            res.end()
            delete users[userId] 
        }
    }

    obj.fireEvent = (userId, eventId, data) => {
        if (users[userId]) {
            console.log('Starting timeout for user event driver')
            setTimeout(() => users[userId](eventId, data), 100)
        }
    }

    return obj
})({})

export default UserEventDriver