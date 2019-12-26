//// DEPENDENCIES ////

// 3rd Party Modules
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// Markdown rendering
// CLI: npm install jstransformer-markdown-it
// REQUIRE: const md = require('jstransformer')(require('jstransformer-markdown-it'))
// RENDER OPTIONS: {str: md.render("_italic_ **bold**", {inline: true}).body}
// PUG USE: != str

// Controllers
const { getApplications } = require('../application/controller')
const { getAccessToken } = require('../security/token')
const { verifyLogin, secureAccess } = require('../security/controller')



//// DEFINITION ////
function route(app) {
	
	//// PUBLIC
	app.use(express.static('public'))

	//// Middleware
	app.use(cookieParser())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	//// FEATURES

	// Splash 
	app.get('/', (req, res) => {
		res.render('index')
	})

	// Login
	app.get('/login', (req, res) => {
		res.render('login')
	})

	app.post('/login', async (req, res) => {
		const authenticated = await verifyLogin(req)
		if (authenticated) {
			const accessToken = getAccessToken()
			res.cookie(`mokuhanga-access`, JSON.stringify(accessToken), {
				httpOnly: true
			})
			if (req.query.fwd) {
				res.redirect(req.query.fwd)
			}
			else {
				res.render('login_complete')
			}
		}
		else {
			res.render('login_failed')
		}
	})

	// Registration
	app.get('/application_2020', (req, res) => {
		res.render('application')
	})

	app.post('/application_2020', async (req, res) => {
	    try {
			const data = await register(req)
			res.render('application_complete', data)
		}
		catch (error) {
			console.log(error)
		}
	})

	app.get('/application_2020/view', async (req, res) => {
		try {
			if (secureAccess(req, res)) {
				const data = await getApplications()
				console.log(data)
				res.render('application_view', {apps: data})
			}
			else {
				res.status(404)
				res.send()
			}
		}
		catch (error) {
			console.log(error)
		}
	})

}



exports.route = route