require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');



router.post('/register', (req, res) => {
    const userData = {
        username: req.body.username,
        password: req.body.password
    }
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(users => {
        if (users) {
            res.send("This account already exists!")
        } else {
        if ( 'username' in req.body == false || 'password' in req.body == false) {
            res.send("Can't find username or password, you sure you have enter them ?")
         } else{
           bcyrpt.hash(req.body.password, 12, (err, hash) => {
               userData.password = hash
               Users.create(userData).then(users => {
                   res.send(users.username + " was successfully created!")
               }).catch(error => {
                   res.send(error)
               })
           })
         }
      }
    }).catch(err => res.send(err));
});



router.post('/login', (req, res) => {
    
    Users.findOne({
        where: {
            username: req.body.username
        }
    }).then(users => {
        if(users){
            bcyrpt.compare(req.body.password, users.password).then(password => {
                if(password){
                    jwt.sign(users.username, process.env.TOP_SECRET, (err, token) => {
                        if(err) { console.log(err) }    
                        res.json({Token: token});
                    });
                } else{
                    res.send("Incorrect password entered!")
                }
             })    
            } else{
                res.send("Incorrect username entered!")
            }
        }
    )
});

module.exports = router;