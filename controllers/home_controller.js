module.exports.home = function(req, res){
    return res.send('<h1> Displaying the code from home controller</h1>');
}

module.exports.about = function(req, res){
    return res.send('<h1>There is nothing to know about me</h1>');
}