const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
  username: {
    type: String,
    required: true,
    unique: true
  },
  boulderFlashGrade: String,
  sportFlashGrade: String,
  passwordHash: String,
  climbedRoutes : [
    {
      grade : String,
      boulder : Number,
      sport: Number
    }
  ],
  activities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity'
    },
  ],
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Todo'
    },
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)

const User = mongoose.model('User', userSchema)

module.exports = User