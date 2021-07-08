//node modules

//npm modules
const express = require('express')
//router creation
const servicesRouter = express.Router()
//controllers
const servicesCtrl = require('../controllers/servicesCtrl')
//page routes
servicesRouter.get('/searchGroups', servicesCtrl.searchGroups)
servicesRouter.post('/searchAndSave', servicesCtrl.searchAndSave)
servicesRouter.get(`/resultsForGroupId`, servicesCtrl.resultsForGroupId)
// exporting router
module.exports = servicesRouter