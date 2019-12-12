//// DEPENDENCIES ////

// NodeJS Modules
const fs = require('fs')
const http = require('http')
const https = require('https')

// 3rd Party Modules
const express = require('express')

// App Routing
const app = express()
app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index', {'name': 'Matt'})
})

//// SERVER INIT ////

// HTTP -> HTTPS Redirect Server
const redirect_server = require('./src/http/redirect').server
redirect_server.init()

// Main HTTPS Server
const server = require('./src/https/secure').server
server.init(app)
