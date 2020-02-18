const crypto = require('crypto')


function genRandomString (length) {
    return crypto.randomBytes(Math.ceil(length/2))
    .toString('hex')
    .slice(0,length)
}

const salt = genRandomString(16)

function sha512 (data, salt) {
    var hash = crypto.createHmac('sha512', salt)
    hash.update(data)
    var value = hash.digest('hex')
    return value
}

function saltHashData (data) {
    var data = sha512(data, salt)
    return data
}

exports.saltHashData = saltHashData