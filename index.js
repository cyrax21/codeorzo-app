const express = require('express');
const app = express();
const port = 8000;

// Use Express Router
app.use('/', require('./routes'));

//setting up the view engine (ejs)
app.set('view engine', 'ejs');
app.set('view', './views');

//Listening to the port
app.listen(port, function(err){
    if(err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});