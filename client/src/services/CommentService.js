import { AppState } from "../AppState"
import { Comment } from "../models/Comment"
import { api } from "./AxiosService"

class CommentService{

    async createComment(data){
        const res = await api.post('api/comments', data)
        AppState.comments.push(new Comment(res.data))
    }

    async deleteComment(id){
        await api.delete(`api/comments/${id}`)
        const index = AppState.comments.findIndex(remark => remark.id == id)
        AppState.comments.splice(index, 1)
    }
    
}

export const commentService = new CommentService()