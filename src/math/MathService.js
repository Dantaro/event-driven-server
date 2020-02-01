import Publisher from '../pubsub/Publisher'
import UserEventDriver from '../usereventdriver/UserEventDriver'

const operations = {
    ADD : 'add',
    SUBTRACT: 'subtract'
}

Publisher.subscribe(
    operations.ADD, 
    ({userId, eventId, number1, number2}) => {
        UserEventDriver.fireEvent(userId, eventId, (number1 + number2))
    }
)

const MathService = (function() {
    const Service = {}
    Service.add = ({userId, eventId}, number1, number2) => {
        Publisher.publish(operations.ADD, {userId, eventId, number1, number2})
    }

    return Service;
})()

export default MathService