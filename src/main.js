// ESM syntax is supported.
import express from 'express'
import uuidv4 from 'uuid'
import UserEventDriver from './usereventdriver/UserEventDriver'
import MathService from './math/MathService'

const app = express()
app.use(express.static('public'))

app.get('/register', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    })
    const userId = uuidv4()
    UserEventDriver.addUser(userId, res)
    UserEventDriver.fireEvent(userId, uuidv4(), { userId })
})

app.get('/test', (req, res) => {
    const eventId = uuidv4()
    UserEventDriver.fireEvent(req.query.userId, eventId, {test:'hello'})
    res.write(eventId)
    res.end()
})

app.get('/math/add', (req, res) => {
    const eventId = uuidv4()
    setTimeout(() => {
        MathService.add(
            {
                eventId,
                userId: req.query.userId
            }, 
            +req.query.number1, 
            +req.query.number2
        )
    })
    res.write(eventId)
    res.end()
})

app.listen(3000, () => console.log('SSE app listening on port 3000!'))

export {}