exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders',(t) => {
  t.increments();
  t.text('meals');
  t.text('businessName');
  t.text('shelterName');
  t.text('volunteerName');
  t.text('description');
  t.text('vendorLat');
  t.text('vendorLng');
  t.text('shelterLat');
  t.text('shelterLng');
  t.text('pickupDeadline');
  t.text('status');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
