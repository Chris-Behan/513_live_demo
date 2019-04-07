const express = require('express')
const app = express()
const port = 3000

// root route path
app.get('/', (req, res) => res.send('This is root'))

// hello route path
app.get('/hello', (req, res) => res.send('Hello SENG 513'))

// ? : The endpoint must have 0 or 1 of the preceding character.
// E.g. a route path of '/ab?cd' will match endpoints acd or abcd.
app.get('/abcd?word', function (req, res) {
  res.send('word')
})

app.get('/ab(cd)?planorama', function (req, res) {
  res.send('ab(cd)?planorama')
})
// * represents any string
app.get('/planorama*ever', function (req, res) {
  res.send('planorama*ever')
})
// enclose in / / to use regular expressions
// This endpoint will match any string with the word "dog"
app.get(/dog/, function (req, res) {
  res.send('dog')
})

app.get('/students/:ucid/grades/:classid', function (req, res) {
  res.send(req.params)
})

// Can have multiple callback functions
app.get('/multiple', function (req, res, next) {
	console.log('First callback')
  next()
}, function (req, res) {
	console.log('Second callback')
  res.send('Response from second callback')
})

var cb1 = function (req, res, next) {
  console.log('first')
  next()
}

var cb2 = function (req, res, next) {
  console.log('second')
  next()
}

var cb3 = function (req, res) {
	console.log('third')
  res.send('Hello from the third callback')
}

// can set the second parameter as an array of callback functions
app.get('/3callbacks', [cb1, cb2, cb3])


function authenticate (req) {
	let a = 2;
	let b = 2;
	if (a + b === 4) {
		return true
	} else {
		return false
	}
}

// // Middleware function examples
//
// var middleware1 = function (req, res, next) {
// 	console.log("Middleware 1 was executed");
// 	next()
// }
//
// app.use("/hello", middleware1);
//
// var authentication = function (req, res, next) {
// 	isAuthenticated = authenticate(req);
// 	if (isAuthenticated) {
// 		console.log("Authenticated");
// 	} else {
// 		console.log("Access denied!")
// 	}
// 	next()
// }
// 
//
// app.use(authentication);




app.listen(port, () => console.log(`Example app listening on port ${port}!`))
