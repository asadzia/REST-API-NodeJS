var express = require('express');

// create a reference for the controllers
var bookController = require('../controllers/bookController');

var routes = function(Book)
{
    // Set up the routes of the API by creating a router
    var bookRouter = express.Router();

    // define a route for the GET endpoint
    bookRouter.route('/')
    .post(function(req, res)
        {
            // _id is generated automatically for each new book as part of the Book Mongo Schema
            var book = new Book(req.body);
            
            // save book in database
            book.save();
            res.status(201).send(book);
        })
    .get(function(req, res)
        {
            var query = {};

            // check if the query is valid for filtering genres
            if (req.query.genre)
            {
                query.genre = req.query.genre;
            } 
            // filter according to a query in the request
            Book.find(query, function(err, books)
            {
                if (err)
                {
                    // send back response code with error in case of error
                    res.status(500).send(err);
                }
                else
                {
                    res.json(books);
                }
            })
        });
    
    // create a middleware to get book by ID and then pass the result to the endpoints
    bookRouter.use('/:id', function(req, res, next)
    {
        // filter according to a query in the request
        Book.findById(req.params.id, function(err, book)
        {
            if (err)
            {
                // send back response code with error in case of error
                res.status(500).send(err);
            }
            else if (book)
            {
                req.book = book;
                // call the next middleware or go to the endpoint to complete execution
                next();
            }
            else
            {
                res.status(404).send('No book found.');
            }
        });
    });

    // A GET endpoint for getting books by ID
    bookRouter.route('/:id')
    .get(function(req, res)
    { 
        // the book is stored in the request via the middleware
        // if there is no book, this code is not executed and the middleware does the error handling
        res.json(req.book);
    })
    .put(function(req, res)
    {
        // update the book item
        req.book.title = req.body.title;
        req.book.genre = req.body.genre;
        req.book.author = req.body.author;
        req.book.read = req.body.read;
        //Just typing req.book.save(); over here is fine but its not async coding. It results in blocking. 
        // The right way to implement this has been shown below in the patch endpoint.
        req.book.save();
        res.json(req.book);
    })
    .patch(function(req, res)
    {
        // We do not want to update the ID so delete the ID if it exists in the request body
        if (req.body._id)
        {
            delete req.body._id;
        }

        // assign all attributes using a for-in loop which loops through key-value pairs
        for (var key in req.body)
        {
            req.book[key] = req.body[key];
        }

        //Just typing req.book.save(); over here is fine but its not async coding. It results in blocking. An alternative is as follows:
        req.book.save(function(err)
        {
            if (err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.json(req.book);
            }
        });
    })
    .delete(function(req, res)
    {
        req.book.remove(function (err)
        {
            if (err)
            {
                res.status(500).send(err);
            }
            else
            {
                res.status(204).send('Removed'); 
            }
        });
    })

    return bookRouter;
};

module.exports = routes;