const nodeMailer = require("../config/nodemailer");

exports.newPost = (post) => {
    // calling renderTemplate function from nodemailer
    let htmlString = nodeMailer.renderTemplate({post: post}, '/posts/new_posts.ejs'); 

    nodeMailer.transporter.sendMail({
        from: 'codeorzo.service@gmail.com',
        to: post.user.email,
        subject: 'New Post published',
        html: htmlString
    }, (err, info) => {
        if(err){ console.log("Error: in sending mail", err); return; }
        
        return;
    })
};
