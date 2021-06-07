module.exports.profile = function(req, res) {
    return res.render('user_profile', {
        title: 'Codeorzo | Profile ',
    })
}

// Render the signIn up
module.exports.signUp = function(req, res) {
    return res.render('user_sign_up', {
        title: 'Codeorzo | Signup',
    })
}

// Render the signIn page
module.exports.signIn = function(req, res) {
    return res.render('user_sign_in', {
        title: 'Codeorzo | Signin',
    })
}