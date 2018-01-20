const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.get('/', (req, res) => {
  knex('shelters')
  .where({
    needFood: true
  })
  .then((shelters) => {
    res.send(shelters);
  })
})

router.post('/signup', (req, res) => {
  knex('emails')
  .where({email:req.body.email})
  .then(email => {
    if(email.length === 0){
      bcrypt.hash(req.body.password, saltRounds)
      .then((hash) => {
        knex('shelters')
        .insert({
          shelterName: req.body.shelterName,
          lat: req.body.lat,
          lng: req.body.lng,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          needFood: true,
          hashedPassword: hash,
        })
        .then(() => {
          knex('emails')
          .insert({
            title: 'shelters',
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
