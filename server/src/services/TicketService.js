import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";
import { accountService } from "./AccountService.js";
import { eventService } from "./EventService.js";

class TicketService{
    
    async getEventTickets(id){
        const event = await (await eventService.getEventByID(id)).populate('ticketCount')
        // @ts-ignore
        logger.log(event.ticketCount)
        // @ts-ignore
        if(!event.ticketCount){
            // @ts-ignore
            throw new BadRequest(`Event ${id} has ${event.ticketCount} Tickets`)
        }
        return await dbContext.Ticket.find({eventId: id}).populate('profile', 'name picture')
    }
    async getAccountTickets(user) {
        const account = await accountService.getAccount(user)
        await account.populate('boughtTickets')
        // @ts-ignore
        logger.log(account.boughtTickets)
        // @ts-ignore
        if(!account.boughtTickets){
            // @ts-ignore
            throw new BadRequest(`User ${user.name} has ${account.boughtTickets} Tickets`)
        }
        const tickets = await dbContext.Ticket.find({accountId: user.id}).populate('event profile')
        logger.log(tickets)
        return tickets
    }
    async createTicket(payload) {
        const ticket = await dbContext.Ticket.create(payload)
        await ticket.populate('event')
        await ticket.populate('profile', 'name picture')
        return ticket
    }
    async cancelTicket(id, userId) {
        const ticket = await dbContext.Ticket.findById(id)
        if(!ticket){
            throw new BadRequest(`No ticket with id: ${id}`)
        }
        if(ticket.accountId != userId.id){
            throw new Forbidden('Na')
        }
        await ticket.deleteOne()
        return `Ticket ${ticket.id} has been deleted`
    }

}

export const ticketService = new TicketService()