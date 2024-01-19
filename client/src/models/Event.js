


export class Event{
    constructor(data){
        this.id = data.id
        this.creatorId = data.creatorId
        this.creator = data.creator

        this.type = data.type
        this.name = data.name
        this.description = data.description
        this.location = data.location
        this.coverImg = data.coverImg
        this.capacity = data.capacity
        this.ticketCount = data.ticketCount
        this.startDate = new Date(data.startDate)

        this.isCanceled = data.isCanceled

    }
}