// We need to make sure that we dont have a reference for Book over here directly which is a database model
// Hence  it is passed as a parameter to the controller. Good for unit testing and mocking.

var bookController = function(Book)
{
    var post = function(req, res)
    {
        // _id is generated automatically for each new book as part of the Book Mongo Schema
        var book = new Book(req.body);

        if (!req.body.title)
        {
            res.status(400);
            res.send('Title is required');
        }
        else
        {
            // save book in database
            book.save();

            // Note: the status and send functions could be chained togethter like: res.status(2o1).send(book)
            // The reason this is not done is because our mocking techniaue might not work then in the tests
            res.status(201);
            res.send(book);
        }    
    }

    var get = function(req, res)
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
    }

    // return both functions so they can be used in the bookRoutes file
    return {
        post: post,
        get: get
    }
}

module.exports = bookController;