const disk = require('../storage/disk')

const directory = '../storage/applications/'

async function apply(req) {
    try {
        const data = req.body
        const name = data.name
        await disk.writeFile(directory, name+".json", JSON.stringify(data))
        return data
    }
    catch (error) {
        console.log(error)
    }
}

async function getApplications() {
    try {
        const data_raw = await disk.readFiles(directory)
        console.log(data_raw)
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
exports.getApplications = getApplications