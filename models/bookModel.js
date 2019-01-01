var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// define what the book model will look like
var bookModel = new Schema
({
    title: {
        type: String
    },
    author: {
        type: String
    },
    genre: {
        type: String
    },
    // to define whether one has read this book or not
    read: {
        type: Boolean, default: false
    }
});

// this model is loaded into mongoose and is called 'Book'.
// The scehma used for this model is the bookModel defined above.   
module.exports = mongoose.model('Book', bookModel);