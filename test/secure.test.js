const { secure_server } = require('../src/https/secure')
const axios = require('axios')
const https = require('https')
const express = require('express') 

const config = {
    key: "test/mocks/test.key",
    cert: "test/mocks/test.crt"
}

test( 'serves https', async () => {
    const app = express()
    app.get('/', (req, res) => {
        res.send()
    })
    const server = new secure_server(config)
    server.init(app, 4433)
    const response = await axios({
        url: 'https://127.0.0.1:4433/',
        httpsAgent: new https.Agent({ rejectUnauthorized: false })
    })
    await server.close()
    expect(response.status).toBe(200)
})