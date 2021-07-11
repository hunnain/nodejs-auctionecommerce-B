const User      = require('../models/user');
const bcrypt    = require("bcrypt")
const jwt 	    = require('jsonwebtoken');

function generateAccessToken(userObj) {
	return jwt.sign(userObj, process.env.TOKEN_SECRET, { expiresIn: '1d' });
}
exports.index = function (req, res) {
    res.json("Welcome to no-where void!");
};
exports.authentication = async (req, res) => {
    const user = await User.findOne({
		email: req.body.email
	});
	if (user) {
		const passwordCompare = await bcrypt.compare(
			req.body.password,
			user.password
		);
        console.log(passwordCompare)
		if (!passwordCompare) {
            res.sendStatus(400)
		}
        const token = generateAccessToken({
            _id     : user._id,
            userType: user.userType,
            email   : req.body.email,
            password: req.body.password
        });
        delete user["password"]
        res.json({
            token,
            user
        });
	}else{
        res.sendStatus(400)
    }
};
exports.changePassword = function (req, res) {
    
};
exports.delete = function (req, res) {
    
};
exports.updatePassword = function (req, res) {
    
};