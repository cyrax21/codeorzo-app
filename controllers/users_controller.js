const User = require("../model/user");

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

        let user = await User.findByIdAndUpdate(req.params.id, req.body);
        return res.redirect("back");

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
  
    return res.redirect("/");
};

// this is a function used to logout the user by removing cookies
module.exports.destroySession = function (req, res) {
    req.logout();

    return res.redirect("/");
};
