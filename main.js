//// DEPENDENCIES ////

// NodeJS Modules
const fs = require('fs')
const http = require('http')
const https = require('https')

// 3rd Party Modules
const express = require('express')

//// EXPRESS INIT ////

const app = express()
app.set('view engine', 'pug')


//// ROUTING ////

// Express
const express_router = require('./src/router/express.js')
express_router.route(app)

//// SERVER INIT ////

// HTTP -> HTTPS Redirect Server
const redirect_server = require('./src/http/redirect').server
redirect_server.init()

// Main HTTPS Server
const server = require('./src/https/secure').server
server.init(app)
