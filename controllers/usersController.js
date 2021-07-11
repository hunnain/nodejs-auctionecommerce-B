const User = require('../models/user');

exports.index = function (req, res) {
    let parameters = {}
    if(Object.keys(req.body).length){
        parameters = req.body 
    }
    User.find(parameters, function (err, users) {
        if (err)
            res.json(err);
        res.send(users);
    });
};
exports.create = async function (req, res) {
    var user = new User();
    user.userType   = req.body.userType
    user.firstName  = req.body.firstName
    user.lastName   = req.body.lastName
    user.email      = req.body.email.toLowerCase()
    user.password   = req.body.password
    user.mobileNo   = req.body.mobileNo
    try {
        await user.save(function (err, user) {
            if (err)
                res.json(err);
            res.json({
                message: "New User Created!",
                data: user
            });
        });        
    } catch (error) {
        console.log(error)
    }

};
exports.update = function (req, res) {
    User.findOne({_id: req.user._id}, function (err, users) {
        if (err)
            res.json(err);
        res.send(users);
    });
    
};
exports.delete = function (req, res) {
    
};
exports.updatePassword = function (req, res) {
    
};
exports.addToWatchList = async function (req, res) {
    let user = await User.findOne({_id: req.user._id}, function (err, users) {
        if (err)
            res.json(err);
    });
    if(user.watchList.length ==0){
        user.watchList = []
    }
    user.watchList.push(req.body.productId)
    await user.save(function (err, user) {
        if (err)
            res.json(err);
        res.json({
            message: "Added to Watchlist",
            watchList: user
        });
    })
};