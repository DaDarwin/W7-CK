import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventService } from "../services/EventService.js"
import { ticketService } from "../services/TicketService.js";
import { commentService } from "../services/CommentService.js";

export class EventController extends BaseController{
    constructor(){
        super('api/events')
        this.router

        .get('', this.getAllEvents)
        .get('/:id', this.getEventById)
        .get('/:id/tickets', this.getTickets)
        .get('/:id/comments', this.getEventComments)

        .use(Auth0Provider.getAuthorizedUserInfo)
        
        .post('', this.createEvent)
        .put('/:id', this.editEvent)
        .delete('/:id', this.cancelEvent)
        
    }
    async getAllEvents(request, response, next) {
        try{
            const events = await eventService.getAllEvents()
            response.send(events)
        }
        catch(error){
            next(error)
        }
    }
    async getEventById(request, response, next) {
        try {
            const event = await eventService.getEventByID(request.params.id)
            response.send(event)
        } 
        catch (error) {
            next(error)
        }
    }
    async createEvent(request, response, next) {
        try {
            let payload = request.body
            payload.creatorId = request.userInfo.id
            let event = await eventService.createEvent(payload)
            response.send(event)
        } 
        catch (error) {
            next(error)
        }
    }
    
    async editEvent(request, response, next) {
        try {
            let payload = request.body
            const id = request.params.id
            const userId = request.userInfo.id
            const event = await eventService.editEvent(payload, id, userId)
            response.send(event)
        } 
        catch (error) {
            next(error)
        }
    }
    
    async cancelEvent(request, response, next){
        try {
            const id = request.params.id
            const userId = request.userInfo.id
            const event = await eventService.cancelEvent(id, userId)
            response.send(event)
        } 
        catch (error) {
            next(error)
        }
    }
    
    async getTickets(req, res, next){
        try {
            const id = req.params.id
            const tickets = await ticketService.getEventTickets(id)
            res.send(tickets)
        } 
        catch (error) {
            next(error)
        }
    }
    async getEventComments(req, res, next) {
        try {
            const id = req.params.id
            const comments = await commentService.getEventComments(id)
            res.send(comments)
        } 
        catch (error) {
            next(error)
        }
    }
}


