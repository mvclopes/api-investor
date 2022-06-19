const Investor = require('../model/investordb');
const express = require('express');
const generateHash = require('../utils/generatehash');
const bcrypt = require('bcrypt');

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

route.post('/login', (req, res) => {
    Investor.findOne({username: req.body.username}, (err, result) => {
        if (err) 
            return res.status(500).send(`Error to find investor: ${req.body.username}`);
        if (!result)
            return res.status(500).send('Non-existent investor');
        
        bcrypt.compare(req.body.password, result.password, (err, same) => {
            if (err)
                return res.status(500).send(`Error to validate password: ${err.message}`);
            if (!same)
                return res.status(500).send('Invalid password');

            // TODO: integrate to MoneyPad API and get all Investor's transactions from DB
            return res.status(200).send({output: 'You are logged', investor: req.body.username});
        });
    });
});

module.exports = route;