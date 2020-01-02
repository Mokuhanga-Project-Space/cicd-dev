const { writeFile, readFiles } = require('../storage/disk')
const { confirmAplication } = require('../email/controller')

const directory = '../storage/applications/'

// Controllers
async function apply(req, res) {
    try {
        const data = req.body
        const name = data.name
        const timestamp = Date.now()
        console.log("trying to submit application for " + name)
        await writeFile(directory, name + "_" + timestamp +".json", JSON.stringify(data))
        console.log("submitted application for " + name)
        res.render('application_complete', data)
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
        res.render('application_view', {apps: data})
    }
    catch (error) {
        console.log(error)
    }
}

// Utility
async function getApplications() {
    try {
        console.log("getting applications from " + directory)
        const data_raw = await readFiles(directory)
        let data = []
        for (buffer of data_raw) {
            data.push( JSON.parse( buffer.toString() ))
        }
        return data
    }
    catch (error) {
        console.log(error)
    }
}


exports.apply = apply
exports.htmlView = htmlView