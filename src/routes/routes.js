//// DEPENDENCIES ////

// 3rd Party Modules
const express = require('express')

//// DEFINITION ////
function route(app) {
	//// PUBLIC
	app.use(express.static('public'))

	//// FEATURES

	// Splash 
	app.get('/', (req, res) => {
	    res.render('index', {'name': 'Matt'})
	})

	// Registration
	app.get('/registration_2020', (req, res) => {
	    res.render('registration', {})
	})

}

exports.route = route