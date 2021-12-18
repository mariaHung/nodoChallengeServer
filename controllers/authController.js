const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {

    //Check out for errors
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({ err: err.array() })
    };

    //Extract email and password
    const { email, password } = req.body;

    try {
        //Check register user
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ msg: 'Username does not exist'});
        };

        //Check password
        const checkPassw = await bcryptjs.compare(password, user.password)
        if(!checkPassw){
            return res.status(400).json({ msg: 'Incorrect password' });
        };

        //If everything is correct create the token
        //create JWT
        const payload = {
            user: {
                id: user.id,
            },
        };
        //sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600 // 1 hour
        }, (err, token) => {
            if(err) throw err;

            //msg token confirmation
            res.json({ token });
        });

    } catch (err) {
        console.log(err)
    }
};

//Get user authenticated
exports.userAuthenticated = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json({user});
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: 'Error Found'})
    }
}