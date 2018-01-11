module.exports = {
  development: {
    client: 'postgres',
    connection: 'postgres://localhost:5432/smiles'
  },
  test: {
    client: 'postgres',
    connection: 'postgres://localhost:5432/smiles'
  },
  production: {
    client: 'postgres', 
    connection: process.env.DATABASE_URL
  }
};
