//// DEPENDENCIES ////

// NodeJS Modules
const fs = require('fs')
const https = require('https')
const ws = require('ws')

//// DEFINITION ////

class Secure_Websocket_Server {
    constructor (config) {
        const privateKey = fs.readFileSync(config.key).toString()
        const certificate = fs.readFileSync(config.cert).toString()
        this.credentials = {
            key: privateKey, 
            cert: certificate
        }
    }

    init(router, port=8080) {
        this.server_https = https.createServer(this.credentials)
        this.server = new ws.Server({ 
            server: this.server_https,
            clientTracking: true
        })
        router.route(this.server)
        this.server_https.listen(port)
    }

    close() {
        return new Promise ( (resolve, reject) => {
            this.server.close( () => {
                resolve()
            })
        }) 
    }
}

//// EXPORT ////

exports.secure_websocket_server = Secure_Websocket_Server