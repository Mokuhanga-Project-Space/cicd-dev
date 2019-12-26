const {readFile} = require('../storage/disk')
const {verifyToken} = require('../security/token') 

const directory = '../storage/users/'

async function verifyLogin(req) {
    user = req.body.user
    password = req.body.password
    try {
        const user_data = JSON.parse( await readFile(directory, user+".json") )
        if (user_data.user == user && user_data.password == password) {
            return true
        }
        return false
    }
    catch (error) {
        console.log(error)
        return false
    }       
}

function secureAccess(req, res) {
	let accessToken = req.cookies["mokuhanga-access"]

	if (!accessToken) {
		res.render("token_needed", {url: req.url})
		return false
	}
	
	accessToken = JSON.parse(accessToken)
	hasAccess = verifyToken(accessToken)
	
	if (!hasAccess) {
		res.render('token_needed')
		return false
	}

	return true
}

exports.verifyLogin = verifyLogin
exports.secureAccess = secureAccess