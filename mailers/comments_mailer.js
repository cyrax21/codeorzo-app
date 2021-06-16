const nodeMailer = require("../config/nodemailer");

exports.newComment = (comment, post) => {
    // calling renderTemplate function from nodemailer
    let htmlString = nodeMailer.renderTemplate({comment: comment, post: post}, '/comments/new_comment.ejs'); 

    nodeMailer.transporter.sendMail({
        from: 'codeorzo.service@gmail.com',
        to: comment.user.email,
        subject: 'New Comment published',
        html: htmlString
    }, (err, info) => {
        if(err){ console.log("Error: in sending mail", err); return; }

        // console.log('Message delivered', info);
        return;
    })
};
