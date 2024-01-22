import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { Event } from "../models/Event"
import { Ticket } from "../models/Ticket"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

class EventService{

    async getEvents(){
        const res = await api.get('api/events')
        // logger.log(res)
        AppState.events = res.data.map(pojo => new Event(pojo))
        logger.log(AppState.events)
    }

    async createEvent(data){
        logger.log(data)
        const res = await api.post('api/events', data)
        return new Event(res.data)
    }

    async getEventById(id){
        AppState.activeEvent = {}
        AppState.tickets = []
        AppState.comments = []
        const res = await api.get(`api/events/${id}`)
        const activeEvent = new Event(res.data)
        AppState.activeEvent = activeEvent
        logger.log('Event:', activeEvent)
        return activeEvent
    }

    async getTickets(id){
        const res = await api.get(`api/events/${id}/tickets`)
        const tickets = res.data.map(pojo=> new Ticket(pojo))
        AppState.tickets = tickets
        logger.log('Tickets:', tickets)
        return tickets
    }

    async getComments(id){
        const res = await api.get(`api/events/${id}/comments`)
        const comments = res.data.map(pojo=> new Comment(pojo))
        logger.log('Comments:', comments)
        AppState.comments = comments
    }
    async cancelEvent(id){
        const res = await api.delete(`api/events/${id}`)
        logger.log(res)
        AppState.activeEvent = new Event(res.data)

    }

    async getAccountTickets(){
        const res = await api.get('account/tickets')
        logger.log(res)
        const events = res.data.map(pojo => {
            let thing = pojo.event
            thing.creator = pojo.profile
            return new Event(thing)
        })
        logger.log(events)
        AppState.accountEvents = events
    }
}

export const eventService = new EventService()