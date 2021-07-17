//// DEPENDENCIES ////

// NodeJS Modules
const http = require('http')

//// DEFINITION ////

class NonSecure_Server {
    constructor () {
    }

    init(router) {
        const port = 8585
        this.server = http.createServer(router)
        this.server.listen(port)
    }
}

//// EXPORT ////

//singleton export
const server = new NonSecure_Server()
exports.server = server