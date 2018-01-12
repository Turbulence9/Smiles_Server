const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const titles = ['foodvendors','volunteers','shelters'];

router.post('/login', (req, res) => {
  titles.forEach(title => {
    //connect to current table
    knex(title)
    .where({
      email: req.body.email,
    }).first()
    .then(user => {
      //if user has data compare password
      if (Object.keys(user).length !== 0) {
        bcrypt.compare(req.body.password, user.hashedPassword)
        .then((valid) => {
          if (valid) {
            user.title = title;
            res.send(user);
          }
        });
      }
    });
  });
  res.send('invalid login');
});

module.exports = router;
