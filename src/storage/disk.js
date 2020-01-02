const fs = require('fs').promises

async function writeFile(folder, filename, data) {
    const path = folder + filename
    try {
        console.log("writing file " + path)
        await fs.mkdir(folder, {recursive: true})
        await fs.writeFile(path, data)
        return true
    }
    catch (error) {
        console.log(error)
    }
}

async function readFile(folder, filename) {
    const path = folder + filename
    try {
        console.log("reading file " + path)
        const data = await fs.readFile(path)
        return data
    }
    catch (error) {
        console.log(error)
    }
}

async function readFiles(folder) {
    try {
        console.log("reading files in directory " + folder)
        const filenames = await fs.readdir(folder)
        let data = []
        for (filename of filenames) {
            if (filename[0] != ".") {
                data.push((await readFile(folder, filename)))
            }
        }
        return Promise.all(data)
    }
    catch (error) {
        console.log(error)
    }
}

exports.writeFile = writeFile
exports.readFile = readFile
exports.readFiles = readFiles