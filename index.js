// Requiring all necessary libraries.
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

// used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');

// Requiring connect-flash middleware
const flash = require('connect-flash');
const customMware = require('./config/middleware');

// Middle Wares ( Have to be in order )
app.use(express.urlencoded()); // parsing form data
app.use(cookieParser()); // for using cookie 
app.use(express.static('assets')); // adding static files in our project
app.use(expressLayouts); // ?

// make the uploads path available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'))

// ? extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setting up the view engine (ejs)
app.set('view engine', 'ejs');
app.set('views', './views');

// Mongo store is used to store the session cookie in the db
app.use(session({
    name: 'codeorzo',
    // TODO change the secret code before deploying it
    secret: 'something', // The cookie stored is encrypted from this secret string
    saveUninitialized: false, // if user not logged in, do you need to store any info in the cookies (false means no)
    resave: false, // this tells whether you want to re-write the user info inside the cookie
    cookie: {
        maxAge: (1000*60*100) // according to milliseconds
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeorzo-app', //it used to store the session info in db even when the server restart 
    })
}));

//Intialize passport
app.use(passport.initialize());
app.use(passport.session());

// this is middleware called everytime when any route is called. this is used to set the req.user details into res.local.user
app.use(passport.setAuthenticatedUser);

// We need to add it after session cookies because it uses session cookies
app.use(flash());
app.use(customMware.setFlash);

// Added route for home
app.use('/', require('./routes'));

//Listening to the port
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});