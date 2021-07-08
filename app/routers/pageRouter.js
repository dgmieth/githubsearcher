//node modules

//npm modules
const express = require('express')
//router creation
const pageRouter = express.Router()
//controllers
const pageCtrl = require('../controllers/pageCtrl')
//page routes
pageRouter.get('', pageCtrl.rootPage)
// exporting router
module.exports = pageRouter