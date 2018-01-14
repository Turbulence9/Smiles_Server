const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/login', (req, res) => {
  knex('emails')
  .where({
    email: req.body.email
  })
  .first()
  .then(account => {
    if(account) {
      knex(account.title)
      .where({
        email: req.body.email
      })
      .first()
      .then(user => {
        bcrypt.compare(req.body.password, user.hashedPassword)
        .then((valid) => {
          if (valid) {
            user.currentPage = account.title;
            delete user.hashedPassword;
            res.send(user);
          }
        });
      });
    } else {
      res.send('invalid login');
    }
  });
});

module.exports = router;
