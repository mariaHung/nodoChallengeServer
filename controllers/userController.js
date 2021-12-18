const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    //Check out for errors
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({ err: err.array() })
    }
    //Extract email and password
    const { email, password } = req.body;

    try {
        //check out if the user register is unique
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({ msg: 'User already exists'})
        };

        //Create new user
        user = new User(req.body);

        //Hashear password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        //Save user
        await user.save();

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
        console.log(err);
        res.status(400).send('There was a mistake');
    }
}