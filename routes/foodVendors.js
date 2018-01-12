const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');

router.get('/', (req, res) => {
  knex('foodvendors').then((foodvendors) => {
    res.send(foodvendors);
  });
});

router.post('/login', (req, res) => {
  knex('foodvendors')
  .where({
    email: req.body.email,
    hashedPassword: req.body.hashedPassword,
  }).first()
  .then(user => {
    res.send(user);
  });
});

router.post('/signup', (req, res) => {
  knex('foodvendors')
  .insert({
    businessName: req.body.businessName,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    hashedPassword: req.body.hashedPassword,
  })
  .then(() => {
    res.send('user added');
  });
});

router.post('/check', (req, res) => {
  knex('foodvendors')
  .where({email:req.body.email}).first()
  .then(foodvendors => {
    res.send(foodvendors ? true : false);
  });
});



module.exports = router;
