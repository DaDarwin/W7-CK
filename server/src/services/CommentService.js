import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
import { eventService } from "./EventService.js";

class CommentService{
    async createComment(payload) {
        return (await dbContext.Comment.create(payload)).populate('creator', 'name picture')
    }
    async deleteComment(id, userId) {
        const comment = await dbContext.Comment.findById(id)
        if(!comment){
            throw new BadRequest(`Invalid Id: ${id}`)
        }
        if(comment.creatorId != userId){
            throw new Forbidden('Na')
        }
        await comment.deleteOne()
        return `Comment ${id} has been deleted`
    }
    
    async getEventComments(id) {
        await eventService.getEventByID(id)
        const comments = await dbContext.Comment.find({eventId: id}).populate('creator', 'name picture')
        if(!comments){
            throw new BadRequest(`Event ${id} has no Comments`)
        }
        return comments
    }
}

export const commentService = new CommentService()