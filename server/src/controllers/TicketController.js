import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketService } from "../services/TicketService.js"
import { logger } from "../utils/Logger.js";
import { request, response } from "express";
import { Schema } from "mongoose";

export class TicketController extends BaseController{
    constructor(){
        super('api/tickets')
        this.router

        .use(Auth0Provider.getAuthorizedUserInfo)
        
        .post('', this.createTicket)
        .delete('/:id', this.cancelTicket)
        
    }
    async createTicket(request, response, next) {
        try {
            const payload = request.body
            payload.accountId = request.userInfo.id
            response.send(await ticketService.createTicket(payload))
        } 
        catch (error) {
            next(error)
        }
    }
    async cancelTicket(request, response, next) {
        try {
            const id = request.params.id
            const user = request.userInfo
            response.send(await ticketService.cancelTicket(id, user))
        } 
        catch (error) {
            next(error)
        }
    }

}