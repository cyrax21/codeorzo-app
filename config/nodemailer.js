const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

// defines the configuration using which we will be sending mails
let transporter = nodemailer.createTransport({
    service: 'gmail', 
    host: 'smtp.gmail.com', //smtp server address
    port: 587,
    secure: false,
    auth: {  // authorization object
        user: 'codeorzo.service@gmail.com',
        pass: 'Joydeb@21' 
    }
});

// defining that we will be using ejs as a template engine
let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        // relativePath is from where this mail would be send
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template) {
            if(err){ console.log('Error: in rendering template:', err); return;}

            mailHTML = template;
        }
    )

    return mailHTML;
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}