const activitiesRouter = require('express').Router()
const logger = require('../utils/logger')
const Activity = require('../models/activity')

activitiesRouter.post('/', async (req, res) => {
  try {
    const body = req.body
    console.log('body ', body)
    
    const activity = new Activity({ ...body })
    console.log('activity ', activity)
      
    const savedActivity = await activity.save()
  
    console.log('savedActivity ', savedActivity)
     
    res.status(201).json(savedActivity)
      
  } catch (error) {
    logger.error('Something went wrong', error)
    return res.status(400).json({
      error: error
    })
  }
})

module.exports = activitiesRouter