//Route to authenticate users
const express = require('express')
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');

// @desc        Login user
// @route       POST /api/auth
// @access      Private
router.post('/',
    authController.authenticateUser
);

router.get('/',
    auth,
    authController.userAuthenticated
)
module.exports = router;