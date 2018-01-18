exports.up = function(knex, Promise) {
  return knex.schema.createTable('orders',(t) => {
  t.increments();
  t.text('meals');
  t.text('businessName');
  t.text('shelterName');
  t.text('volunteerName');
  t.text('description');
  t.text('vendorLocation');
  t.text('shelterLocation');
  t.text('pickupDeadline');
  t.text('status');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('orders');
};
