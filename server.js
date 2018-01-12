const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

const foodvendors = require('./routes/foodVendors');
const volunteers = require('./routes/volunteers');
const shelters = require('./routes/shelters');

app.use('/foodvendors',foodvendors);
// app.use('/volunteers',volunteers);
// app.use('/shelters',shelters);

app.get('/', (req, res) => {
  res.send('hello world!');
})

app.listen(PORT, ()=> {
  console.log('Listening on port',PORT);
});

module.exports = app;
