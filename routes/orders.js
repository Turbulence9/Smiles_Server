const express = require('express');
const router = express.Router();
const knex = require('../db/knex.js');


router.get('/', (req, res) => {
  knex('orders')
  .then(orders => {
    res.send(orders);
  });
});

router.get('/:email', (req, res) => {
  knex('orders')
  .where({
    businessEmail : req.params.email
  })
  .then((orders) => {
    res.send(orders);
  });
});

router.post('/', (req, res) => {
  knex('orders')
  .insert({
    meals: req.body.meals,
    businessName : req.body.businessName,
    shelterName : null,
    volunteerName : null,
    businessEmail : req.body.businessEmail,
    shelterEmail : null,
    volunteerEmail : null,
    description : req.body.description,
    vendorLat: req.body.vendorLat,
    vendorLng: req.body.vendorLng,
    shelterLat: null,
    shelterLng: null,
    pickupDeadline : req.body.pickupDeadline,
    status : 'awaiting volunteer',
  })
  .then(() => {
    res.send('Order added');
  });
});

router.delete('/:id', (req, res) => {
  knex('orders')
  .where({id: req.params.id})
  .first()
  .del()
  .then(() => {
    res.send('Order deleted');
  })
})

module.exports = router;
