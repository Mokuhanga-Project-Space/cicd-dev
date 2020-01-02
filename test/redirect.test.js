const {redirect_server} = require('../src/http/redirect')
const axios = require('axios')

test( 'redirects http', async () => {
    const server = new redirect_server()
    server.init(8080)
    const response  = await axios({
            maxRedirects: 0,
            validateStatus: (status) => {
                return status < 500
            },
            url: 'http://127.0.0.1:8080/'
        })
    await server.close()
    expect(response.status).toBe(301)
})