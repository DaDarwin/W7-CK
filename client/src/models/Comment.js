


export class Comment{

    constructor(data){
        this.id = data._id
        this.creatorId = data.creatorId
        this.creator = data.creator

        this.eventId = data.eventId
        this.event = data.event

        this.body = data.body
        this.isAttending = data.isAttending
    }
}