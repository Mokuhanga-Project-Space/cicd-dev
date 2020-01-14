//// DEPENDENCIES ////

// NodeJS Modules
const fs = require('fs')
const https = require('https')

//// DEFINITION ////

class Secure_Server {
    constructor (config) {
        const privateKey = fs.readFileSync(config.key).toString()
        const certificate = fs.readFileSync(config.cert).toString()
        this.credentials = {
            key: privateKey, 
            cert: certificate
        }
    }

    init(router, port=443) {
        this.server = https.createServer(this.credentials, router)
        this.server.listen(port)
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

exports.secure_server = Secure_Server