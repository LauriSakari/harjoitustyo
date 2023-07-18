const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  notes: String,
  routesClimbed : [{
    grade: String,
    style: String,
    routesClimbed: Number
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

activitySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Activity = mongoose.model('Activity', activitySchema)

module.exports = Activity