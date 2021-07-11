//// DEPENDENCIES ////

// NodeJS Modules

// 3rd Party Modules
const express = require('express')

// Config
const config = {}
//const config = require('../config.json')

//// EXPRESS INIT ////

const app = express()
//app.set('view engine', 'pug')

//// ROUTING ////

// Express
const express_router = require('./src/router/express.js')
express_router.route(app, config)

const ws_router = require('./src/router/ws.js')

//// SERVER INIT ////

const { server } = require('./src/http/nonsecure')
server.init(app)

// // HTTP -> HTTPS Redirect Server
// const { redirect_server } = require('./src/http/redirect')
// const redirect = new redirect_server()
// redirect.init()

// // Main HTTPS Server
// const { secure_server } = require('./src/https/secure')
// const secure = new secure_server(config)
// secure.init(app)

// // Websocket HTTPS Server
// const { secure_websocket_server } = require('./src/websockets/ws_secure')
// const ws_secure = new secure_websocket_server(config)
// ws_secure.init(ws_router)

// // Email Transporter
// const email = require('./src/email/controller')
// email.init(config)
