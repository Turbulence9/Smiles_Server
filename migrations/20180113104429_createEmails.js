exports.up = function(knex, Promise) {
  return knex.schema.createTable('emails',(t) => {
  t.increments();
  t.text('title');
  t.text('email');
});
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('emails');
};
