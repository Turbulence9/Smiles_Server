const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const titles = ['foodvendors','volunteers','shelters'];

router.post('/login', (req, res) => {
  let completed = 0;
  titles.forEach(title => {
    knex(title)
    .where({
      email: req.body.email
    })
    .first()
    .then(user => {
      if(user) {
        bcrypt.compare(req.body.password, user.hashedPassword)
        .then((valid) => {
          if (valid) {
            user.title = title;
            res.send(user);
          }
          completed++;
          if(completed === titles.length) {
            res.send('invalid login')
          }
        });
      }
      else {
        completed++;
        if(completed === titles.length) {
          res.send('invalid login')
        }
      }
    });
  });
});

module.exports = router;
