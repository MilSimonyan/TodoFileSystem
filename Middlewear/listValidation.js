'use strict'

const {body} = require("express-validator");

const todoValidation = [
    body('name')
        .isString().withMessage('Name should be string')
        .isLength({min: 5, max: 20})
        .withMessage("Name should be at least 5 characters to the limit 20"),

    body('description')
        .isString().withMessage('Description should be string')
        .isLength({min: 5, max: 20})
        .withMessage("Description should be at least 5 characters to the limit 20"),

    body('status')
        .isInt()
        .isLength({min:1, max:4})
        .withMessage("Status should be int")
];

module.exports = todoValidation