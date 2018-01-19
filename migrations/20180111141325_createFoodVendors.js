exports.up = function(knex, Promise) {
  return knex.schema.createTable('foodvendors',(t) => {
  t.increments();
  t.text('businessName');
  t.text('lat');
  t.text('lng');
  t.text('firstName');
  t.text('lastName');
  t.text('email');
  t.text('phoneNumber');
  t.text('hashedPassword');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('foodvendors');
};
