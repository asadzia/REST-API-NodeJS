

var bookController = function(Book)
{
    var post = function(req, res)
    {
        // _id is generated automatically for each new book as part of the Book Mongo Schema
        var book = new Book(req.body);
        
        // save book in database
        book.save();
        res.status(201).send(book);
    }
}

module.exports = bookController;