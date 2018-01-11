exports.up = function(knex, Promise) {
  return knex.schema.createTable('volunteers',(t) => {
  t.increments();
  t.text('firstName');
  t.text('lastName');
  t.text('email');
  t.text('phoneNumber');
  t.text('hashedPassword');
  t.text('maxDistance');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('volunteers');
};
