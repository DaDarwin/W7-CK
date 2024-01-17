import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService'
import BaseController from '../utils/BaseController'
import { ticketService } from '../services/TicketService.js'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
    .use(Auth0Provider.getAuthorizedUserInfo)
      .get('/tickets', this.getTickets)
      .get('', this.getUserAccount)
  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getTickets(req, res, next){
    try{
      res.send(await ticketService.getAccountTickets(req.userInfo))
    }
    catch(error){
      next(error)
    }
  }
}
