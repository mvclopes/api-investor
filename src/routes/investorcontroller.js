const Investor = require('../model/investordb');
const express = require('express');
const generateHash = require('../utils/generatehash');

const route = express.Router();

route.post('/register', (req, res) => {
    generateHash(req.body.password)
    .then((password) => {
        req.body.password = password;
        Investor(req.body)
            .save()
            .then((result) => {
                res.status(201).send({output: 'Investor registered successfully', investor: result});
            })
            .catch((err) => {
                res.status(500).send(`Error to register new investor: ${err.message}`);
            });
    })
    .catch((err) => {
        res.status(500).send(`Error to generate password hash: ${err.message}`);
    });
});

module.exports = route;