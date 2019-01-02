var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gulpMocha = require('gulp-mocha');
var env = require('gulp-env');
var supertest = require('supertest');

// Gulp requires the name of a task which is needed to be run. 
// For this, we will create a function to run the nodemon task.
gulp.task('default', function()
{
    // Nodemon will take a JSON object to configure itself.
    // So it needs to know what its going to run. In this case
    // we will provide a script called app.js
    // Also mention the extension of the file nodemon needs to look for which is js
    // For any environment varilables defined in app.js, we can define them here such as port etc.
    // To avoid nodemon from getting confused whenever a new node module is installed, we will ignore every file in the node_modules folder
    // We would also want to know when nodemon restarts, so for that we can add a log message.
    nodemon(
        {
            script: 'app.js',
            ext: 'js',
            env: {
                PORT:6200
            },
            ignore: ['./node_modules/**']
        })
        .on('restart', function()
            {
                console.log("Restarting...");
            });
});

// Create a task for testing with gulp mocha
gulp.task('test', function()
{
    // here we define the enviornment which is then governed by our gulp execution.
    // this is done in app.js by connecting to the specific DB
    env({
        vars: {
            ENV: 'TEST'
        }
    })

    // get all the files in the test directory and pipe them down to gulp mocha
    gulp.src('Tests/*.js', {read: false})
    .pipe(gulpMocha({reporter: 'nyan'}))
});