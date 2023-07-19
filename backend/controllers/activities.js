const activitiesRouter = require('express').Router()
const logger = require('../utils/logger')
const Activity = require('../models/activity')
const User = require('../models/user')

activitiesRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    console.log('body4 ', body)

    const user = await User.findById(body.user)

    console.log('user111 ', user)
    
    const activity = new Activity({ ...body })
    console.log('activity ', activity)
      
    const savedActivity = await activity.save()
  
    console.log('savedActivity ', savedActivity)

    user.activities = user.activities.concat(savedActivity._id)
    await user.save()
     
    res.status(201).json(savedActivity)
      
  } catch (error) {
    logger.error('Something went wrong', error)
    return res.status(400).json({
      error: error
    })
  }
})

module.exports = activitiesRouter