import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentService } from "../services/CommentService.js";
import BaseController from "../utils/BaseController.js";

export class CommentController extends BaseController{
    constructor(){
        super('api/comments')
        this.router

        .use(Auth0Provider.getAuthorizedUserInfo)

        .post('', this.createComment)
        .delete('/:id', this.deleteComment)
    }
    async createComment(req, res, next) {
        try {
            let payload = req.body
            payload.creatorId = req.userInfo.id
            res.send(await commentService.createComment(payload))
        } 
        catch (error) {
           next(error) 
        }
    }
    async deleteComment(req, res, next) {
        try {
            const id = req.params.id
            const userId = req.userInfo.id
            res.send(await commentService.deleteComment(id, userId))
        } 
        catch (error) {
           next(error) 
        }
    }
}