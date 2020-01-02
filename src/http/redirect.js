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

    init(port=80){
        this.server.listen(port)
    }

    // close() {
    //     this.server.close()
    // }

    close() {
        return new Promise ( (resolve, reject) => {
            this.server.close( () => {
                resolve()
            })
        }) 
    }
}

//// EXPORT ////

exports.redirect_server = Redirect_Server