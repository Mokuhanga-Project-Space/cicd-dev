//// DEPENDENCIES ////

// NodeJS Modules
const http = require('http')

//// DEFINITION ////

class Secure_Server {
    constructor () {
    }

    init(router) {
        const port = 80
        this.server = http.createServer(router)
        this.server.listen(port)
    }
}

//// EXPORT ////

//singleton export
const server = new Secure_Server()
exports.server = server