const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// @desc        Get all users
// @route       GET /api/users
// @access      public
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find(req.user);
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('There was a mistake');
    }
};

// @desc        Create user
// @route       POST /api/users
// @access      public
exports.createUser = async (req, res) => {
    //Check out for errors
    const err = validationResult(req);
    if(!err.isEmpty()) {
        return res.status(400).json({ err: err.array() })
    }
    //Extract email and password
    const { email, password } = req.body;

    try {
        // check out if the user register is unique
        // let user = await User.findOne({ email });

        let user = await User.aggregate([{ $match: { category: req.body.category }}]);
        console.log(user)

        if(user.length > 19 && "Novato Masculino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
        };
        if (user.length > 19 && "Novato Femenino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
        };
        if (user.length > 19 && "Escalado Masculino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
        };
        if(user.length > 19 && "Escalado Femenino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
        };
        if (user.length > 9 && "Avanzado Masculino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
        };
        if (user.length > 9 && "Avanzado Femenino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
        };
        if (user.length > 9 && "RX'd Masculino") {
            return res.status(400).json({ msg: `Categoria ${req.body.category} agotada`})
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
};