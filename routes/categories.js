const express = require('express');
const categoryController = require('../controllers/categoryController');
const { check } = require('express-validator');

const router = express.Router();

// @desc        Get categorys
// @route       GET /api/categorys
// @access      Public
router.get('/',
    categoryController.getCategories,
);

// @desc        Add category
// @route       POST /api/categorys
// @access      Public
router.post('/',
    [
        check('category', 'Category is required').not().isEmpty(),

    ],
    categoryController.addCategory
);

module.exports = router;