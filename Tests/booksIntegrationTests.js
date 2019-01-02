var should = require('should'),
    request = require('supertest'),
    // we need a reference to our app.js file which is going to be used by supertest to execute the http calls
    app = require('../app.js'),
    mongoose = require('mongoose'),
    // The Book model can be pulled directly from mongoose because its loaded into mongoosein app.js
    Book = mongoose.model('Book'),
    // the agent will execute the http calls based on our app
    agent = request.agent(app);

describe('Book CRUD Test', function()
{
    it('Should allow a book to be poasted and a return a read and _id', function(done)
    {
        // create a book
        var bookPost = {
            title: 'new Book',
            author: 'John',
            genre: 'Fiction'
        };

        // do assertions here
        // call the agent to invoke post
        // send the bookpost object created
        // expect a 201 from the result
        // and use a callback at the end to check if everything was returned as expected
        agent.post('/api/books')
        .send(bookPost)
        .expect(201)
        .end(function(err, result)
        {
            result.body.read.should.equal(false);
            result.body.should.have.property('_id');
            // done lets supertest know that this part of the code is done so move to the next thing
            done();
        })
    })

    //when all our tests are done, we run a function to clear our database. Like a tearDown

    afterEach(function(done)
    {
        Book.remove().exec();
        done();
    })
})