const path = require('path');
const User = require('../models/User');
const Category = require('../models/Category');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc        Get all categories
// @route       GET /api/category
// @access      Public
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find(req.category);
        res.status(200).json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('There was a mistake');
    }
};

// @desc        Add category
// @route       POST /api/category
// @access      Private
exports.addCategory = asyncHandler( async (req, res, next) => {
    req.body.category === "Novato Masculino" || "Novato Femenino"|| "Escalado Masculino"|| "Escalado Femenino"|| "Avanzado Masculino"|| "Avanzado Femenino"|| "RX'd Masculino";
    if(req.body.category) {
        try {
            const category = await Category.create(req.body);

            res.status(201).json({
                success:true,
                data:category
            });
        } catch (err) {
            console.log(err);
            res.status(500).send('There was a mistake');
        }
    } else {
        return next(
            new ErrorResponse(
                `Error`,
                401
            )
        );
    }
});