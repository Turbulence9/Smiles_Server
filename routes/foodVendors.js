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
        knex('foodvendors')
        .insert({
          businessName: req.body.businessName,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          hashedPassword: hash,
        })
        .then(() => {
          knex('emails')
          .insert({
            title: 'foodvendors',
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
