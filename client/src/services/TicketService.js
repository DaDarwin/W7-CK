import { AppState } from "../AppState"
import { Ticket } from "../models/Ticket"
import { api } from "./AxiosService"

class TicketService{

    async createTicket(id){
        if(activeEvent.ticketCount < activeEvent.capacity){
            const res = await api.post('api/tickets', {eventId: id})
            const ticket = new Ticket(res.data)
            AppState.tickets.push(ticket)
            AppState.activeEvent.ticketCount ++}
        else throw new Error('Event Is Full')
    }

}

export const ticketService = new TicketService()