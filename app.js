/* Author: Asad zia
   Description: Setting up a server for the Book API 
*/

// create a reference for express
var express = require('express');

// create a reference for mongoose
var mongoose = require('mongoose');

// create a reference for bodyParser
var bodyParser = require('body-parser');

// for mongoDB to interact with the Book model, we need to create a reference for the Book model
var Book = require('./models/bookModel');

// create a reference for the Router
bookRouter = require('./Routes/bookRoutes')(Book);

// create an instance of express
var app = express();

// create a connection to the database by giving the connection string as the parameter
// if the bookAPI database doesn't exist, it will create that for us.
var db;

if (process.env.ENV == 'Test')
{
    // connect to test database
    db = mongoose.connect('mongodb://localhost/bookAPI_test');
}
else
{
    db = mongoose.connect('mongodb://localhost/bookAPI');
}


// designate a port either from the environment or assign a default port of 3000
var port = process.env.PORT || 3000;

// The app must know that a body parser is being used.
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// The bookRouter is mounted as a middleware on the /api route.
// reference: https://stackoverflow.com/questions/27227650/difference-between-app-use-and-router-use-in-express
app.use('/api/books', bookRouter);        

// for authors, a new route can be created as follows:
app.use('/api/authors', authorRoutes);

// req: the request which is received by the API
// res: the response that we are going to send back
// These are the parameters for our callback function below
app.get('/', function(req, res) 
{
    res.send("Welcome to my API!");
});

// To allow express to start listening on the port mentioned above, we add a callback function as well.
app.listen(port , function()
{
    console.log("Running on PORT: " + port); 
});

module.exports = app;