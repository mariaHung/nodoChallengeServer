//Route to create users
const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// @desc        Create user
// @route       POST /api/users
// @access      Public
router.post('/',
    [
        check('firstName', 'firstName is required').not().isEmpty(),
        check('lastName', 'lastName is required').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'The password must be a minimum of 6 characters').isLength({ min: 6 }),
        check('category', 'category is required').not().isEmpty(),
        check('payment', 'payment is required').not().isEmpty(),

    ],
    userController.createUser
);

module.exports = router;