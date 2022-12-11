const express = require('express');
const router = express.Router();
const list = require('../Controller/listController');
const validate = require('../Middlewear/validator')
const listValidator = require('../Middlewear/listValidation')


router
    .get('/', (req, res) => {
    res.status(200).send(list.get())
    })
    .post('/create',listValidator, validate, (req, res) => {
        list.create(req, res)
    })
    .patch('/edit/:id', (req, res) => {
        list.edit(req, res);
    })
    .delete('/delete/:id', (req, res) => {
        list.destroy(req, res);
    })

module.exports = router;