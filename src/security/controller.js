const {readFile} = require('../storage/disk')
const {verifyToken, getAccessToken} = require('../security/token') 

const directory = '../storage/users/'

// Controllers
async function authZ(req, res) {
    try {
        const authenticated = await authN(req, res)
        const accessToken = getAccessToken(authenticated.user, authenticated.role)
        res.cookie(`mokuhanga-access`, JSON.stringify(accessToken), {
            httpOnly: true,
            secure: true
        })
        if (req.query.fwd) {
            res.redirect(req.query.fwd)
        }
        else {
            res.render('security/login_complete')
        }
    }
    catch (error) {
        console.log(error)
        res.render('security/login_failed')
    }
}

function secureAccess(req, res, next, roles) {
    let accessToken = req.cookies["mokuhanga-access"]

    if (!accessToken) {
        res.render("security/token_needed", {
            url: req.url,
            reason: "no token"
        })
    }
    else {
        accessToken = JSON.parse(accessToken)
        validToken = verifyToken(accessToken)
        
        if (!validToken) {
            res.render('security/token_needed', {
                url: req.url,
                reason: "invalid token"
            })

        }
        
        else if (!roles.includes(accessToken.data.role)) {
            res.render('security/token_needed', {
                url: req.url,
                reason: "invalid role"
            })

        }

        else {
            next()
        }
    }
}

// Utility
async function authN(req, res) {
    user = req.body.user
    password = req.body.password
    try {
        console.log("trying authN for " + user)
        const user_data = JSON.parse( await readFile(directory, user + ".json") )
        if (user_data.user == user && user_data.password == password) {
            return user_data
        }
        res.render('security/login_failed')
    }
    catch (error) {
        console.log(error)
        res.render('security/login_failed')
    }       
}

exports.secureAccess = secureAccess
exports.authZ = authZ