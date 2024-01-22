import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
  {
    accountId:{type: Schema.Types.ObjectId, required: true, ref:'Account'},
    eventId:{type: Schema.Types.ObjectId, required: true, ref:'Event'},
   
  },
  { timestamps: true, 
    toJSON: { virtuals: true } }
)

TicketSchema.virtual('profile', {
    localField: 'accountId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})

TicketSchema.virtual('event',{
    localField: 'eventId',
    foreignField: '_id',
    ref: 'Event',
    justOne: true,
}
)