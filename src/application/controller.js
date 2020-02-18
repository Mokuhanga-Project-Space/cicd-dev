const { writeFile, readFiles } = require('../storage/disk')
const { confirmAplication } = require('../email/controller')

const directory = '../storage/applications/'

// Controllers
async function apply(req, res) {
    try {
        const data = req.body
        const name = data.name
        const timestamp = Date.now()

        data.timestamp = timestamp
        data.decision = "pending"
        data.paid = "nothing"

        console.log("trying to submit application for " + name)
        await writeFile(directory, name + "_" + timestamp + ".json", JSON.stringify(data))
        
        console.log("submitted application for " + name)
        res.render('application/application_complete', data)
        
        const email = data.email
        await confirmAplication(email, name)
    }
    catch (error) {
        console.log(error)
    }
}

async function htmlView(req, res) {
    try {
        const data = await getApplications()
        data.sort( (a, b) => {
            return a.timestamp - b.timestamp
        })
        res.render('application/application_view', {apps: data})
    }
    catch (error) {
        console.log(error)
    }
}

async function update(req, res) {
    try {
        const data = req.body
        await writeFile(directory, data.name + "_" + data.timestamp + ".json", JSON.stringify(data))
        res.send("true")
    }
    catch (error) {
        res.send("false")
        console.log(error)
    }

}

async function updateall(req, res) {
    try {
        data = JSON.parse(req.body)
        data = data.apps
        for (let datum of data) {
            await writeFile(directory, datum.name + "_" + datum.timestamp + ".json", JSON.stringify(datum))
        } 
        res.send("true")
    }
    catch (error) {
        res.send("false")
        console.log(error)
    }
}

// Utility
async function getApplications() {
    try {
        const data_raw = await readFiles(directory)
        let data = []
        for (buffer of data_raw) {
            data.push( JSON.parse( buffer.toString() ))
        }
        data.sort( (a, b) => {
            return a.timestamp - b.timestamp
        })
        return data
    }
    catch (error) {
        console.log(error)
    }
}

exports.apply = apply
exports.htmlView = htmlView
exports.update = update
exports.updateall = updateall
exports.getApplications = getApplications