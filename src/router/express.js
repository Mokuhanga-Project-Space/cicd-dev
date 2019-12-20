//// DEPENDENCIES ////

// 3rd Party Modules
const express = require('express')

// Markdown rendering
// CLI: npm install jstransformer-markdown-it
// REQUIRE: const md = require('jstransformer')(require('jstransformer-markdown-it'))
// RENDER OPTIONS: {str: md.render("_italic_ **bold**", {inline: true}).body}
// PUG USE: != str

//// DEFINITION ////
function route(app) {
	
	//// PUBLIC
	app.use(express.static('public'))

	//// FEATURES

	// Splash 
	app.get('/', (req, res) => {
	    res.render('index')
	})

	// Registration
	app.get('/registration_2020', (req, res) => {
	    res.render('registration')
	})

	app.post('/registration_2020', (req, res) => {
	    res.send('COMPLETE')
	})

}

exports.route = route