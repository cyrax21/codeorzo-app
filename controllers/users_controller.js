const User = require("../model/user");
const fs = require("fs");
const path = require("path");

module.exports.profile = async function (req, res) {
    try {

        let user = await User.findById(req.params.id);
        return res.render("user_profile", {
            title: "Codeorzo | Profile ",
            profile_user: user,
            
        });

    } catch (err) {

        console.log("Error: ", err);
        return;

    }
};

// Updating the user details
module.exports.update = async function (req, res) {

    if (req.user.id == req.params.id) {

        try{

            let user = await User.findByIdAndUpdate(req.params.id);

            // Used to update the user details in database using multer.
            User.uploadedAvatar(req, res, function (err){
                if(err){ console.log("****  Multer Error: ", err);}

                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, "..", user.avatar));
                    }

                    // This is saving the path of the uploaded file into the avatar field in the user (database)
                    user.avatar = User.avatarPath + "/" + req.file.filename; 
                }
                user.save();
                return res.redirect('back');
            });

        }catch(err){
            console.log("Error: ", err);
            return;
        }
    } else {

        return res.status(401).send("unauthorized");

    }
};

// Render the signIn up
module.exports.signUp = function (req, res) {
  // We want if user is sign-in it should not have access to sign-in page
    if (req.isAuthenticated()) {

        return res.redirect("/users/profile");

    }

    return res.render("user_sign_up", {
        title: "Codeorzo | Signup",
    });
};

// Render the signIn page
module.exports.signIn = function (req, res) {
  // We want if user is sign-in it should not have access to sign-up page
    if (req.isAuthenticated()) {

        return res.redirect("/users/profile");

    }

    return res.render("user_sign_in", {
        title: "Codeorzo | Signin",
    });
};

// Create a Post Request for user creation
module.exports.create = async function (req, res) {
    try{
        if (req.body.password != req.body.confirm_password) {

            return res.redirect("back");
    
        }
    
        let user = await User.findOne({ email: req.body.email });
        if (!user) {
    
            let newUser = await User.create(req.body);
            console.log(" user not found ");
            return res.redirect("/users/sign-in");
    
        } else {
    
            return res.redirect("back");
    
        }
    }catch(err){

        console.log("Error: ", err);
        return;
    
    }
};

// Create a Post Request for user signin session
module.exports.createSession = function (req, res) {

    req.flash('success', 'Successfully! Logged in!');
    return res.redirect("/");
};

// this is a function used to logout the user by removing cookies
module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have been logged out! ');

    return res.redirect("/");
};
