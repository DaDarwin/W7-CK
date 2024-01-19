


export class Comment{

    constructor(data){
        this.creatorId = data.creatorId
        this.creator = data.creator
        this.eventId = data.eventId

        this.body = data.body
        this.isAttending = null
    }
}