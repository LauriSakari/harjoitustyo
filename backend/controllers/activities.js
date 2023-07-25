const activitiesRouter = require('express').Router()
const logger = require('../utils/logger')
const Activity = require('../models/activity')
const User = require('../models/user')

activitiesRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    const user = await User.findById(body.user)
    
    const activity = new Activity({ ...body })
      
    const savedActivity = await activity.save()

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

activitiesRouter.delete('/:id', async (req, res) => {
  try {
    await Activity.findByIdAndRemove(req.params.id)
    return res.status(204).end()
    
  } catch (error) {
    logger.error('error ', error )
    return res.json(error.message)
  }
})

module.exports = activitiesRouter