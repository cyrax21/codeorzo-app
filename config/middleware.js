
// This is a middleware to set the res.locals.flash based upon the req.flash given
module.exports.setFlash = function(req, res, next){
    res.locals.flash = {
        'success': req.flash('success'),
        'error': req.flash('error') 
    };

    next();
}