//// DEPENDENCIES ////

// 3rd Party Modules
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// TO DO
// GROUP PHOTO 2019
// Mark Anderson Photo

// Participant Blog
// // Sensei UI
// // Email Forwarding

// APPLICATION VIEW ADDITIONS
// make the line bigger and bolder 

// accept waitlist pending
// nothing deposit paid-final

// Markdown rendering
// CLI: npm install jstransformer-markdown-it
// REQUIRE: const md = require('jstransformer')(require('jstransformer-markdown-it'))
// RENDER OPTIONS: {str: md.render("_italic_ **bold**", {inline: true}).body}
// PUG USE: != str


// Controllers
const { apply, htmlView, getApplications } = require('../application/controller')
const { secureAccess, authZ } = require('../security/controller')
 
//// DEFINITION ////
function route(app, config) {
	
	//// PUBLIC
	app.use(express.static('public', {dotfiles: "allow"}))

	//// MIDDLEWARE
	app.use(cookieParser())
	app.use(bodyParser.urlencoded({ extended: true }))
	app.use(bodyParser.json())
	app.use(bodyParser.text())

	//// FEATURES

	// Splash 
	app.get('/', (req, res) => {
		try {
			console.log("HERE")
			console.log(process.env)
			res.send("MATTTTTTT~")
			//res.render('splash/splash')
		}
		catch (error) {
			console.log(error)
		}
	})

	// Participant Portal

	app.get('/participant', (req, res, next) => {
		try {
			secureAccess(req, res, next, ["admin", "participant"])
		}
		catch (error) {
			console.log(error)
		}
	}, async (req, res) => {
		try {
			res.render('participant/participantsplash')
		}
		catch (error) {
			console.log(error)
		}
	})

	app.get('/participant/news', (req, res, next) => {
		try {
			secureAccess(req, res, next, ["admin", "participant"])
		}
		catch (error) {
			console.log(error)
		}
	}, async (req, res) => {
		try {
			res.render('participant/news')
		}
		catch (error) {
			console.log(error)
		}
	})
 
	// Admin Portal

	app.get('/admin', (req, res, next) => {
		try {
			secureAccess(req, res, next, ["admin"])
		}
		catch (error) {
			console.log(error)
		}
	}, async (req, res) => {
		try {
			const data = await getApplications()
			res.render('admin/adminsplash', {apps: data})
		}
		catch (error) {
			console.log(error)
		}
	})


	// About
	app.get('/aboutus', (req, res) => {
		try {
			res.render('about/us')
		}
		catch (error) {
			console.log(error)
		}
	})


	// Photos

	app.get('/photos', (req, res) => {
		try {
			res.render('photos/photos')
		}
		catch (error) {
			console.log(error)
		}
	})


	// Prints

	app.get('/prints', (req, res) => {
		try {
			res.render('prints/prints')
		}
		catch (error) {
			console.log(error)
		}
	})

	// Login
	app.get('/login', (req, res) => {
		try {
			res.render('security/login', {url: req.query.fwd})
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

	// APPLICATION FUNCTIONALITY COMMENTED OUT UNTIL NEXT APPLICATION CYCLE

	// Application
	// app.get('/application_2020', (req, res) => {
	// 	try {
	// 		res.render('application/application', {open: new Date() >= new Date( "Feb 28 2020 09:00:00 GMT-0800" )})
	// 	}
	// 	catch (error) {
	// 		console.log(error)
	// 	}
	// })

	// app.post('/application_2020', async (req, res) => {
	// 	try {
	// 		await apply(req, res)
	// 	}
	// 	catch (error) {
	// 		console.log(error)
	// 	}
	// })

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