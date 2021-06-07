const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/codeorzo-app');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error : On connecting with Database !'));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
})

module.exports = db;