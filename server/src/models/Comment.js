import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
  {
    creatorId:{type: Schema.Types.ObjectId, required: true, ref:'Account'},
    eventId:{type: Schema.Types.ObjectId, required: true, ref:'Event'},
    body:{type: String, MaxLength: 500, required: true},
    isAttending:{type: Boolean, required: true, default: false},
   
  },
  { timestamps: true, toJSON: { virtuals: true } }
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})
