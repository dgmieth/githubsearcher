//nodejs native modules
const http = require('http')
//env environment configuration
require('custom-env').env('deployment')
//import express app
const app = require('./app')
//ports
const httpPort = 3000
//server creation
http.createServer(app).listen(httpPort)