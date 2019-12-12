//// DEPENDENCIES ////

// NodeJS Modules
const http = require('http')

//// DEFINITION ////
class Redirect_Server {
    constructor() {
        this.server = http.createServer(this.redirect)
    }

    redirect(request, response) {
        const response_code = 301
        const location = `https://${request.headers.host}${request.url}`
        const headers = {
            'location': location
        }
        response.writeHeader(response_code, headers)
        response.end()
    }

    init(){
        const port = 80
        this.server.listen(port)
    }
}

//// EXPORT ////

//singleton export
const server = new Redirect_Server()
exports.server = server