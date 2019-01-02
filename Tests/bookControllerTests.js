// We don't need a reference to mocha because its going to run inside the mocha-framework.

var should = require('should');
var sinon = require('sinon');

// Gulp-Mocha has a BDD approach to testing
// several of these can be chained together
describe('Book Controller Tests:', function()
{
    describe('Post', function()
    {
        // for this test send a mock book
        it('should not allow an empty book title on post', function()
        {
            var Book = function(book)
            {
                this.save = function(){}
            }
            
            // create the request
            var req = {
                body: {
                    author: 'John'
                }
            }
            
            // for the response we can't actually get the values
            // for that we need to use the sinon mocking framework
            // the spy function checks what the status and send functions are called with in the controller post method
            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            // We need to create an instance of the bookController so we can call it for the test
            var bookController = require('../controllers/bookController')(Book);
            
            // call the post method
            bookController.post(req, res);

            // this is to check if the status was correctly called with correct error code
            // if it is not called with correct error code, we print the error code which is returned.
            res.status.calledWith(400).should.equal(true, 'Bad Status ' + res.status.args[0][0]);

            res.send.calledWith('Title is required').should.equal(true);
        });
    })
})