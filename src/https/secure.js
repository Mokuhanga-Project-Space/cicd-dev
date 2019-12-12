//// DEPENDENCIES ////

// NodeJS Modules
const fs = require('fs')
const https = require('https')

//// DEFINITION ////

class Secure_Server {
    constructor () {
        const config = require('../../private/config.json')
        const privateKey = fs.readFileSync(config.key).toString()
        const certificate = fs.readFileSync(config.cert).toString()
        this.credentials = {
            key: privateKey, 
            cert: certificate
        }
    }

    init(router) {
        const port = 443
        this.server = https.createServer(this.credentials, router)
        this.server.listen(port)
    }
}

//// EXPORT ////

//singleton export
const server = new Secure_Server()
exports.server = server