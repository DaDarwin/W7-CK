import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js"

class EventService{
    async getAllEvents() {
        return await dbContext.Event.find().populate('ticketCount creator', 'name picture')
    }
    
    async getEventByID(id) {
        const event = await dbContext.Event.findById(id)
        if(!event){
            throw new BadRequest(`Invalid Id: ${id}`)
        }
        logger.log('Found by Id:', event)
        await event.populate('ticketCount creator', 'name picture')
        return event
    }
    
    async createEvent(payload) {
        const event = await dbContext.Event.create(payload)
        await event.populate('ticketCount')
        // logger.log(event)
        return event
    }
    
    async cancelEvent(id, userId) {
        const event = await this.getEventByID(id)
        // logger.log('Before cancel',event)

        if (event.creatorId != userId) {
            throw new Forbidden("Na")
        }
        event.isCanceled = true
        // logger.log('After Cancel', event)
        const eventCanceled = await event.save()
        return eventCanceled
    }
    
    async editEvent(payload, id, userId) {
        const event = await this.getEventByID(id)

        if(event.isCanceled){
            throw new BadRequest('Event is Canceled')
        }

        if (event.creatorId != userId) {
            throw new Forbidden("Na")
        }

        logger.log('Payload:', payload)

        for(const key in payload){
            if(key != 'isCanceled' && key != '_id'){
                // logger.log('Key:', key,'Value:', payload[key])
                event[key] = payload[key]
            }
        }

        logger.log('new event:', event)

        const eventNew = await event.save()
        return eventNew
    }
}

// @ts-ignore
export const eventService = new EventService()