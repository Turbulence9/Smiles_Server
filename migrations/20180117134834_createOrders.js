exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders',(t) => {
  t.increments();
  t.text('meals');
  t.text('businessName');
  t.text('shelterName');
  t.text('volunteerName');
  t.text('description');
  t.decimal('vendorLat');
  t.decimal('vendorLng');
  t.decimal('shelterLat');
  t.decimal('shelterLng');
  t.text('pickupDeadline');
  t.text('status');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
