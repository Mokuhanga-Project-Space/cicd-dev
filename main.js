//// DEPENDENCIES ////

// NodeJS Modules

// 3rd Party Modules
const express = require('express')

// Config
const config = require('../config.json')

//// EXPRESS INIT ////

const app = express()
app.set('view engine', 'pug')

//// ROUTING ////

// Express
const express_router = require('./src/router/express.js')
express_router.route(app, config)

//// SERVER INIT ////

// HTTP -> HTTPS Redirect Server
const { redirect_server } = require('./src/http/redirect')
const redirect = new redirect_server()
redirect.init()

// Main HTTPS Server
const { secure_server } = require('./src/https/secure')
const secure = new secure_server(config)
secure.init(app)

// Email Transporter
const email = require('./src/email/controller')
console.log(config)
email.init(config)
