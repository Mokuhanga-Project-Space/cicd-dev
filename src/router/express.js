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
const { apply, htmlView } = require('../application/controller')
const { secureAccess, authZ } = require('../security/controller')
 
//// DEFINITION ////
function route(app, config) {
	
	//// PUBLIC
	app.use(express.static('public', {dotfiles: "allow"}))

	//// MIDDLEWARE
	app.use(cookieParser())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())

	//// FEATURES

	// Splash 
	app.get('/', (req, res) => {
		try {
			res.render('index')
		}
		catch (error) {
			console.log(error)
		}
	})

	// Login
	app.get('/login', (req, res) => {
		try {
			res.render('login', {url: req.query.fwd})
		}
		catch (error) {
			console.log(error)
		}
	})

	app.post('/login', async (req, res) => {
		try {
			await authZ(req, res)
		}
		catch (error) {
			console.log(error)
		}
	})

	// Application
	app.get('/application_2020', (req, res) => {
		try {
			res.render('application', {open: new Date() >= new Date( "Feb 28 2020 00:00:00 GMT-0800" )})
		}
		catch (error) {
			console.log(error)
		}
	})

	app.post('/application_2020', async (req, res) => {
		try {
			await apply(req, res)
		}
		catch (error) {
			console.log(error)
		}
	})

	app.get('/application_2020/view', (req, res, next) => {
		try {
			secureAccess(req, res, next, ["admin"])
		}
		catch (error) {
			console.log(error)
		}
	}, async (req, res) => {
		try {
			await htmlView(req, res)
		}
		catch (error) {
			console.log(error)
		}
	})

	
}



exports.route = route