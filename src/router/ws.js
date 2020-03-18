const { update } = require('../application/controller')

function route(server) {
    server.on('connection', (ws) => {
        ws.on('message', async (message) => {
            message = JSON.parse(message)
            switch (message.label) {
                case 'update_application':
                    try {
                        await update(message.data)
                        let return_message = {
                            label: "application_update",
                            idx: message.idx,
                            data: message.data
                        }
                        for (const client of server.clients.values() ) {
                            client.send(JSON.stringify(return_message))
                        }
                    }
                    catch (error) {
                        console.log(error)
                        let return_message = {
                            label: "update_failed",
                            idx: message.idx,
                            data: message.data
                        }
                        ws.send(JSON.stringify(return_message))
                    }
                    break

                case 'log':
                    console.log("LOGGING:")
                    console.log(message.data)
                    break
            }
        })
    })
}

exports.route = route