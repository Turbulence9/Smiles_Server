const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post('/signup', (req, res) => {
  knex('emails')
  .where({email:req.body.email})
  .then(email => {
    if(email.length === 0){
      bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        knex('volunteers')
        .insert({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          hashedPassword: hash,
          maxDistance: req.body.maxDistance,
        })
        .then(() => {
          knex('emails')
          .insert({
            title: 'volunteers',
            email: req.body.email,
          })
          .then(() => {
            res.send('user added');
          });
        });
      });
    } else {
      res.send('email already registered');
    }
  });
});



module.exports = router;
