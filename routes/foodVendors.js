const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  knex('foodvendors').then((foodvendors) => {
    res.send(foodvendors);
  });
});

router.post('/login', (req, res) => {
  knex('foodvendors')
  .where({
    email: req.body.email,
  }).first()
  .then(user => {
    bcrypt.compare(req.body.password, user.hashedPassword)
    .then((valid) => {
      if (valid) {
        res.send(user);
      } else {
        res.send('invalid login');
      }
    });
  });
});

router.post('/signup', (req, res) => {
  knex('foodvendors')
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
          res.send('user added');
        });
      });
    } else {
      res.send('email already registered');
    }
  });
});



module.exports = router;
