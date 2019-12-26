const hash = require("../security/hash")

function getBaseToken () {
    return {
        data: {
            role: "admin",
            expiration: Date.now() + (60 * 60 * 1000)
        },
        signature: "unsigned"
    }
}

function hashToken(token) {
    return hash.saltHashData(JSON.stringify(token.data))
}

function signToken (token) {
    token.signature = hashToken(token)
    return token
}

function getAccessToken() {
    const token = getBaseToken()
    return signToken(token)
}

function verifyToken(token) {
    return  Date.now() <= token.data.expiration && 
            hashToken(token) == token.signature

}

exports.getAccessToken = getAccessToken
exports.verifyToken = verifyToken
