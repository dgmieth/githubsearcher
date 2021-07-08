//nodejs native modules
const path = require('path')
//npm modules
const express = require('express')
const cookieParser = require('cookie-parser')
//custom modules
const db = require('../model/bd/mysqlPool')
//routers
const pageRouter = require('./routers/pageRouter')
const servicesRouter = require('./routers/servicesRouter')
//express app creation & configuration
const app = express()
app.set(`view engine`,`ejs`)
app.set('views',path.join(__dirname,`../view/templates`))
app.use(express.static(path.join(__dirname,'../view/public')))
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

app.use('/services', servicesRouter)
app.use(pageRouter)

module.exports = app