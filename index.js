// Requiring all necessary libraries.
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');

// Use Express Router
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Added route for home
app.use('/', require('./routes'));

//setting up the view engine (ejs)
app.set('view engine', 'ejs');
app.set('views', './views');

//Listening to the port
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});