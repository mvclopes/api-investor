const Investor = require('../model/investordb');
const express = require('express');
const generateHash = require('../utils/generatehash');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require("uuid");
const clientBankInfo = require('../client/bankinfo');
const auth = require('../middleware/auth');
const createUserToken = require('../utils/createtoken');
const grpc = require('@grpc/grpc-js');
const build = require('../utils/buildobjects');

const route = express.Router();

route.post('/register', (req, res) => {
    generateHash(req.body.password)
    .then((password) => {
        req.body.password = password;
        req.body.apikey = uuidv4();
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
    Investor.findOne({username: req.body.username}, (err, investor) => {
        if (err) return res.status(500).send(`Error to find investor: ${req.body.username}`);
        if (!investor) return res.status(500).send('Non-existent investor');
        
        bcrypt.compare(req.body.password, investor.password, (err, same) => {
            if (err) return res.status(500).send(`Error to validate password: ${err.message}`);
            if (!same) return res.status(500).send('Invalid password');

            const token = createUserToken(investor);
            return res.status(200).send({token: token});
        });
    });
});

route.put('/update/:id', auth, (req, res) => {
    generateHash(req.body.password)
        .then((encryptedPassword) => {
            req.body.password = encryptedPassword;
            Investor.findOneAndUpdate(req.body.id, req.body, (err, result) => {
                if (err)
                    return res.status(500).send(`Error to find investor: ${err.message}`);
                if (!result) 
                    return res.status(400).send('Error to update password');
                
                return res.status(202).send('Updated investor data');
            });
        })
        .catch((err) => {
            res.status(500).send(`Error to generate password hash: ${err.message}`);
        });
});

route.put('/update-password/:id', auth, (req, res) => {
    generateHash(req.body.password)
        .then((encryptedPassword) => {
            req.body.password = encryptedPassword;
            Investor.findOneAndUpdate(req.body.id, req.body.password, (err, result) => {
                if (err)
                    return res.status(500).send(`Error to find investor: ${err.message}`);
                if (!result) 
                    return res.status(400).send('Error to update password');
                
                return res.status(202).send('Updated password');
            });
        })
        .catch((err) => {
            res.status(500).send(`Error to generate password hash: ${err.message}`);
        });
});

route.get('/investors', auth, (_, res) => {
    Investor.find()
    .then((result) => {res.status(200).send({output: result})})
    .catch((err) => {res.status(500).send(err.message)});
});

route.get('/investor-banks-info', auth, (req, res) => {
    Investor.findOne({username: req.body.username}, (err, investor) => {
        if (err) return res.status(500).send(`Error to find investor: ${req.body.username}`);
        if (!investor) return res.status(500).send('Non-existent investor');

        const metadata = new grpc.Metadata();
        metadata.set('token', req.headers['token']);

        clientBankInfo.GetAllInvestorBanks({investorId: investor.apikey}, metadata, (err, banksInfo) => {
            if (err) return res.status(500).send(err);
            if (!banksInfo) return res.status(500).send('Investor has no banks account');
            return res.status(200).send(banksInfo);
        }); 
    });
});

route.post('/new-investor-bank-info', auth, (req, res) => {
    build.bankInfo(req)
        .catch((err) => res.status(500).send(err))
        .then((newBankInfo) => {
            const metadata = new grpc.Metadata();
            metadata.set('token', req.headers['token']);

            clientBankInfo.InsertBankInfo(newBankInfo, metadata, (err, bankInfo) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(bankInfo);
            });
        });
});

route.put('/update-bank-info', auth, (req, res) => {
    build.updateBankInfo(req)
        .catch((err) => res.status(500).send(err))
        .then((updatedBankInfo) => {
            const metadata = new grpc.Metadata();
            metadata.set('token', req.headers['token']);
            clientBankInfo.UpdateBankInfo(updatedBankInfo, metadata, (err, bankInfo) => {
                if (err) return res.status(500).send(err);
                return res.status(200).send(bankInfo);
            });
        });
});

module.exports = route;