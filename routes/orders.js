const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');

router.get('/', (req, res) => {
  knex('orders')
  .then(orders => {
    res.send(orders);
  });
});

router.post('/', (req, res) => {
  knex('orders')
  .returning('*')
  .insert({
    meals: req.body.meals,
    businessName : req.body.businessName,
    shelterName : null,
    volunteerName : null,
    description : req.body.description,
    vendorLocation : null,
    shelterLocation : null,
    pickupDeadline : req.body.pickupDeadline,
    status : 'awaiting volunteer',
  })
  .then(orders => {
    res.send(orders);
  });
});

module.exports = router;
