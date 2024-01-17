import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const EventSchema = new Schema(
    {
        creatorId:{type: Schema.Types.ObjectId, required: true, ref:'Account'},
        
        name: {type: String, required: true, maxLength: 30},
        description: {type: String, required: true, maxLength: 1000},
        location: {type: String, required: true, maxLength: 50},
        coverImg: {type: String, required: true, maxLength: 1000, default:'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExajB0b3hiNTI4bms0aGJmOTlzOWtwZWVvb2s5eWtkOGppdnR4MDAxdCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/x5sPOvwW6iy5V0JS6C/giphy.gif'},
        capacity: {type: Number, required: true, min: 1, max:1000000},

        type: {type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true, default:'convention'},
        startDate: {type: Date, required: true},
        
        isCanceled: {type: Boolean, default: false},
    },
    { 
        timestamps: true,
        toJSON: { virtuals: true } 
    }
    )
    
EventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

    EventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})

